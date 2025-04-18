/**
 * 读取Notion相关的配置
 * 如果需要在Notion中添加自定义字段，可以修改此文件
 */
module.exports = {
  POST_URL_PREFIX: 'articles',
  NOTION_HOST: 'https://www.notion.so',
  // 自定义配置notion数据库字段名
  NOTION_PROPERTY_NAME: {
    password: 'password',
    type:  'type', // 文章类型，
    type_post: 'Post', // 当type文章类型与此值相同时，为博文。
    type_page: 'Page', // 当type文章类型与此值相同时，为单页。
    type_notice:
      'Notice', // 当type文章类型与此值相同时，为公告。
    type_menu: 'Menu', // 当type文章类型与此值相同时，为菜单。
    type_sub_menu: 'SubMenu', // 当type文章类型与此值相同时，为子菜单。
    title: 'title', // 文章标题
    status: 'status',
    status_publish: 'Published', // 当status状态值与此相同时为发布，可以为中文  
    status_invisible: 'Invisible', // 当status状态值与此相同时为隐藏发布，可以为中文 ， 除此之外其他页面状态不会显示在博客上
    summary: 'summary', // 文章摘要
    slug: 'slug',
    category: 'category',
    date: 'date',
    tags: 'tags',
    icon: 'icon',
    ext: 'ext' // 扩展字段，存放json-string，用于复杂业务
  },
}
