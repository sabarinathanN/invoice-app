import { StaticImageData } from 'next/image'
import { ReactNode } from 'react'

export type Feature = {
  icon: ReactNode
  variant: string
  title: string
  description: string
}

export type Feature2 = {
  image: StaticImageData
  shapes: string[]
  title: string
  description: string
}
