/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";

const itemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `/items`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.items],
    }),
    getAllItemNames: builder.query({
      query: () => ({
        url: `/items/get-all-item-names?limit=200`,
        method: "GET",
      }),
      providesTags: [tagTypes.items],
    }),

    updateItem: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/items/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.items, tagTypes.style, tagTypes.orders],
    }),

    createNewItem: builder.mutation({
      query: (data: any) => ({
        url: `/items`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.items],
    }),
  }),
});

export const {
  useGetAllItemsQuery,
  useGetAllItemNamesQuery,
  useCreateNewItemMutation,
  useUpdateItemMutation,
} = itemsApi;
