/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";

const portsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPorts: builder.query({
      query: () => ({
        url: `/ports?limit=200`,
        method: "GET",
      }),
      providesTags: [tagTypes.port],
    }),
    getAllPortNames: builder.query({
      query: () => ({
        url: `/ports/get-all-port-names?limit=200`,
        method: "GET",
      }),
      providesTags: [tagTypes.port],
    }),
    createNewPort: builder.mutation({
      query: (data: any) => ({
        url: `/ports`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.port],
    }),
    updatePort: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/ports/update/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.port, tagTypes.style, tagTypes.orders],
    }),
  }),
});

export const {
  useGetAllPortsQuery,
  useGetAllPortNamesQuery,
  useCreateNewPortMutation,
  useUpdatePortMutation,
} = portsApi;
