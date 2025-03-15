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
    startTimeSeconds:number;
    
  }
    const [userData,setUserData] = useState("")
    const [ccData,setCCdata] = useState<Contest[]>([])
    const [ccDataSec,setCCdataSec] = useState<Contest[]>([])
    const [cfData,setCFdata] = useState<ContestCodeforces[]>([])
    const [numvalue,setValue] = useState(0);


    const getTimeLeft = (value:string)=>{
      let valConvertion = parseInt(value)
      let currentTime = Date.now()
      valConvertion = valConvertion*1000;
      let diff = valConvertion - currentTime
      let Days = Math.floor(diff/(1000*24*60*60));
      if(Days<0) return 'Contest Completed'
      let Hours = Math.floor((diff/(1000*60*60))%24);
      let minutes = Math.floor((diff/(1000*60))%60)

      return `${Days} Days , ${Hours} Hours , ${minutes} minutes`
    }

    const findCCDate = (value:string)=>{
      let getValue = new Date(value).getTime()
      console.log("value of getVal " + getValue)
      let currentTime = Date.now()
      let diff = getValue - currentTime
      let Days = Math.floor(diff/(1000*24*60*60));
      if(Days<0) return 'Contest Completed'
      let Hours = Math.floor((diff/(1000*60*60))%24);
      let minutes = Math.floor((diff/(1000*60))%60)

      return `${Days} Days , ${Hours} Hours , ${minutes} minutes`
    }

    
    
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

           
            
            
           <div className="w-full min-h-screen flex  flex-wrap justify-center space-x-3 space-y-3">
            
            {numvalue == 0&&(
              <div className="flex justify-center items-center min-h-screen w-full">
                 <h1 className="text-white font-bold text-[40px]">Select a Platform......</h1>
              </div>
            )}

            {numvalue == 2 && (ccData.length>0 || ccDataSec.length>0)?(
              <>
              {ccData.map((cont,index)=>(
                <div key={index} className="bg-slate-800 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-[30%] m-3 rounded-xl  hover:cursor-pointer p-2 flex flex-col justify-center items-center space-y-4">
                    <p className="text-[20px] text-white font-bold">TimeLine <span className="text-red-500">Upcoming</span></p>
                    <p className="text-[20px] text-white font-bold">Contest Name : <span className="text-red-500">{cont.contest_code}</span></p>
                    <p className="text-[20px] text-white font-bold">Starts At : <span className="text-red-500">{new Date(cont.contest_start_date).toLocaleString()}</span></p>
                    <p className="text-[20px] text-white font-bold">End At : <span className="text-red-500">{new Date(cont.contest_end_date).toLocaleString()}</span></p>
                    <p className="text-[20px] text-white font-bold">Time Left : <span className="text-red-500">{findCCDate(cont.contest_start_date)}</span></p>
                    <Link href={`https://www.codechef.com/${cont.contest_code}`}><button className="bg-green-600 hover:bg-red-600 p-3 text-white font-bold rounded-xl">Go to Contest</button></Link>
                </div>
              
              ))}

            {ccDataSec.map((cont,index)=>(
              <div key={index} className="bg-slate-800 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-[30%] m-3 rounded-xl  hover:cursor-pointer p-2 flex flex-col justify-center items-center space-y-4">
                    <p className="text-[20px] text-white font-bold">TimeLine <span className="text-red-500">Past-Contest</span></p>
                    <p className="text-[20px] text-white font-bold">Contest Name : <span className="text-red-500">{cont.contest_code}</span></p>
                    <p className="text-[20px] text-white font-bold">Starts At : <span className="text-red-500">{new Date(cont.contest_start_date).toLocaleString()}</span></p>
                    <p className="text-[20px] text-white font-bold">End At : <span className="text-red-500">{new Date(cont.contest_end_date).toLocaleString()}</span></p>
                    <p className="text-[20px] text-white font-bold">Time Left : <span className="text-red-500">{findCCDate(cont.contest_start_date)}</span></p>
                    <Link href={`https://www.codechef.com/${cont.contest_code}`}><button className="bg-green-600 hover:bg-red-600 p-3 text-white font-bold rounded-xl">Go to Contest</button></Link>
                </div>
            ))} 
             </>
            ):(
              <div>
              {/* <p>No data found</p> */}
              </div>
            )}



           {/* CodeForces Data  */}

           {numvalue == 4 && cfData.length>0?(
              cfData.map((cont,index)=>(
                <div key={index} className="bg-slate-800 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-[30%] m-3 rounded-xl  hover:cursor-pointer p-2 flex flex-col justify-center items-center space-y-6">
                    <p className="text-center text-[20px] text-white font-bold">{cont.name}</p>
                    <p className="text-center text-[20px] text-white font-bold">Contest Duration : <span className="text-red-500">{cont.phase === "BEFORE"?"Upcoming":"Past Contest"}</span></p>
                    <p className="text-center text-[20px] text-white font-bold">StartTime: <span className="text-red-500">{new Date(1000*cont.startTimeSeconds).toLocaleString()}</span></p>
                    <p className="text-center text-white font-bold">Time Left - <span className="text-red-500">{getTimeLeft(cont.startTimeSeconds.toString())}</span></p>
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