import { Outlet } from 'react-router-dom'
import Footer from '../Layout/Footer'
import Navbar from '../Layout/Navbar'
import React from 'react'


const AllRouter = () => {
  return (
    <div>


      <Navbar/>

      <Outlet/>
      <Footer/>





    </div>
  )
}

export default AllRouter