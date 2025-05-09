"use client"

import Image from "next/image";
import { Navbar } from "./Components/Navbar";
import myimg from "./Components/mytle.jpg"
import { HeroVideoDialogDemo } from "./Components/Video";
import { DotPatternDemo } from "./Components/radical";
import { useState } from "react";
import { SpotlightPreview } from "./Components/Light";

export default function Home() {
  const [bgvalue,setvalue] = useState(0)
  return(
    <>
    <Navbar  bgvalue={bgvalue} setvalue={setvalue}></Navbar>
    <div className={`${bgvalue%2==0 ? "bg-black" : "bg-white"} w-full min-h-screen flex flex-col space-y-6`}>

      <div className="w-full h-auto p-3 mt-[80px] flex flex-col">
          {/* first Box */}
          <div>
         <SpotlightPreview></SpotlightPreview>
         
          </div>

         

      </div>

    </div>
    </>
  )
}
