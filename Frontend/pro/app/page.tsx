import Image from "next/image";
import { Navbar } from "./Components/Navbar";
import myimg from "./Components/mytle.jpg"
import { HeroVideoDialogDemo } from "./Components/Video";
import { DotPatternDemo } from "./Components/radical";

export default function Home() {
  return(
    <>
    <Navbar></Navbar>
    <div className="w-full min-h-screen flex flex-col bg-[#0f0e1a]">

      <div className="w-full h-auto p-3 mt-[120px] flex flex-col">
          {/* first Box */}
          <div>
          <DotPatternDemo></DotPatternDemo>
          </div>

          <div className="w-full  flex items-center justify-center mt-5 h-auto p-6">
            <div className="w-[60%] h-[50%] rounded-lg">
            <HeroVideoDialogDemo></HeroVideoDialogDemo>
            </div>
          </div>

      </div>

    </div>
    </>
  )
}
