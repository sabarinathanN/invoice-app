import { StaticImageData } from 'next/image'
import { ReactNode } from 'react'

export type ImageType = {
  src: StaticImageData
  caption: string
}

export type GalleryItem = {
  id?: number
  image: ImageType
  title?: string
  description?: string
  category?: Array<string>
}

export type WorkImages = {
  icon: ReactNode
  title: string
}
