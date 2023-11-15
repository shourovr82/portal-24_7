import { baseApi } from "./baseApi";
// import authReducer from "../features/auth/authSlice";

export const reducer = {
  [baseApi.reducerPath]: baseApi.reducer,
  // auth: authReducer,
};
