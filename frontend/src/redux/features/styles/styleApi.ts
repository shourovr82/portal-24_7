/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";

const styleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStyles: builder.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `/styles`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.style],
    }),

    getAllStylesLength: builder.query({
      query: () => ({
        url: "/styles/count",
        method: "GET",
      }),
      providesTags: [tagTypes.style],
    }),
    getStyleNo: builder.query({
      query: () => {
        return {
          url: `/styles/get-all-style-no?limit=500`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.style],
    }),

    singleStyle: builder.query({
      query: ({ id }) => {
        return {
          url: `/styles/single-style/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.style, tagTypes.ppSubmission],
    }),
    CreateNewStyle: builder.mutation({
      query: (data) => ({
        url: `/styles/create-style`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.style],
    }),
    editStyle: builder.mutation({
      query: ({ id, data }) => ({
        url: `/styles/update/${id}`,
        method: "PATCH",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.style, tagTypes.orders],
    }),
    factoryAssignOnStyle: builder.mutation({
      query: (data) => ({
        url: `/styles/factory-style-assign`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.style, tagTypes.factory, tagTypes.orders],
    }),
    deleteStyle: builder.mutation({
      query: (id) => ({
        url: `/styles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.style],
    }),
    getRecentCommentsOnStyles: builder.query({
      query: () => {
        return {
          url: `/styles/get-recent-comments`,
          method: "GET",
        };
      },
      providesTags: [
        tagTypes.style,
        tagTypes.bulkStatus,
        tagTypes.ldCpAopStrikeOff,
        tagTypes.ppStatus,
      ],
    }),
  }),
});

export const {
  useGetStylesQuery,
  useGetStyleNoQuery,
  useSingleStyleQuery,
  useCreateNewStyleMutation,
  useEditStyleMutation,
  useDeleteStyleMutation,
  useFactoryAssignOnStyleMutation,
  useGetAllStylesLengthQuery,
  useGetRecentCommentsOnStylesQuery,
} = styleApi;
