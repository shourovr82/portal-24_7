/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";

const factoriesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFactories: builder.query({
      query: () => ({
        url: `/factories?limit=20`,
        method: "GET",
      }),
      providesTags: [tagTypes.factory],
    }),
    getAllFactoriesLength: builder.query({
      query: () => ({
        url: "/factories/count",
        method: "GET",
      }),
      providesTags: [tagTypes.factory],
    }),
    getAllFactoryNames: builder.query({
      query: () => ({
        url: `/factories/get-all-factory-names?limit=200`,
        method: "GET",
      }),
      providesTags: [tagTypes.factory],
    }),
    createNewFactory: builder.mutation({
      query: (data: any) => ({
        url: `/factories`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.factory],
    }),
    updateFactory: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/factories/update/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.factory, tagTypes.style, tagTypes.orders],
    }),
  }),
});

export const {
  useGetAllFactoriesQuery,
  useGetAllFactoryNamesQuery,
  useCreateNewFactoryMutation,
  useGetAllFactoriesLengthQuery,
  useUpdateFactoryMutation,
} = factoriesApi;
