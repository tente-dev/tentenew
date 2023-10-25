import { Image } from 'shared/types/image'

export interface Branch {
  id: number
  name: string
  bankTransferAsPaymentMethod: number
  debitCardAsPaymentMethod: number
  creditCardAsPaymentMethod: number
  homeDelivery: number
  lat: number | null
  long: number | null
  storeId: number
  catalogue?: Image
}
