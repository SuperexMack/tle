"use client"

import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { HyperTextDemo } from "../Components/option";
import axios from "axios";

export default function(){
  interface Contest {
    contest_code: string;
    contest_start_date: string;
    contest_end_date: string;
  }
    const [userData,setUserData] = useState("")
    const [ccData,setCCdata] = useState<Contest[]>([])

   
    
    useEffect(() => {
      if (userData === "codechef") {
        console.log("Fetching CodeChef contests...");
        const callerCC = async () => {
          try {
            const response = await axios.get(
              "http://localhost:5000/api/codechef"
            );
            setCCdata(response.data.contests || []);
          } catch (error) {
            console.error("Something went wrong while getting CC data:", error);
          }
        };
        callerCC();
      }
    }, [userData]); 


    return(
        <>

        <Navbar></Navbar>
        <div className="bg-[#0f0e1a] w-full min-h-screen flex flex-col">
           <div className="w-full h-[100px] mt-[100px] flex space-x-6 items-center justify-center">
           <HyperTextDemo></HyperTextDemo>
              <select onChange={(e)=>setUserData(e.target.value)} className="bg-white border-lg rounded-lg p-1">
                <option value="selected">Select option</option>
                <option value="leetcode">LeetCode</option>
                <option value="codeforeces">CodeForces</option>
                <option value="codechef">CodeChef</option>
              </select>
           </div>

           <div>
            {ccData.length>0?(
              ccData.map((cont,index)=>(
                <div key={index}>
                    <p className="text-[20px] text-red-600">{cont.contest_code}</p>
                    <p className="text-[20px] text-red-600">{new Date(cont.contest_start_date).toLocaleString()}</p>
                    <p className="text-[20px] text-red-600">{new Date(cont.contest_end_date).toLocaleString()}</p>
                </div>
              ))
            ):(
              <>
              <p>No data found</p>
              </>
            )}
           </div>
        </div>
        </>
    )
}