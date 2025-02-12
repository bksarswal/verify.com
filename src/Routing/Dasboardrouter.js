import Footer from '../Layout/Footer'
import DashbordNavbar from '../Layout/DasbordNavbar/DashborNavmain/DashbordNavmain'
import React from 'react'
import { Outlet } from 'react-router-dom'

const Dasboardrouter = () => {
  return (
    <div>

<DashbordNavbar/>

<Outlet/>

<Footer/>

    </div>
  )
}

export default Dasboardrouter