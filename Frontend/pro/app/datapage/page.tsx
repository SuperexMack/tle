"use client"

import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { HyperTextDemo } from "../Components/option";
import axios from "axios";
import Link from "next/link";

export default function(){

  interface Contest {
    contest_code: string;
    contest_start_date: string;
    contest_end_date: string;
  }

  interface ContestCodeforces{
    id:Number
    name:string;
    phase:string;
    startTimeSeconds:string;
  }
    const [userData,setUserData] = useState("")
    const [ccData,setCCdata] = useState<Contest[]>([])
    const [ccDataSec,setCCdataSec] = useState<Contest[]>([])
    const [cfData,setCFdata] = useState<ContestCodeforces[]>([])
    const [numvalue,setValue] = useState(0);

   
    
    useEffect(() => {

      // CodeChef Data 
      if (userData === "codechef") {
        console.log("Fetching CodeChef contests...");
        const callerCC = async () => {
          try {
            const response = await axios.get(
              "http://localhost:5000/api/codechef"
            );
            setCCdata(response.data.firstData.contests || []);
            setCCdataSec(response.data.secondData.contests || [])
            setValue(2)
            console.log("Mil gya data")
          } catch (error) {
            console.error("Something went wrong while getting CC data:", error);
          }
        };
        callerCC();
      }

      // CodeForces Data

      if(userData === "codeforeces"){
        console.log("Fetching the CodeForces Contest....")
          const CodeForcesData = async()=>{
          try{
            let response  = await axios.get("http://localhost:5000/api/codeforces")
            setCFdata(response.data.result|| [])
            setValue(4)
            console.log("Mil gya data")
          }
          catch(error){
            console.error("Something went wrong while getting CF data:", error);
          }
        }
        CodeForcesData()
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

           
            
            
           <div className="w-full min-h-screen flex items-center flex-col space-y-4">
            
            {numvalue == 0&&(
              <div className="flex justify-center items-center min-h-screen w-full">
                 <h1 className="text-white font-bold text-[40px]">Select a Platform......</h1>
              </div>
            )}

            {numvalue == 2 && (ccData.length>0 || ccDataSec.length>0)?(
              <>
              {ccData.map((cont,index)=>(
                <div key={index} className="bg-slate-800 w-[60%] rounded-xl hover:bg-blue-700 hover:cursor-pointer p-2 flex flex-col justify-center items-center space-y-4">
                    <p className="text-[20px] text-white font-bold">Duration <span className="text-red-500">Upcoming</span></p>
                    <p className="text-[20px] text-white font-bold">Contest Name : <span className="text-red-500">{cont.contest_code}</span></p>
                    <p className="text-[20px] text-white font-bold">Starts At : <span className="text-red-500">{new Date(cont.contest_start_date).toLocaleString()}</span></p>
                    <p className="text-[20px] text-white font-bold">End At : <span className="text-red-500">{new Date(cont.contest_end_date).toLocaleString()}</span></p>
                    <Link href={`https://www.codechef.com/${cont.contest_code}`}><button className="bg-green-600 p-3 text-white font-bold rounded-xl">Go to Contest</button></Link>
                </div>
              
              ))}

            {ccDataSec.map((cont,index)=>(
              <div key={index} className="bg-slate-800 w-[60%] rounded-xl hover:bg-blue-700 hover:cursor-pointer p-2 flex flex-col justify-center items-center space-y-4">
                    <p className="text-[20px] text-white font-bold">Duration <span className="text-red-500">Past-Contest</span></p>
                    <p className="text-[20px] text-white font-bold">Contest Name : <span className="text-red-500">{cont.contest_code}</span></p>
                    <p className="text-[20px] text-white font-bold">Starts At : <span className="text-red-500">{new Date(cont.contest_start_date).toLocaleString()}</span></p>
                    <p className="text-[20px] text-white font-bold">End At : <span className="text-red-500">{new Date(cont.contest_end_date).toLocaleString()}</span></p>
                    <Link href={`https://www.codechef.com/${cont.contest_code}`}><button className="bg-green-600 p-3 text-white font-bold rounded-xl">Go to Contest</button></Link>
                </div>
            ))} 
             </>
            ):(
              <div>
              {/* <p>No data found</p> */}
              </div>
            )}


             {numvalue == 2 && ccDataSec.length>0?(
              ccDataSec.map((cont,index)=>(
                <div key={index} className="bg-slate-800 w-[60%] rounded-xl hover:bg-blue-700 hover:cursor-pointer p-2 flex flex-col justify-center items-center space-y-4">
                    <p className="text-[20px] text-white font-bold">Contest Name : <span className="text-red-500">{cont.contest_code}</span></p>
                    <p className="text-[20px] text-white font-bold">Starts At : <span className="text-red-500">{new Date(cont.contest_start_date).toLocaleString()}</span></p>
                    <p className="text-[20px] text-white font-bold">End At : <span className="text-red-500">{new Date(cont.contest_end_date).toLocaleString()}</span></p>
                    <Link href={`https://www.codechef.com/${cont.contest_code}`}><button className="bg-green-600 p-3 text-white font-bold rounded-xl">Go to Contest</button></Link>
                </div>
              ))
            ):(
              <div>
              {/* <p>No data found</p> */}
              </div>
            )}
          

           {/* CodeForces Data  */}

           {numvalue == 4 && cfData.length>0?(
              cfData.map((cont,index)=>(
                <div key={index} className="bg-slate-800 w-[60%] rounded-xl hover:bg-blue-700 hover:cursor-pointer p-2 flex flex-col justify-center items-center space-y-4">
                    <p className="text-[20px] text-white font-bold">{cont.name}</p>
                    <p className="text-[20px] text-white font-bold">Contest Duration : <span className="text-red-500">{cont.phase === "BEFORE"?"Upcoming":"Past Contest"}</span></p>
                    <p className="text-[20px] text-white font-bold">StartTime: <span className="text-red-500">{new Date(1000*cont.startTimeSeconds).toLocaleString()}</span></p>
                    <Link href={`https://codeforces.com/contest/${cont.id}`}><button className="bg-green-600 hover:cursor-pointer hover:bg-red-600 p-3 text-white font-bold rounded-xl">Go to Contest</button></Link>
                </div>
              ))
            ):(
              
              <div>
              {/* <p>No data found</p> */}
              </div>
            )}

          </div>
           
        </div>
        </>
    )
}