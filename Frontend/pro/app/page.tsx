import Image from "next/image";
import { Navbar } from "./Components/Navbar";
import myimg from "./Components/mytle.jpg"
import { HeroVideoDialogDemo } from "./Components/Video";
import { TextAnimateDemo8 } from "./Components/Heading";
import { SparklesTextDemo } from "./Components/sparkle";

export default function Home() {
  return(
    <>
    <Navbar></Navbar>
    <div className="w-full min-h-screen flex flex-col bg-[#0f0e1a]">

      <div className="w-full h-auto p-3 mt-[120px] flex flex-col">
          {/* first Box */}
          <div className="w-full h-full flex flex-col justify-center items-center space-y-2 mt-14 p-4">
            <div className="w-[50%]">
            <h1 className="font-bold text-[60px] text-center"><TextAnimateDemo8></TextAnimateDemo8></h1>
            </div>
            <div className="w-[50%]">
                <SparklesTextDemo></SparklesTextDemo>
            </div>

            <div className="w-[70%] flex justify-center items-center space-x-12 mt-8">
             <button className="font-medium text-[20px] text-white bg-purple-600 rounded-lg p-3 w-[200px]">Explore</button>
             <button className="font-medium text-[20px] bg-green-500 text-white rounded-lg p-3">Explore Our Community</button>
            </div>

          </div>

          <div className="w-full  flex items-center justify-center mt-5 h-auto p-6">
            <div className="w-[50%] h-[60%] rounded-lg">
            <HeroVideoDialogDemo></HeroVideoDialogDemo>
            </div>
          </div>

      </div>

    </div>
    </>
  )
}
