import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { urlForImage } from "@/sanity/lib/image"

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mt-10 text-2xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-border pl-4 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noreferrer"
        className="text-foreground underline underline-offset-4"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }) => {
      try {
        const src = urlForImage(value).width(1200).fit("max").auto("format").url()
        const alt = value?.alt ?? ""

        return (
          <figure className="my-8 overflow-hidden rounded-lg">
            <img src={src} alt={alt} className="w-full rounded-lg object-cover" />
          </figure>
        )
      } catch {
        return null
      }
    },
  },
}

export default function PortableTextRenderer({ value }: { value: any[] }) {
  return <PortableText value={value} components={components} />
}
