import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import app from '../Config/firebaseConfig';
import { getAuth ,signOut} from "firebase/auth";



const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {

    const logoutUser = async () => {
      try {
        const auth = getAuth(app);
        // Local authentication clear (JWT/localStorage method)
        localStorage.removeItem("userToken"); // Example: JWT token hatana
        localStorage.removeItem("userStatus"); // Custom auth status hatana
          await signOut(auth)
        alert("User logged out successfully");

        setTimeout(() => {
          navigate("/");
        }, 2000);

      } catch (error) {
        console.error("Logout error: ", error.message);
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-2xl font-semibold">You have been logged out.</h2>
      <p className="mt-2">Redirecting to login page...</p>
    </div>
  );
};

export default Logout;
