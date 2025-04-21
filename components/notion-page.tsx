"use client"

import { NotionRenderer } from "react-notion-x"
import type { ComponentProps } from "react"
import { mapImgUrl } from "@/lib/notion/mapImage"
import dynamic from "next/dynamic"

const mapPageUrl = (id: string) => {
  // return 'https://www.notion.so/' + id.replace(/-/g, '')
  return '/' + id.replace(/-/g, '')
}

const Code = dynamic(
  () =>
    import('react-notion-x/build/third-party/code').then(async m => {
      return m.Code
    }),
  { ssr: false }
)

const Collection = dynamic(
  () =>
    import('react-notion-x/build/third-party/collection').then(
      m => m.Collection
    ),
  {
    ssr: true
  }
)

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then(m => m.Modal),
  { ssr: false }
)


const NotionPage = (props: ComponentProps<typeof NotionRenderer>) => {
  return (
    <div>
      <NotionRenderer 
        mapPageUrl={mapPageUrl}
        mapImageUrl={mapImgUrl}
        components={{
          Code,
          Collection,
          // Equation,
          Modal,
          // Pdf,
          // Tweet
        }}
        {...props}
      />
    </div>
  )
}

export default NotionPage
