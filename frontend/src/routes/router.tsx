import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardHome from "../pages/DashboardHome";
import ErrorElement from "../error/ErrorElement";
import ErrorPage from "../error/ErrorPage";
import Styles from "../pages/styles/Styles";
import AddStyle from "../pages/styles/AddStyle";
import StyleLists from "../pages/styles/StyleLists";
import FactoryPort from "../pages/factoryAndPort/FactoryPort";
import AddPo from "../pages/po/AddPo";
import AddUser from "../pages/users/AddUser";
import UserLists from "../pages/users/UserLists";
import AddItem from "../pages/Item/AddItem";
import PoLists from "../pages/po/PoList";
import CourierLists from "../pages/courier/CourierLists";
import AddCourier from "../pages/courier/AddCourier";
import LogIn from "../pages/authentication/LogIn";
import NoOfCourier from "../pages/courier/NoOfCourier";
import EditPo from "../pages/po/EditPo";
import LdCpAopStatus from "../pages/status/LdCpAopStatus";
import PpStatus from "../pages/status/PpStatus";
import BulkProductionStatus from "../pages/status/BulkProductionStatus";
import StyleAssign from "../pages/styles/StyleAssign";
import AddPpSubmission from "../pages/ppSubmission/AddPpSubmission";
import TackPack from "../pages/tackPack/TackPack";
import ProblemReports from "../pages/users/ProblemReports";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <DashboardHome />,
      },
      {
        path: "/styles",
        element: <Styles />,
      },
      {
        path: "/styles/listofstyle",
        element: <StyleLists />,
      },
      {
        path: "styles/addstyle",
        element: <AddStyle />,
      },
      {
        path: "styles/styleAssign",
        element: <StyleAssign />,
      },
      {
        path: "/factoryPort",
        element: <FactoryPort />,
      },
      {
        path: "/tackPack",
        element: <TackPack />,
      },
      {
        path: "/ppSubmission",
        element: <AddPpSubmission />,
      },
      {
        path: "/po/addpo",
        element: <AddPo />,
      },
      {
        path: "/po/editPo/:id",
        element: <EditPo />,
      },
      {
        path: "/po/poLists",
        element: <PoLists />,
      },
      {
        path: "/courier/courierLists",
        element: <CourierLists />,
      },
      {
        path: "/courier/noOfCourier",
        element: <NoOfCourier />,
      },
      {
        path: "/courier/addCourier",
        element: <AddCourier />,
      },
      {
        path: "/item/addItem",
        element: <AddItem />,
      },

      {
        path: "/ldCpAopStatus",
        element: <LdCpAopStatus />,
      },
      {
        path: "/ppStatus",
        element: <PpStatus />,
      },
      {
        path: "/bulkProductionStatus",
        element: <BulkProductionStatus />,
      },
      {
        path: "/users/userLists",
        element: <UserLists />,
      },
      {
        path: "/users/addUser",
        element: <AddUser />,
      },
      {
        path: "/users/problems-reported",
        element: <ProblemReports />,
      },
    ],
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
