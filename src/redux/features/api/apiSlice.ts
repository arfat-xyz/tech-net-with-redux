import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://tech-net-server-eight.vercel.app/`,
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
    getSigleProduct: builder.query({
      query: (id) => `product/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `comment/${id}`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetSigleProductQuery,
  usePostCommentMutation,
} = api;
