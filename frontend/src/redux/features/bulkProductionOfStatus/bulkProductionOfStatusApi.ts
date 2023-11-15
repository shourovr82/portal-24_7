/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";

const bulkProductionOfStatusApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBulkProductionOfStatus: builder.query({
      query: () => ({
        url: `/bulk-status`,
        method: "GET",
      }),
      providesTags: [tagTypes.bulkStatus, tagTypes.style],
    }),
    createNewBulkProductionOfStatus: builder.mutation({
      query: (data: any) => ({
        url: `/bulk-status`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.bulkStatus, tagTypes.style],
    }),
  }),
});

export const {
  useGetAllBulkProductionOfStatusQuery,
  useCreateNewBulkProductionOfStatusMutation,
} = bulkProductionOfStatusApi;
