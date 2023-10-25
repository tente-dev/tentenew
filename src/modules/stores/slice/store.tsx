import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import {
  BranchPayload,
  RegistrationProcess,
  Store,
  StoreBranch,
} from '../types/store'
import { Owner } from '../types/owner'
import { Branch } from '../types/branch'
import { Favorite } from '../types/favorite'

export interface StoreState {
  registrationProcess: RegistrationProcess
  store?: Store
  owner?: Owner
  branches?: Branch[]
  storeBranches: StoreBranch[]
  favorites: Favorite[]
  requests: Store[]
}

const initialState: StoreState = {
  registrationProcess: {
    currentStep: 1,
    storeInfo: {},
    socialMedia: {},
    owner: {},
    branches: [] as BranchPayload[],
  } as RegistrationProcess,
  storeBranches: [],
  favorites: [],
  requests: [],
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    updateStore: (
      state: StoreState,
      action: PayloadAction<Store | undefined>,
    ) => {
      state.store = action.payload
    },
    updateOwner: (
      state: StoreState,
      action: PayloadAction<Owner | undefined>,
    ) => {
      state.owner = action.payload
    },
    updateBranches: (
      state: StoreState,
      action: PayloadAction<Branch[] | undefined>,
    ) => {
      state.branches = action.payload
    },
    updateStoreInfoValues: (
      state: StoreState,
      action: PayloadAction<{
        key: keyof RegistrationProcess['storeInfo']
        value: any
      }>,
    ) => {
      state.registrationProcess.storeInfo = {
        ...state.registrationProcess.storeInfo,
        [action.payload.key]: action.payload.value,
      }
    },
    updateSocialMediaValues: (
      state: StoreState,
      action: PayloadAction<{
        key: keyof RegistrationProcess['socialMedia']
        value: any
      }>,
    ) => {
      state.registrationProcess.socialMedia = {
        ...state.registrationProcess.socialMedia,
        [action.payload.key]: action.payload.value,
      }
    },
    updateOwnerInfoValues: (
      state: StoreState,
      action: PayloadAction<{
        key: keyof RegistrationProcess['owner']
        value: any
      }>,
    ) => {
      state.registrationProcess.owner = {
        ...state.registrationProcess.owner,
        [action.payload.key]: action.payload.value,
      }
    },
    addBranch: (state: StoreState, action: PayloadAction<BranchPayload>) => {
      state.registrationProcess.branches = [
        ...state.registrationProcess.branches,
        action.payload,
      ]
    },
    deleteBranch: (state: StoreState, action: PayloadAction<number>) => {
      state.registrationProcess.branches =
        state.registrationProcess.branches.filter(
          (_, i) => i !== action.payload,
        )
    },
    updateBranch: (
      state: StoreState,
      action: PayloadAction<{ index: number; branch: BranchPayload }>,
    ) => {
      state.registrationProcess.branches =
        state.registrationProcess.branches.map((b, i) =>
          i === action.payload.index ? action.payload.branch : b,
        )
    },
    updateCurrentStep: (state: StoreState, action: PayloadAction<number>) => {
      state.registrationProcess.currentStep = action.payload
    },
    updateStoreBranches: (
      state: StoreState,
      action: PayloadAction<StoreBranch[]>,
    ) => {
      state.storeBranches = action.payload
    },
    updateRequests: (state: StoreState, action: PayloadAction<Store[]>) => {
      state.requests = action.payload
    },
    updateFavorites: (state: StoreState, action: PayloadAction<Favorite[]>) => {
      state.favorites = action.payload
    },
    resetStoreState: (state: StoreState) => {
      ;(state.registrationProcess = {
        currentStep: 1,
        storeInfo: {} as any,
        socialMedia: {},
        owner: {} as any,
        branches: [],
      }),
        (state.store = undefined)
      state.branches = undefined
      state.owner = undefined
      state.requests = []
      state.favorites = []
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  updateStoreInfoValues,
  updateSocialMediaValues,
  updateOwnerInfoValues,
  updateCurrentStep,
  addBranch,
  updateBranch,
  deleteBranch,
  updateBranches,
  updateOwner,
  updateStore,
  updateStoreBranches,
  updateFavorites,
  resetStoreState,
  updateRequests,
} = storeSlice.actions

export default storeSlice.reducer
