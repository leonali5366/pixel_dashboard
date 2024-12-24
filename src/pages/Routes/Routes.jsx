import MainLayout from "@/Layout/MainLayout";
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../Dashboard";
import AuthLayout from "@/Layout/AuthLayout";
import Login from "../Auth/Login/Login";
import Signup from "../Auth/Signup/Signup";
import Development from "../Orders/Development/Development";
import Seo from "../Orders/Seo/Seo";
import Ppc from "../Orders/Ppc/Ppc";
import Hosting from "../Orders/Hosting/Hosting";
import CustomOrder from "../Orders/CustomOrder/CustomOrder";
import ClientOrders from "../Orders/ClientOrders/ClientOrders";
import AllClient from "../Client/AllClient/AllClient";
import AddClient from "../Client/AddClient/AddClient";
import AllStaff from "../Staff/AllStaff/AllStaff";
import AddStaff from "../Staff/AddStaff/AddStaff";
import StaffLogin from "../Auth/Login/StaffLogin";
import ClientProfile from "../Profile/ClientProfile";
import StaffProfile from "../Profile/StaffProfile";
import AdminProfile from "../Profile/AdminProfile";
import OpenATicket from "../Tickets/OpenATicket/OpenATicket";
import AllTickets from "../Tickets/AllTickets/AllTickets";
import AllSolveTickets from "../Tickets/AllSolveTickets/AllSolveTickets";
import AllPackages from "../Packages/AllPackages/AllPackages";
import AddANewPackage from "../Packages/AddANewPackage/AddANewPackage";
import SinglePackage from "../Packages/SinglePackage/SinglePackage";
import SingleTicket from "../Tickets/SingleTicket/SingleTicket";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/development", element: <Development /> },
      { path: "/seo", element: <Seo /> },
      { path: "/ppc", element: <Ppc /> },
      { path: "/hosting", element: <Hosting /> },
      { path: "/order/custom", element: <CustomOrder /> },
      { path: "/order/client/myOrder", element: <ClientOrders /> },
      { path: "/order/client/myOrder", element: <ClientOrders /> },
      { path: "/client/all", element: <AllClient /> },
      { path: "/client/add", element: <AddClient /> },
      { path: "/staff/all", element: <AllStaff /> },
      { path: "/staff/add", element: <AddStaff /> },
      { path: "/profile/client", element: <ClientProfile /> },
      { path: "/profile/staff", element: <StaffProfile /> },
      { path: "/profile/admin", element: <AdminProfile /> },
      { path: "/ticket/create", element: <OpenATicket /> },
      { path: "/ticket/all", element: <AllTickets /> },
      { path: "/ticket/solved", element: <AllSolveTickets /> },
      { path: "/ticket/single/:id", element: <SingleTicket /> },
      { path: "/package/all", element: <AllPackages /> },
      { path: "/package/create", element: <AddANewPackage /> },
      { path: "/package/single/:id", element: <SinglePackage /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/login/staff", element: <StaffLogin /> },
      { path: "/auth/signup", element: <Signup /> },
    ],
  },
]);

export default routes;
