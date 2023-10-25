import {
  Credentials,
  LoginResponse,
  RegistrationRequest,
  ResendEmail,
  GoogleAuthRequest,
  ResetPasswordRequest,
  User,
} from '@auth'
import { Branch, Favorite, FavoritePayload, Owner, Store } from 'modules/stores'
import {
  BranchPayload,
  RegistrationProcess,
  SocialMedia,
  SocialMediaPayload,
} from 'modules/stores/types/store'

export type CRUDMethod = 'POST' | 'PUT' | 'GET' | 'DELETE' | 'PATCH'

export interface ApiService<Body = undefined, Params = undefined> {
  method: CRUDMethod
  body?: Body
  params?: Params
  url: string
  headers?:
    | Headers
    | string[][]
    | Record<string, string | undefined>
    | undefined
}

export type ServiceResponse =
  | LoginResponse
  | string
  | User
  | Owner
  | Store
  | Branch
  | Store[]
  | Favorite[]

export type ServiceBody =
  | Credentials
  | RegistrationRequest
  | ResendEmail
  | GoogleAuthRequest
  | ResetPasswordRequest
  | RegistrationProcess['owner']
  | RegistrationProcess['storeInfo']
  | BranchPayload
  | FormData
  | FavoritePayload
  | SocialMediaPayload

export type ServiceParams = any | Filters

export interface Filters {
  include: string[]
}
