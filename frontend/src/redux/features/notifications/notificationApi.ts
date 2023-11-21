import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotification: builder.query({
      query: () => ({
        url: `/notification`,
        method: "GET",
      }),
      providesTags: [tagTypes.notification],
    }),
  }),
});

export const { useGetAllNotificationQuery } = notificationApi;
