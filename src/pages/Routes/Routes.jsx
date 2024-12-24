import MainLayout from "@/Layout/MainLayout"
import { createBrowserRouter } from "react-router-dom"
import Dashboard from "../Dashboard"
import AuthLayout from "@/Layout/AuthLayout"
import Login from "../Auth/Login/Login"
import Signup from "../Auth/Signup/Signup"
import Development from "../Orders/Development/Development"
import Seo from "../Orders/Seo/Seo"
import Ppc from "../Orders/Ppc/Ppc"
import Hosting from "../Orders/Hosting/Hosting"
import CustomOrder from "../Orders/CustomOrder/CustomOrder"
import ClientOrders from "../Orders/ClientOrders/ClientOrders"

const routes = createBrowserRouter([
    {
        path: "/",
        element : <MainLayout/>,
        children : [
            { path: "/", element: <Dashboard /> },
            { path: "/development", element: <Development /> },
            { path: "/seo", element: <Seo /> },
            { path: "/ppc", element: <Ppc /> },
            { path: "/hosting", element: <Hosting /> },
            { path: "/order/custom", element: <CustomOrder /> },
            { path: "/order/client/myOrder", element: <ClientOrders /> },
        ]
    },
    {
        path : "/auth",
        element : <AuthLayout/>,
        children : [
            { path: "/auth/login", element: <Login /> },
            { path: "/auth/signup", element: <Signup /> }
        ]
    }
])

export default routes