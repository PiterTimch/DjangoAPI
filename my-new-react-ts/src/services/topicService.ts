import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/createBaseQuery";
import type {IParentTopic} from "../types/topics/IParentTopic.ts";

export const topicService = createApi({
    reducerPath: 'topicService',
    baseQuery: createBaseQuery('topics'),
    tagTypes: ['Topics'],

    endpoints: (builder) => ({
        getTopics: builder.query<IParentTopic[], void>({
            query: () => {
                return {
                    url: '',
                    method: 'GET'
                };
            },
            providesTags: ["Topics"]
        }),

        getRootTopics: builder.query<IParentTopic[], void>({
            query: () => {
                return {
                    url: '?parent=null',
                    method: 'GET'
                };
            },
            providesTags: ["Topics"]
        }),
    }),
});

export const {
    useGetTopicsQuery,
    useGetRootTopicsQuery,
} = topicService;