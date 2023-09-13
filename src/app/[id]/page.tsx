import React from 'react'
import Poster from "../../../public/CINE.png"
import Image from 'next/image'

const page = () => {
  return (
    <div className='w-screen h-screen object-contain mx-auto flex flex-col items-center justify-center gap-4'>
         <div className='flex flex-col items-center'>
        <p className='text-[50px] text-blue-700 font-semibold'>Congratulations!</p>
        <p>You have successfully registered!</p>
        </div>
        <Image src={Poster} width={400} height={400} alt='CINE'/>
       
    </div>
  )
}

export default page