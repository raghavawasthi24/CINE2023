import React from 'react'
import Poster from "../../../public/CINE.png"
import Image from 'next/image'

const page = () => {
  return (
    <div className='w-screen h-screen object-contain mx-auto flex items-center justify-center gap-4'>
        <Image src={Poster} width={450} height={450} alt='CINE'/>
         <div className='flex flex-col items-center w-1/2'>
        <p className='text-[50px] text-blue-700 font-semibold'>HOORAY!</p>
        <p>You have successfully registered!</p>
        </div>
        
       
    </div>
  )
}

export default page