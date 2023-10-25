import { Image } from 'shared/types/image'

export interface Owner {
  id: number
  fullName: string
  email: string
  identification: string
  identificationPhotoId: number
  verified: boolean
  photo: Image
}
