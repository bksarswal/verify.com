// import Footer from '../Layout/Footer'
import DashbordNavbar from '../Layout/DasbordNavbar/DashborNavmain/DashbordNavmain'
import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardFooter from '../Layout/dashboardfooter'

const Dasboardrouter = () => {
  return (
    <div>

<DashbordNavbar/>

<Outlet/>

<DashboardFooter/>

    </div>
  )
}

export default Dasboardrouter