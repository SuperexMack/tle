"use client"
import { SunMoon } from 'lucide-react';
import { useState } from 'react';


export function Navbar({bgvalue,setvalue}){
    const click = ()=>{
       setvalue(()=>bgvalue+1)
    }
    return(
        <>
        <div className="bg-white/10 backdrop-blur-lg z-50  w-full h-[70px] flex items-center border-b-slate-300 fixed top-0">

            {/* Name tag */}
           <div className="absolute left-[20%]">
            <h1 className={`${bgvalue%2==0 ? "text-white" : "text-black"} font-bold text-[30px] `}>TLE-Ele-App</h1>
           </div>

           {/* Go Tag */}
           
           <div className="absolute right-[10%] flex items-center justify-center  space-x-7">
              <div className="flex items-center justify-center bg-purple-600 hover:bg-purple-500 rounded-xl w-[200px]">
              <h1 className="p-2 font-bold text-white text-[20px] hover:cursor-pointer">Explore</h1>
              </div>

              <div className="flex items-center justify-center ">
              <SunMoon onClick={click} className={`${bgvalue%2==0 ? "text-white" : "text-black"} w-[50px] h-[50px]`}></SunMoon>
              </div>
           </div>
          

        </div>
        </>
    )
}