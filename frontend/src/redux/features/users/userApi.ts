import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myProfile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    editUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/update-user/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `/users/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getAllUsers: builder.query({
      query: (arg: Record<string, unknown>) => ({
        url: `/users`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useMyProfileQuery,
  useLoginMutation,
  useGetAllUsersQuery,
  useEditUserMutation,
} = userApi;
