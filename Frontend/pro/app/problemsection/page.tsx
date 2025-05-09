"use client"

import { useState } from "react";
import { Navbar } from "../Components/Navbar";

export default function(){
    const [bgvalue,setvalue] = useState(0)
    return(
        <>
        <Navbar bgvalue={bgvalue} setvalue={setvalue}></Navbar>
        <div className={`${bgvalue%2==0 ? "bg-[#0f0e1a]" : "bg-white"} w-full min-h-screen flex flex-col`}>
          <div className="bg-red-600 w-full min-h-screen mt-[150px] flex flex-col items-center">
           <div className="bg-pink-600 w-full h-[600px] flex flex-col">
               <h1 className="text-center font-bold text-[40px]">Rules/Regulations</h1>
               <div className="bg-amber-600 w-full p-6 flex flex-col space-y-3 items-center">
                <div className="bg-blue-800 p-3 w-[70%] h-full flex items-center flex-col space-y-2">


                    <h1 className="font-medium text-[30px]">What to Ask ?</h1>
                    <div className="p-3 bg-green-500 w-[80%]">

                    <p className="text-white font-medium text-[20px]">
                        <span className="bg-red-700 rounded-full p-3">1.</span> Whenever you get stuck in any of the CP problem just come
                        to this page and write your doubt in the below input box and 
                        just post it your doubt will get add in the problem list and 
                        then the community people will try their bes to 
                        solve that problem/confusion
                    </p>
                    </div>

                    <div className="p-3 bg-green-500 w-[80%]">
                    <p className="text-white font-medium text-[20px]">
                    <span className="bg-red-700 rounded-full p-3"> 2.</span> What ever you will ask will be cross verified by the AI and 
                        Our AI model will check it and if the problem is geninue then
                        only it will get post to the community otherwise no doubt will be 
                        pushed to the community list so try to ask real doubts not something 
                        useless.
                    </p>
                    </div>

                    <div className="p-3 bg-green-500 w-[80%]">
                    <p className="text-white font-medium text-[20px]">
                        <span className="bg-red-700 rounded-full p-3">3.</span> The process of solving doubts will go like this - you will submit
                        a doubt, it will get post to the community with your email and 
                        then if any of the community member wanna solve it then they
                        will <strong className="text-red-600">mail you</strong>  and hence 
                        then you both will have <strong className="text-red-600"></strong>one to one doubt discussion.
                    </p>
                    </div>

                   <div className="p-3 bg-green-500 w-[80%]">
                   <p className="text-white font-medium text-[20px]">
                        <span className="bg-red-700 rounded-full p-3">4.</span> The benifit of solving the doubt will be that the solver will 
                        get a valid reputation in the community and the more a person
                        solves a doubt the more up he will move in the Leadership 
                        board
                    </p>
                   </div>
                    
                   
                </div>
               </div>
           </div>
          </div>
        </div>
        </>
    )
}