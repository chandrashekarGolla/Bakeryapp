import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Contactus from '../ContactUs/Contactus'
import './RootLayout.css'
function RootLayout() {

  return (
    <div>
      <Navbar/>
      <Outlet />
      <Contactus/>
      <Footer/>
    </div>
  )
}
export default RootLayout

