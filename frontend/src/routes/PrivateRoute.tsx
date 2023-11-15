// import { ReactNode } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useAppSelector } from "../redux/hook";
// import { IUser, RootState } from "../Interface/login";

// interface Iprops {
//   children: ReactNode;
// }

// const PrivateRoute = ({ children }: Iprops) => {
//   //   const { user, isLoading } = useAppSelector((state) => state?.user);
//   const user: IUser | null | undefined = useAppSelector(
//     (state: RootState) => state.auth
//   );

//   const { pathname } = useLocation();

//   if (!user?.accessToken) {
//     return <Navigate to="/login" state={{ path: pathname }} />;
//   }

//   return children;
// };

// export default PrivateRoute;
