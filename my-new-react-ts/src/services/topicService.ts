import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/createBaseQuery";
import type {IUserItem} from "../types/users/IUserItem";

export const userService = createApi({
    reducerPath: 'topicService',
    baseQuery: createBaseQuery('topics'),
    tagTypes: ['Topics'],

    endpoints: (builder) => ({
        getTopics: builder.query<IUserItem[], void>({
            query: () => {
                return {
                    url: '',
                    method: 'GET'
                };
            },
            providesTags: ["Topics"]
        })
    }),
});

export const {
    useGetTopicsQuery,
} = userService;