import { createApi } from '@reduxjs/toolkit/query/react'
import Envs from 'react-native-config'
import {
  ApiService,
  ServiceBody,
  ServiceParams,
  ServiceResponse,
} from './types'
import { fetchBase } from './utils'

export const api = createApi({
  baseQuery: fetchBase,
  tagTypes: [],
  endpoints: builder => ({
    apiService: builder.mutation<
      ServiceResponse,
      ApiService<ServiceBody, ServiceParams>
    >({
      query: ({ method, url, body, params, headers }) => ({
        headers,
        url,
        method,
        body,
        params,
      }),
    }),
  }),
})

// Export hooks for usage in functional components

export const { useApiServiceMutation } = api
