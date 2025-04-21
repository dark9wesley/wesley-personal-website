import { isArray } from "lodash-es"

export function convertStringToJSON(str: string) {
  if (!str) {
    return {}
  }
  // 使用正则表达式去除空格和换行符
  try {
    return JSON.parse(str.replace(/\s/g, ''))
  } catch (error) {
    console.warn('无效JSON', str)
    return {}
  }
}

// 检查是否外链
export function checkStartWithHttp(str: string) {
  // 检查字符串是否包含http
  if (str?.indexOf('http:') === 0 || str?.indexOf('https:') === 0) {
    // 如果包含，找到http的位置
    return true
  } else {
    // 不包含
    return false
  }
}

export function convertUrlStartWithOneSlash(str: string) {
  if (!str) {
    return '#'
  }
  // 判断url是否以 / 开头
  if (!str.startsWith('/')) {
    // 如果不是，则在前面拼接一个 /
    str = '/' + str
  }
  // 移除开头的多个连续斜杠，只保留一个
  str = str.replace(/\/+/g, '/')
  return str
}

/**
 * 递归获取层层嵌套的数组
 * @param {*} textArray
 * @returns
 */
function getTextContent(textArray: string[] | string) {
  if (typeof textArray === 'object' && isArray(textArray)) {
    let result = ''
    for (const textObj of textArray) {
      result = result + getTextContent(textObj)
    }
    return result
  } else if (typeof textArray === 'string') {
    return textArray
  }
}

/**
 * 将对象的指定字段拼接到字符串
 * @param sourceTextArray
 * @param targetObj
 * @param key
 * @returns {*}
 */
export function appendText(sourceTextArray: string[], targetObj: Record<string, any>, key: string) {
  if (!targetObj) {
    return sourceTextArray
  }
  const textArray = targetObj[key]
  const text = textArray ? getTextContent(textArray) : ''
  if (text && text !== 'Untitled') {
    return sourceTextArray.concat(text)
  }
  return sourceTextArray
}


// 用word方式计算正文字数
export function fnGetCpmisWords(str: string) {
  if (!str) {
    return 0
  }
  let sLen = 0
  try {
    // eslint-disable-next-line no-irregular-whitespace
    str = str.replace(/(\r\n+|\s+|　+)/g, '龘')
    // eslint-disable-next-line no-control-regex
    str = str.replace(/[\x00-\xff]/g, 'm')
    str = str.replace(/m+/g, '*')
    str = str.replace(/龘+/g, '')
    sLen = str.length
  } catch (e) {}
  return sLen
}
