import { StaticImageData } from 'next/image'

export type Integration = {
  appLogo: StaticImageData
  app: string
  description: string
}

type Availability = {
  available: boolean
  addon?: boolean
}

export type PlanFeature = {
  name: string
  starter: Availability
  professional: Availability
  enterprise: Availability
}
