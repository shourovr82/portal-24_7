import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tag-types/tag-types";
const TACK_PACK_ROUTES = "tack-pack";

const tackPackApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    CreateTackPack: builder.mutation({
      query: (data) => ({
        url: `/${TACK_PACK_ROUTES}/create-tack-pack`,
        method: "POST",
        data: data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.style],
    }),
    singleTackPack: builder.query({
      query: ({ id }) => {
        return {
          url: `/${TACK_PACK_ROUTES}/get-tack-pack/${id}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.style],
    }),
  }),
});

export const { useCreateTackPackMutation, useSingleTackPackQuery } =
  tackPackApi;
