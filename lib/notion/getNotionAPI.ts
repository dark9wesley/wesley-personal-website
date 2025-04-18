import { NotionAPI as NotionLibrary } from 'notion-client'

const notionAPI = getNotionAPI()

function getNotionAPI() {
  return new NotionLibrary({
    activeUser: process.env.NOTION_ACTIVE_USER,
    authToken: process.env.NOTION_TOKEN_V2,
    userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
  })
}

export default notionAPI
