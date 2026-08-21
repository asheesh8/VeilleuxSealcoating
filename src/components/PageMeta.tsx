import { useEffect } from 'react'

interface Props {
  title: string
  description: string
}

/** Sets document title and meta description per route. */
export function PageMeta({ title, description }: Props) {
  useEffect(() => {
    document.title = title
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', description)
  }, [title, description])

  return null
}
