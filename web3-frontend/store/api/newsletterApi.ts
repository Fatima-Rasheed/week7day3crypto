import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseApi';

interface SubscribeRequest {
  email: string;
}

interface SubscribeResponse {
  success: boolean;
  message: string;
}

export const newsletterApi = createApi({
  reducerPath: 'newsletterApi',
  baseQuery,
  endpoints: (builder) => ({
    subscribeToNewsletter: builder.mutation<SubscribeResponse, SubscribeRequest>({
      query: (body) => ({
        url: '/newsletter/subscribe',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSubscribeToNewsletterMutation } = newsletterApi;
