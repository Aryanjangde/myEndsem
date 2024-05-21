import Auth from "./components/Auth";
import { useState, useContext } from "react";
import { ApiContext } from "./components/contextFolder/Context";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/SignUp";
import Navbar from "./components/Navbar";
import CarouselSpace from "./components/CaraouslelSpace";

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';

        
function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Navbar/>,
      children: [
        {
          path:"/",
          element:<CarouselSpace/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/signup",
          element:<Signup/>
        }
      ]
    }

  
])
  const ApiContext_ = useContext(ApiContext);
  return (
    <div className="bg-black h-full">
    <PrimeReactProvider>
      <RouterProvider router={router}/>
    </PrimeReactProvider>
    
    </div>
  );
}

export default App;
