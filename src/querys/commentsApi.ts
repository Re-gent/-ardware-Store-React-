
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


type CommentType = {
  userName: string;
  text: string;
  productID: number;
  date: string;
  // id?: number - необязателный параметр (опциональное поле)
  id?: number;
};

//реализуется с помощью RTK Query API. Вместо стандатных слайсеров. 
export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
  endpoints: (builder) => ({
    getComments: builder.query<CommentType[], number>({
      query: (id) => `/comments?productID=${id}`,
    }),
    addComment: builder.mutation<void, CommentType>({
      query: (comment) => ({
        url: `comments`,
        method: 'POST',
        body: comment,
      }),
      //invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
  }),
})


export const { useGetCommentsQuery, useAddCommentMutation } = commentsApi

