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
import CustomOrder from "../Orders/ClientOrders/CustomOrder/CustomOrder";
import AllClient from "../Client/AllClient/AllClient";
import AddClient from "../Client/AddClient/AddClient";
import AllStaff from "../Staff/AllStaff/AllStaff";
import AddStaff from "../Staff/AddStaff/AddStaff";
import ClientProfile from "../Profile/ForUsers/ClientProfile";
import StaffProfile from "../Profile/ForUsers/StaffProfile";
import AdminProfile from "../Profile/ForUsers/AdminProfile";
import OpenATicket from "../Tickets/OpenATicket/OpenATicket";
import AllTickets from "../Tickets/AllTickets/AllTickets";
import AllSolveTickets from "../Tickets/AllSolveTickets/AllSolveTickets";
import AllPackages from "../Packages/AllPackages/AllPackages";
import AddANewPackage from "../Packages/AddANewPackage/AddANewPackage";
import SinglePackage from "../Packages/SinglePackage/SinglePackage";
import SingleTicket from "../Tickets/SingleTicket/SingleTicket";
import StaffSinglePage from "../Staff/StaffSinglePage/StaffSinglePage";
import OrderSinglePage from "../Orders/OrderSinglePage/OrderSinglePage";
import NewOrders from "../Orders/NewOrders/NewOrders";
import NewOrderSinglePage from "../Orders/NewOrderSinglePage/NewOrderSinglePage";
import Mern from "../Orders/Technology/MERN/Mern";
import Shopify from "../Orders/Technology/Shopify/Shopify";
import Wordpress from "../Orders/Technology/Wordpress/Wordpress";
import Wix from "../Orders/Technology/Wix/Wix";
import ClientNewOrder from "../Orders/ClientOrders/ClientNewOrder/ClientNewOrder";
import ClientCurrentOrders from "../Orders/ClientOrders/ClientCurrentOrders/ClientCurrentOrders";
import ClientPreviousOrders from "../Orders/ClientOrders/ClientPreviousOrders/ClientPreviousOrders";
import ClientNewOrderSinglePage from "../Orders/ClientOrders/ClientNewOrder/ClientNewOrderSinglePage";
import StaffProfileToView from "../Profile/ToView/StaffProfileToView";
import ClientSinglePage from "../Orders/ClientOrders/ClientSinglePage/ClientSinglePage";
import CreateCustomPackageRequest from "../Packages/CreateCustomPackageRequest/CreateCustomPackageRequest";
import AllCustomPackageRequest from "../Packages/AllCustomPackageRequest/AllCustomPackageRequest";
import ClientAllCustomPackageRequest from "../Packages/ClientAllCustomPackageRequest/ClientAllCustomPackageRequest";
import AllCustomPackages from "../Packages/AllCustomPackages/AllCustomPackages";
import ClientCurrentOrderSinglePage from "../Orders/ClientOrders/ClientCurrentOrders/ClientCurrentOrderSinglePage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      // Home routes
      { path: "/", element: <Dashboard /> },

      // order routes
      { path: "/new", element: <NewOrders /> },
      { path: "/new/single/:id", element: <NewOrderSinglePage /> },
      { path: "/development", element: <Development /> },

      { path: "/development/mern", element: <Mern /> },
      { path: "/development/shopify", element: <Shopify /> },
      { path: "/development/wordpress", element: <Wordpress /> },
      { path: "/development/wix", element: <Wix /> },

      { path: "/seo", element: <Seo /> },
      { path: "/ppc", element: <Ppc /> },
      { path: "/hosting", element: <Hosting /> },

      { path: "/order/client/current", element: <ClientCurrentOrders /> },
      { path: "/order/client/previous", element: <ClientPreviousOrders /> },
      { path: "/order/client/new", element: <ClientNewOrder /> },
      { path: "/order/custom", element: <CustomOrder /> },

      { path: "/order/single/:id", element: <OrderSinglePage /> },

      // Client  order single page
      {
        path: "/order/client/single/new/:id",
        element: <ClientNewOrderSinglePage />,
      },
      {
        path: "/order/client/single/current/:id",
        element: <ClientCurrentOrderSinglePage />,
      },

      // client routes
      { path: "/client/all", element: <AllClient /> },
      { path: "/client/add", element: <AddClient /> },
      { path: "/client/single/:email", element: <ClientSinglePage /> },

      // staff routes
      { path: "/staff/all", element: <AllStaff /> },
      { path: "/staff/add", element: <AddStaff /> },
      { path: "/staff/single/:email", element: <StaffSinglePage /> },

      // profile routes
      { path: "/profile/client", element: <ClientProfile /> },
      { path: "/profile/staff", element: <StaffProfile /> },
      { path: "/profile/admin", element: <AdminProfile /> },

      // ticket routes
      { path: "/ticket/create", element: <OpenATicket /> },
      { path: "/ticket/all", element: <AllTickets /> },
      { path: "/ticket/solved", element: <AllSolveTickets /> },
      { path: "/ticket/single/:id", element: <SingleTicket /> },

      // package routes
      { path: "/package/public/all", element: <AllPackages /> },
      { path: "/package/custom/all", element: <AllCustomPackages /> },
      { path: "/package/create", element: <AddANewPackage /> },
      {
        path: "/package/create/custom",
        element: <CreateCustomPackageRequest />,
      },
      {
        path: "/package/custom/allRequests",
        element: <AllCustomPackageRequest />,
      },
      {
        path: "/package/myRequests",
        element: <ClientAllCustomPackageRequest />,
      },
      { path: "/package/single/:id", element: <SinglePackage /> },

      // profile routes
      { path: "/profile/staff/:email", element: <StaffProfileToView /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/signup", element: <Signup /> },
    ],
  },
]);

export default routes;
