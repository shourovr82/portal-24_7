/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";

const ppStrikeOfStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPPStrikeOfStatus: builder.query({
      query: () => ({
        url: `/pp-status`,
        method: "GET",
      }),
      providesTags: [tagTypes.ppStatus, tagTypes.style],
    }),
    createNewPPStrikeOfStatus: builder.mutation({
      query: (data: any) => ({
        url: `/pp-status`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.ppStatus, tagTypes.style],
    }),
  }),
});

export const {
  useGetAllPPStrikeOfStatusQuery,
  useCreateNewPPStrikeOfStatusMutation,
} = ppStrikeOfStatusApi;
