/* eslint-disable no-unused-vars */
import { RouterProvider } from "react-router-dom";
import routes from "./pages/Routes/Routes";
import { useContext } from "react";
import { AuthContext } from "./Context/UserContext";
import { Toaster } from "react-hot-toast";

const App = () => {
  const {user} = useContext(AuthContext);
  
  return (
    <div>
      <RouterProvider router={routes} /> 
      <Toaster position="top-center" reverseOrder={false}/>
    </div>
  );
};

export default App;
