"use client"
import {SunMoon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';


export function Navbar({bgvalue,setvalue}:any){
    const click = ()=>{
       setvalue(()=>bgvalue)
    }
    return(
        <>
        <div className="bg-white/10 backdrop-blur-lg z-50  w-full h-[70px] flex items-center border-b-slate-300 fixed top-0">

            {/* Name tag */}
           <div className="absolute md:left-[20%] left-[10%]">
            <Link href={"/"} className={`${bgvalue%2==0 ? "text-white" : "text-black"} font-bold md:text-[30px] text-[18px]`}>TLE-Ele-App</Link>
           </div>

           {/* Go Tag */}
           
           <div className="absolute md:right-[10%] right-[5%] flex items-center justify-center md:space-x-5 space-x-3">
              <div className="flex items-center justify-center hover:text-slate-400 rounded-xl ">
              <Link href={"/datapage"}><h1 className="p-2 font-bold text-white md:text-[20px] text-[16px] hover:cursor-pointer">Explore</h1></Link>
              </div>

              <div className="flex items-center justify-center hover:text-slate-400 rounded-xl">
              <Link href={"/bookmark"}><h1 className="p-2 font-bold text-white md:text-[20px] text-[16px] hover:cursor-pointer">BookMarks</h1></Link>
              </div>

              {/* <div className="flex items-center justify-center ">
              <SunMoon onClick={click} className={`${bgvalue%2==0 ? "text-white" : "text-black"} w-[50px] h-[50px]`}></SunMoon>
              </div> */}
           </div>
          

        </div>
        </>
    )
}