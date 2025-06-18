import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ProductType } from '../types'

//реализуется с помощью RTK Query API. Вместо стандатных слайсеров. 
export const brandsApi = createApi({
  reducerPath: 'brandsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getBrands: builder.query<string[], void>({
      query: (name) => `/brands`,
    }),
    getProduct: builder.query<ProductType, string>({
      query: (id) => `/products/${id}`,
    }),
  }),
})


export const { useGetBrandsQuery, useGetProductQuery } = brandsApi