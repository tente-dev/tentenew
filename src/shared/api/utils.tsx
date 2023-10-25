import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from '@reduxjs/toolkit/dist/query'
import { RootState } from '@store'
import { setLoadingAPI } from 'shared/feedback'

export const multipartHeader = {
  'Content-Type': `multipart/form-data; charset=utf-8`,
}

const basePath = 'https://www.tente.lat'

const baseQuery = fetchBaseQuery({
  baseUrl: basePath,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

const fetchBase: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const { dispatch } = api
  dispatch(setLoadingAPI(true))
  let result = await baseQuery(args, api, extraOptions)
  dispatch(setLoadingAPI(false))
  return result
}

export { basePath, baseQuery, fetchBase }
