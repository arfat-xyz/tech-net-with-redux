import { api } from '../api/apiSlice';

const prodcutApi = api.injectEndpoints({
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
      invalidatesTags: ['COMMENT'],
    }),
    getComments: builder.query({
      query: (id) => `comment/${id}`,
      providesTags: ['COMMENT'],
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetSigleProductQuery,
  usePostCommentMutation,
  useGetCommentsQuery,
} = prodcutApi;
