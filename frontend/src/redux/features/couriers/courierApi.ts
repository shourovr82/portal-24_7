/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";

const courierApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCouriers: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/courier",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.style, tagTypes.courier],
    }),

    getNoCouriers: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/courier/style-wise-courier",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.courier],
    }),
    createNewCourier: builder.mutation({
      query: (data: any) => ({
        url: `/courier`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.courier, tagTypes.style],
    }),
    editCourierInfo: builder.mutation({
      query: ({ id, data }: any) => ({
        url: `/courier/update/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.courier, tagTypes.style, tagTypes.orders],
    }),
  }),
});

export const {
  useGetCouriersQuery,
  useGetNoCouriersQuery,
  useCreateNewCourierMutation,
  useEditCourierInfoMutation,
} = courierApi;
