import Footer from '../Layout/Footer'
import Navbar from '../Layout/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthRouter = () => {
  return (
    <div>
      <Navbar/>

        <Outlet/>

        <Footer/>
    </div>
  )
}

export default AuthRouter