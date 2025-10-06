import {createApi} from "@reduxjs/toolkit/query/react";
import {createBaseQuery} from "../utils/createBaseQuery";
import type {IUserItem} from "../types/users/IUserItem";
import type {IRegisterItem} from "../types/users/IUserRegister.ts";

export const userService = createApi({
    reducerPath: 'userService',
    baseQuery: createBaseQuery('users'),
    tagTypes: ['Users'],

    endpoints: (builder) => ({
        getUsers: builder.query<IUserItem[], void>({
            query: () => {
                return {
                    url: '',
                    method: 'GET'
                };
            },
            providesTags: ["Users"]
        }),
        registerUser: builder.mutation<IUserItem, IRegisterItem>({
            query: (user) => {
                return {
                    url: '',
                    method: 'POST',
                    body: user
                };
            },
            invalidatesTags: ["Users"]
        })

    }),
})

export const {
    useGetUsersQuery,
    useRegisterUserMutation,
} = userService;