"use client"

import React, { useEffect } from 'react'
import Poster from "../../../public/CINE.png"
import Image from 'next/image'
import axios from 'axios'
import { useParams } from 'react-router-dom';

const Page = () => {
    const { id } = useParams();
    useEffect(()=>{
        axios.post(`https://csi-examportal.onrender.com/api/verify/${id}`)
    })
  return (
    <div className='w-screen h-screen object-contain mx-auto flex items-center justify-center'>
        <div className='w-1/2'>
            <Image src={Poster} width={450} height={450} alt='CINE'/>
        </div>
         <div className='flex flex-col items-center w-1/2'>
        <p className='text-[50px] text-blue-700 font-semibold'>HOORAY!</p>
        <p>You have successfully registered!</p>
        </div>
        
       
    </div>
  )
}

export default Page