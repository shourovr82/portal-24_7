/* eslint-disable @typescript-eslint/no-explicit-any */

import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";

const ppSubmissionDateApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPpSubmissionDate: builder.mutation({
      query: (data) => ({
        url: `/pp-submission/submission-date`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.ppSubmission, tagTypes.style],
    }),
    createPpSubmittedDate: builder.mutation({
      query: (data: any) => ({
        url: `/pp-submission/submission-date/srv`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.ppSubmission, tagTypes.style],
    }),
    testPpSubmittedDate: builder.mutation({
      query: (data: any) => ({
        url: `/pp-submission/submit-pp-date`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.ppSubmission, tagTypes.style],
    }),
  }),
});

export const {
  useCreatePpSubmissionDateMutation,
  useCreatePpSubmittedDateMutation,
  useTestPpSubmittedDateMutation,
} = ppSubmissionDateApi;
