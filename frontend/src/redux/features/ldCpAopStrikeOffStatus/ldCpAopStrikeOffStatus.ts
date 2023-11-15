/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";

const ldCpAopStrikeOffStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPPStrikeOfStatus: builder.query({
      query: () => ({
        url: `/pp-status`,
        method: "GET",
      }),
      providesTags: [tagTypes.ppStatus, tagTypes.style],
    }),
    createNewLdCpAopStrikeOffStatus: builder.mutation({
      query: (data: any) => ({
        url: `/ld-cp-aop-status/create`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.ldCpAopStrikeOff, tagTypes.style],
    }),
  }),
});

export const {
  useGetAllPPStrikeOfStatusQuery,
  useCreateNewLdCpAopStrikeOffStatusMutation,
} = ldCpAopStrikeOffStatusApi;
