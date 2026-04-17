import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';
import { User } from '../slices/authSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    getMe: builder.query<User, void>({
      query: () => '/users/me',
    }),
  }),
});

export const { useGetMeQuery } = userApi;
