import { Image } from 'shared/types/image'
import { Branch } from './branch'
import { Owner } from './owner'

export type StoreBranch = {
  store: Omit<Store, 'branches'>
  branch: Branch
}

export interface Store {
  id: number
  name: string
  slogan: string
  str: string
  description: string
  verified: number
  createdBy: number
  logoId: number
  ownerId: number
  branches: Branch[]
  logo: Image
  socialMedia: SocialMedia
  owner: Owner
  nonAcceptedFields?: string
}

export interface RegistrationProcess {
  currentStep: number
  storeInfo: {
    name: string
    slogan?: string
    str: string
    description?: string
    logo: string
    verified?: boolean
    ownerId?: number
    nonAcceptedFields?: string
  }
  socialMedia: {
    instagram?: string
    whatsapp?: string
    facebook?: string
    tiktok?: string
  }
  owner: {
    fullName: string
    email: string
    identification: string
    identificationPhoto: string
  }
  branches: BranchPayload[]
}

export interface BranchPayload {
  name: string
  bankTransferAsPaymentMethod: boolean
  debitCardAsPaymentMethod: boolean
  creditCardAsPaymentMethod: boolean
  homeDelivery: boolean
  lat: number
  long: number
  productsCatalogue?: string
}

export interface SocialMedia {
  id: number
  instagram: string | null
  whatsapp: null | string
  facebook: string | null
  tiktok: null | string
  storeId: number
}

export interface SocialMediaPayload {
  instagram?: string
  whatsapp?: string
  facebook?: string
  tiktok?: string
  storeId: number
}
