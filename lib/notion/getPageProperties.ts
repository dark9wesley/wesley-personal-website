import { Block, CollectionPropertySchemaMap, Decoration, FormattedDate, SelectOption } from "notion-types"
import { isArray } from 'lodash-es'
import { getDateValue, getTextContent } from 'notion-utils'
import notionAPI from "./getNotionAPI"
import BLOG from "@/blog.config"
import { checkStartWithHttp, convertStringToJSON, convertUrlStartWithOneSlash, formatDate } from "../utils"
import { mapImgUrl } from "./mapImage"
import { md5 } from 'js-md5'

export default async function getPageProperties(
  id: string,
  value: Block,
  schema: CollectionPropertySchemaMap,
  authToken: string | null,
  tagOptions: SelectOption[]
) {
  const rawProperties = Object.entries(value?.properties || [])
  const excludeProperties = ['date', 'select', 'multi_select', 'person']
  const properties: Record<string, any> = {}
  for (let i = 0; i < rawProperties.length; i++) {
    const [key, val] = rawProperties[i]
    properties.id = id
    if (schema[key]?.type && !excludeProperties.includes(schema[key].type)) {
      properties[schema[key].name] = getTextContent(val as Decoration[])
    } else {
      switch (schema[key]?.type) {
        case 'date': {
          const dateProperty = isArray(val) ? getDateValue(val) : null
          if (dateProperty) {
            const { type, ...rest } = dateProperty
            properties[schema[key].name] = rest
          }
          break
        }
        case 'select':
        case 'multi_select': {
          const selects = getTextContent(val as Decoration[])
          if (selects.length) {
            properties[schema[key].name] = selects.split(',')
          }
          break
        }
        case 'person': {
          const rawUsers = (val as Decoration[][]).flat()
          const users = []

          for (let i = 0; i < rawUsers.length; i++) {
            if (rawUsers[i][0][1]) {
              const userId = rawUsers[i][0]
              const res = await notionAPI.getUsers([userId])
              const resValue =
              // @ts-expect-error
                res?.recordMapWithRoles?.notion_user?.[userId[1]]?.value
              const user = {
                id: resValue?.id,
                first_name: resValue?.given_name,
                last_name: resValue?.family_name,
                profile_photo: resValue?.profile_photo
              }
              users.push(user)
            }
          }
          properties[schema[key].name] = users
          break
        }
        default:
          break
      }
    }
  }

  // 映射键：用户自定义表头名
  const fieldNames = BLOG.NOTION_PROPERTY_NAME
  if (fieldNames) {
    Object.keys(fieldNames).forEach(key => {
      const fieldName = fieldNames[key as keyof typeof fieldNames]
      if (fieldName && properties[fieldName])
        properties[key] = properties[fieldName]
    })
  }

  // type\status\category 是单选下拉框 取数组第一个
  properties.type = properties.type?.[0] || ''
  properties.status = properties.status?.[0] || ''
  properties.category = properties.category?.[0] || ''
  properties.comment = properties.comment?.[0] || ''

  // 映射值：用户个性化type和status字段的下拉框选项，在此映射回代码的英文标识
  mapProperties(properties)

  properties.publishDate = new Date(
    properties?.date?.start_date || value.created_time
  ).getTime()
  properties.publishDay = formatDate(properties.publishDate, BLOG.LANG)
  properties.lastEditedDate = new Date(value?.last_edited_time)
  properties.lastEditedDay = formatDate(
    new Date(value?.last_edited_time).toString(),
    BLOG.LANG
  )
  properties.fullWidth = value?.format?.page_full_width ?? false
  properties.pageIcon = mapImgUrl(value?.format?.page_icon, value) ?? ''
  properties.pageCover = mapImgUrl(value?.format?.page_cover, value) ?? ''
  properties.pageCoverThumbnail =
    mapImgUrl(value?.format?.page_cover, value, 'block') ?? ''
  properties.ext = convertStringToJSON(properties?.ext)
  properties.content = value.content ?? []
  properties.tagItems =
    properties?.tags?.map((tag: string) => {
      return {
        name: tag,
        color: tagOptions?.find(t => t.value === tag)?.color || 'gray'
      }
    }) || []
  delete properties.content
  return properties
}

/**
 * 映射用户自定义表头
 */
function mapProperties(properties: Record<string, any>) {
  const typeMap = {
    [BLOG.NOTION_PROPERTY_NAME.type_post]: 'Post',
    [BLOG.NOTION_PROPERTY_NAME.type_page]: 'Page',
    [BLOG.NOTION_PROPERTY_NAME.type_notice]: 'Notice',
    [BLOG.NOTION_PROPERTY_NAME.type_menu]: 'Menu',
    [BLOG.NOTION_PROPERTY_NAME.type_sub_menu]: 'SubMenu'
  }

  const statusMap = {
    [BLOG.NOTION_PROPERTY_NAME.status_publish]: 'Published',
    [BLOG.NOTION_PROPERTY_NAME.status_invisible]: 'Invisible'
  }

  if (properties?.type && typeMap[properties.type]) {
    properties.type = typeMap[properties.type]
  }

  if (properties?.status && statusMap[properties.status]) {
    properties.status = statusMap[properties.status]
  }
}

/**
 * 过滤处理页面数据
 * 过滤处理过程会用到NOTION_CONFIG中的配置
 */
export function adjustPageProperties(properties: Record<string, any>, NOTION_CONFIG: Record<string, any>) {
  // 处理URL
  // 1.按照用户配置的URL_PREFIX 转换一下slug
  // 2.为文章添加一个href字段，存储最终调整的路径
  if (properties.type === 'Post') {
    properties.slug = generateCustomizeSlug(properties, NOTION_CONFIG)
    properties.href = properties.slug ?? properties.id
  } else if (properties.type === 'Page') {
    properties.href = properties.slug ?? properties.id
  } else if (properties.type === 'Menu' || properties.type === 'SubMenu') {
    // 菜单路径为空、作为可展开菜单使用
    properties.href = properties.slug ?? '#'
    properties.name = properties.title ?? ''
  }

  // http or https 开头的视为外链
  if (checkStartWithHttp(properties?.href)) {
    properties.href = properties?.slug
    properties.target = '_blank'
  } else {
    properties.target = '_self'
    // 伪静态路径右侧拼接.html

    // 相对路径转绝对路径：url左侧拼接 /
    properties.href = convertUrlStartWithOneSlash(properties?.href)
  }
  // 密码字段md5
  properties.password = properties.password
    ? md5(properties.slug + properties.password)
    : ''
}

/**
 * 获取自定义URL
 * 可以根据变量生成URL
 * 支持：%category%/%year%/%month%/%day%/%slug%
 * @param {*} postProperties
 * @returns
 */
function generateCustomizeSlug(postProperties: Record<string, any>, NOTION_CONFIG: Record<string, any>) {
  // 外链不处理
  if (checkStartWithHttp(postProperties.slug)) {
    return postProperties.slug
  }
  return `article/${postProperties.slug ?? postProperties.id}`
}
