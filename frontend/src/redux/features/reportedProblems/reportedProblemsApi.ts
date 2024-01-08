/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";
const reportedProblemsRoute = 'reported-problems';

const reportedProblemsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReportedProblems: builder.query({
      query: (arg: Record<string, any>) => ({
        url: `/${reportedProblemsRoute}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.reportedProblems],
    }),
    

    updateReportedProblem: builder.mutation({
      query: ({ problemReportsId, data }: any) => ({
        url: `/${reportedProblemsRoute}/update/${problemReportsId}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.reportedProblems,],
    }),

    createNewProblem: builder.mutation({
      query: (data: any) => ({
        url: `/${reportedProblemsRoute}`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.reportedProblems],
    }),
  }),
});

export const { 
  useGetAllReportedProblemsQuery,
useCreateNewProblemMutation,
useUpdateReportedProblemMutation
} = reportedProblemsApi;
