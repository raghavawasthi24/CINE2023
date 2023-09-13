"use client"

import React, { useEffect } from 'react'
import Poster from "../../../public/CINE.png"
import Image from 'next/image'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Gif from "../../../public/Festivities.gif"

const Page = () => {
    const { id } = useParams();
    useEffect(()=>{
        axios.post(`https://csi-examportal.onrender.com/api/verify/${id}`)
    })
  return (
    <div className='w-full flex justify-center items-center md:flex-row flex-col-reverse md:p-6 p-2'>
        <div className='md:w-1/2 w-full'>
            <Image src={Poster} alt='CINE'/>
        </div>
         <div className='flex flex-col items-center text-center md:text-[35px] text-[20px] text-blue-700 font-bold md:w-1/2 md:p-6  w-full h-full'>
        <p className=' '>HOORAY!</p>
        <p>You have successfully registered!</p>
          <Image src={Gif} alt="Gif"/>
        </div>
        
       
    </div>
  )
}

export default Page