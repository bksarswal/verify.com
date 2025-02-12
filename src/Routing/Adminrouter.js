import AdminNavbar from '../Layout/AdminNavbar'
import Footer from '../Layout/Footer'

import React from 'react'
import { Outlet } from 'react-router-dom'

const Adminrouter = () => {
  return (
    <div>
        
        <AdminNavbar/>

        <Outlet/>

        <Footer/>
    </div>
  )
}

export default Adminrouter