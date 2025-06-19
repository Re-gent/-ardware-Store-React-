
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
  tagTypes:['Comment'],
  endpoints: (builder) => ({
    getComments: builder.query<CommentType[], number>({
      query: (id) => `/comments?productID=${id}`,
      //"крючек" для запроса. Чтобы изменения сразу же отображались на странице
      providesTags: ()=>[{type: "Comment", id: "LIST"}]
    }),
    addComment: builder.mutation<void, CommentType>({
      query: (comment) => ({
        url: `comments`,
        method: 'POST',
        body: comment,
      }),
      // ищет нужный "кречек", чтобы отобразить на странице новые данные
      invalidatesTags: [{ type: 'Comment', id: 'LIST' }],
    }),
  }),
})


export const { useGetCommentsQuery, useAddCommentMutation } = commentsApi

