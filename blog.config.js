const BLOG = {
  NOTION_BLOG_PAGE_ID:
    process.env.NOTION_BLOG_PAGE_ID,
  LANG: 'zh-CN',
  ...require('./conf/notion.config'), // 读取notion数据库相关的扩展配置，例如自定义表头
}

module.exports = BLOG
