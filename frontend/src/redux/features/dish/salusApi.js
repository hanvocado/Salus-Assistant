import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getChatUrl from '../../../utils/getChatUrl';

// Define baseQuery with necessary configurations
const baseQuery = fetchBaseQuery({
  baseUrl: getChatUrl(),  // Make sure this function returns the correct base URL
  credentials: 'include',  // Keep the credentials for cookies/session if necessary
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json'); // Set Content-Type globally
    return headers;
  },
});

const salusApi = createApi({
  reducerPath: 'salusApi',
  baseQuery,
  tagTypes: ['salus'],
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (question) => ({
        url: '/api/chat',
        method: 'POST',
        body: {
          message: question, 
        },
      }),
    }),
  }),
});

export const { useSendMessageMutation } = salusApi;  // Renamed hook to match mutation name
export default salusApi;
