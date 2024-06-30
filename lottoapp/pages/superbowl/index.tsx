import React from 'react'
import Info from '../components/Info';
import Navbar from '../components/Navbar';
import Superbowlcontent from '../components/Superbowlcontent'
import Footer from '../components/Footer';
import Copyright from '../components/Copyright';

const Superbowl = () => {
  return (
    <div className=' bg-[#110E0E] min-h-[100vh] pb-4'>
         <Info />
        <Navbar />
        <Superbowlcontent />
        <Footer />
        <Copyright />
    </div>
  )
}

export default Superbowl