import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./Routing/Protectedroute";
import Signin from "./Screens/Signin";
import Signup from "./Screens/Signup";
import ResetPassword from "./Screens/Resetpassword";
import VerifyOtp from "./Screens/VerifyOtp";
import Logout from "./Screens/Logout";
import DashboardHome from "./Screens/Dashboard/DashboardHome";
import Home from "./Screens/Home";
import HowItWorks from "./Screens/HowItsWork";
import About from "./Screens/About";
import AllRouter from "./Routing/AllRouter";
import Dashboardrouter from "./Routing/Dasboardrouter";
import AuthRouter from "./Routing/AuthRouter";
import Adminhome from "./Screens/AdminDashbord/Adminhome";
import Adminrouter from "./Routing/Adminrouter";
import Updateitms from "./Screens/AdminDashbord/Updateitms";
import UserProfilePage from "./Screens/Dashboard/Profile/Userprofile";
import WithdrawalPag from "./Screens/Dashboard/Profile/Withdraw/Withdraw";


const MainRouter = createBrowserRouter([
  {
    path: "",
    element: <AllRouter />,
    children: [
      { path: "", element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "howitsworks", element: <HowItWorks /> },
      { path: "about", element: <About /> },
    ],
  },

  {
    path: "/",
    element: <AuthRouter />,
    children: [
      { path: "", element: <Signin /> },
      { path: "signin", element: <Signin /> },
      { path: "logout", element: <Logout /> },
      { path: "signup", element: <Signup /> },
      { path: "resetpassword", element: <ResetPassword /> },
      { path: "verifyotp", element: <VerifyOtp /> },
      { path: "logout", element: <Logout /> },
      
    ],
  },

  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Dashboardrouter />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <DashboardHome /> },
      { path: "home", element: <DashboardHome /> },
      { path: "profile", element: <UserProfilePage /> },
      { path: "withdraw", element: <WithdrawalPag /> },
    ],
  },

  {
    path: "admindashboard",
    element: (
      <ProtectedRoute adminOnly>
        <Adminrouter />
      </ProtectedRoute>
    ),
    children: [
      { path: "", element: <Adminhome /> },
      { path: "additems", element: <Adminhome/> },
      { path: "update", element: <Updateitms/> },
      { path: "dashboardhome", element: <DashboardHome/> },
    ],
  }
  
]);

const App = () => {
  return <RouterProvider router={MainRouter} />;
};

export default App;
