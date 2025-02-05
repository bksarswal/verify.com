

import React from 'react'
import { Routes, Route } from "react-router-dom";

import Navbar from '../Layout/Navbar';
import ResetPassword from '../Screens/Resetpassword';
import VerifyOtp from '../Screens/VerifyOtp';
import Signin from '../Screens/Signin';
import Signup from '../Screens/Signup';

function AuthRouter() {
  return (
    <>  
        {/* Navbar */}
       
          <Navbar />
       
      <Routes>
     
        <Route path="/signin" element={ <Signin />  } />
        <Route path="/signup" element={<Signup/>   } />
        <Route path="/resetpassword" element={ <ResetPassword />   } />
        <Route path="/verifyotp" element={ <VerifyOtp />   } />
        
      </Routes>
     
    </>
  )
}

export default AuthRouter