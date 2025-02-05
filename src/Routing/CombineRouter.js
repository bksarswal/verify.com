import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AllRouter from "./AllRouter";
import AuthRouter from "./AuthRouter";
import Dashboardrouter from "./Dasboardrouter";
import Footer from "../Layout/Footer";

function CombineRouter() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstVisit, setFirstVisit] = useState(true);

  useEffect(() => {
    const userStatus = localStorage.getItem("userStatus");

    if (userStatus === "authenticated") {
      setIsAuthenticated(true);
      setFirstVisit(false);
    } else if (userStatus === "signedUp") {
      setFirstVisit(false);
    }
  }, []);

  const handleSignup = () => {
    setFirstVisit(false);
    localStorage.setItem("userStatus", "signedUp");
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setFirstVisit(false);
    localStorage.setItem("userStatus", "authenticated");
  };

  return (
    <>
      <Routes>
        {/* First Time Visit */}
        {firstVisit && <Route path="*" element={<AllRouter />} />}

        {/* Auth Routes (Signup, Signin, etc.) */}
        {!isAuthenticated && !firstVisit && (
          <>
            <Route path="/*" element={<AuthRouter />} />
            <Route path="/signup" element={<Navigate to="/signin" />} />
          </>
        )}

        {/* Dashboard Route */}
        {isAuthenticated && !firstVisit && <Route path="/*" element={<Dashboardrouter />} />}
      </Routes>

      <Footer />
    </>
  );
}

export default CombineRouter;
