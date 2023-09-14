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
        axios.post(`${process.env.NEXT_PUBLIC_VERIFY_API}/${id}`).then((res)=>{
          console.log(res)
        })
          .catch((err)=>{
            console.log(err)
          
        })
    })
  return (
    <div className='w-full flex justify-center items-center md:flex-row flex-col-reverse md:p-6 p-2'>
        <div className='md:w-1/2 w-full'>
            <Image src={Poster} alt='CINE'/>
        </div>
         <div className='flex flex-col items-center text-center md:text-[3rem] text-[25px] font-spartan md:w-1/2 md:p-7 w-full h-full' style={{ fontFamily: 'League Spartan' }}>
        <p className='mb-5'>HOORAY!</p>
        <p>You&apos;ve Registered Successfully!</p>
          <Image src={Gif} alt="Gif"/>
        </div>
        
       
    </div>
  )
}

export default Page