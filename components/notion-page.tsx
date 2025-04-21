"use client"

import { NotionRenderer } from "react-notion-x"
import type { ComponentProps } from "react"

const NotionPage = (props: ComponentProps<typeof NotionRenderer>) => {
  return (
    <div>
      <NotionRenderer {...props} />
    </div>
  )
}

export default NotionPage
