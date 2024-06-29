import React from 'react'
import footerlogo from '../../assets/footerframe.png'
import Image from 'next/image'
import socials from '../../assets/socials.png'


const Footer = () => {
  return (
    <div className="mx-40 mt-20 text-[#FFFFFF] h-[30vh] flex space-x-24">
        <div className='space-y-5 w-[35%]'>
            <Image src={footerlogo} alt='footerlogo' />
            <h1>A progressive web app with intuitive design and AI capabilities to give esport participants the best experience they crave</h1>
        </div>
        <div className='space-y-5 w-[20%]'>
            <h1 className='font-bold text-xl'>Service</h1>
            <div className='space-y-3'>
                <h1>Product</h1>
                <h1>Whitepaper</h1>
                <h1>Careers</h1>
                <h1>Contact us</h1>
            </div>
        </div>
        <div className='space-y-5 w-[35%]'>
            <h1 className='font-bold text-xl'>About us</h1>
            <div>
            <p>Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor</p>
            <Image src={socials} alt='socials' />
            </div>
        </div>
    </div>
  )
}

export default Footer