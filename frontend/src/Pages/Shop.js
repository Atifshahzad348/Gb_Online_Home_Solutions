// import react from 'react'
// import { Link } from 'react-router-dom'

import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import ShopHeroSection from '../Components/ShopHeroSection'

export default function Shop() {
  return (
    <div>
      <Navbar firstName="Gilgit-" lastName="Shop"/>
       <ShopHeroSection/>
      <Footer/>
    </div>
  )
}
