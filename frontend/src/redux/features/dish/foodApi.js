import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/getBaseURL';
import getChatUrl from '../../../utils/getChatUrl';

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}`,

    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const foodApi = createApi({
    reducerPath: 'foodApi',
    baseQuery,
    tagTypes: ['Dishes'],
    endpoints: (builder) => ({
        // fectchAllBooks: builder.query({
        //     query: () => '/',
        //     providesTags: ['Dishes'],
        // }),
        // fetchBookById: builder.query({
        //     query: (id) => `/${id}`,
        //     // providesTags: ['Book'], update all books when a book is added
        //     providesTags: (result, error, id) => [{ type: 'Book', id }], // update only the book with the given id

        // }),
        addInfor: builder.mutation({
            query: (newInfor) => ({
                url: '/app/api/profile/init',
                method: 'POST',
                body: newInfor,
            }),
            invalidatesTags: ['Dishes'],
        }),
        addDish: builder.mutation({
            query: (newDish) => ({
                url: '/app/salus/food-image',
                method: 'POST',
                body: newDish,
            }),
            invalidatesTags: ['Dishes'],
        }),


        fetchHistory: builder.query({
            query: ({ from, to }) => ({
                url: '/app/api/food-history/static',
                params: { from, to },  // Pass `from` and `to` as query parameters
            }),
            invalidatesTags: ['Dishes'], // This will invalidate the 'Dishes' tag
        }),

        fetchSuggestion: builder.query({
            query: () => ({
                url: '/app/salus/planning',
            }),
            invalidatesTags: ['Diet'],
        }),

        fetchSuggestFood: builder.query({
            query: () => ({
                url: '/app/salus/suggestion',
            }),
        })
        

        })
    });


    export const { useAddInforMutation, useAddDishMutation, useFetchHistoryQuery, useGetPlanningMutation, useFetchSuggestionQuery, useFetchSuggestFoodQuery } = foodApi;
    export default foodApi;