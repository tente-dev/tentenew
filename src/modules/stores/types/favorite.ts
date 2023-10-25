import { Branch } from './branch'
import { Store } from './store'

type FavoriteBranch = Branch & { store: Store }

export interface Favorite {
  id: number
  branchId: number
  userId: number
  branch: FavoriteBranch
}

export interface FavoritePayload {
  branchId: number
  userId: number
}
