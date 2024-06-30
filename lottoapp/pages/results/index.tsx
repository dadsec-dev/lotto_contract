import React from 'react'
import Info from '../components/Info';
import Navbar from '../components/Navbar';
import Resultcontent from '../components/Resultcontent';
import Footer from '../components/Footer';
import Copyright from '../components/Copyright';

const Result = () => {
  return (
    <div className=' bg-[#110E0E] min-h-[100vh] pb-4'>
         <Info />
        <Navbar />
        <Resultcontent />
        <Footer />
        <Copyright />
    </div>
  )
}

export default Result