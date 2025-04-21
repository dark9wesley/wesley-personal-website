'use client'

import { NotionRenderer as NotionRendererBase } from "react-notion-x"
import { type ComponentProps } from "react"
import { mapImgUrl } from "@/lib/notion/mapImage"
import dynamic from "next/dynamic"

const mapPageUrl = (id: string) => {
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

// 美化代码 from: https://github.com/txs
const PrismMac = dynamic(() => import('./PrismMac'), {
  ssr: false
})

const NotionPage = (props: ComponentProps<typeof NotionRendererBase>) => {
  
  return (
    <div>
      <NotionRendererBase 
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
      <PrismMac />
    </div>
  )
}

export default NotionPage
