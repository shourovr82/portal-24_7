/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";

const ordersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/orders/style-wise-orders",
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.orders],
    }),
    getAllOrdersLength: builder.query({
      query: () => ({
        url: "/orders/count",
        method: "GET",
      }),
      providesTags: [tagTypes.orders],
    }),

    getAllOrdersPc: builder.query({
      query: () => ({
        url: "/orders/pc",
        method: "GET",
      }),
      providesTags: [tagTypes.orders],
    }),

    getAllOrdersMonthlyStatic: builder.query({
      query: () => ({
        url: "/orders/month",
        method: "GET",
      }),
      providesTags: [tagTypes.orders],
    }),
    getSingleOrder: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.orders],
    }),
    createNewOrder: builder.mutation({
      query: (data) => ({
        url: `/orders`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.orders, tagTypes.style, tagTypes.factory],
    }),
    editOrderInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/update/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.orders, tagTypes.style, tagTypes.factory],
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useCreateNewOrderMutation,
  useGetAllOrdersLengthQuery,
  useGetAllOrdersMonthlyStaticQuery,
  useEditOrderInfoMutation,
  useGetAllOrdersPcQuery,
} = ordersApi;
