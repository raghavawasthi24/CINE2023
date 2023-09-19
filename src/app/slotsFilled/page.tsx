"use client";

import React from "react";
import Poster from "../../../public/CINE.png";
import Image from "next/image";

import Gif from "../../../public/Festivities.gif";

const Page = () => {
  return (
    <div className="w-full flex justify-center items-center md:flex-row flex-col-reverse md:p-6 p-2">
      <div className="md:w-1/2 w-full">
        <Image src={Poster} alt="CINE" />
      </div>
      <div
        className="flex flex-col items-center text-center md:text-[3rem] text-[25px] font-spartan md:w-1/2 md:p-7 w-full h-full"
        style={{ fontFamily: "League Spartan" }}
      >
        <p className="mb-5"></p>
        <p>Oops.. Slots are already filled!</p>
        <Image src={Gif} alt="Gif" />
      </div>
    </div>
  );
};

export default Page;
