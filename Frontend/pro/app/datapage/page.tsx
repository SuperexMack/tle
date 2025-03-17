"use client"

import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { HyperTextDemo } from "../Components/option";
import axios from "axios";
import Link from "next/link";
import { Bookmark } from 'lucide-react';

export default function(){

  const [storageAPI , setAPI] = useState("")
  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_YTAPI;
    setAPI(api)
    console.log("The API key is " + api);
  }, []);
  

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


  interface LcInterface{
    title:string;
    startTime:number;
    titleSlug:string
  }
    const [bgvalue,setvalue] = useState(0)
    const [userData,setUserData] = useState("")
    const [ccData,setCCdata] = useState<Contest[]>([])
    const [ccDataSec,setCCdataSec] = useState<Contest[]>([])
    const [cfDataFirst,setCFdataFirst] = useState<ContestCodeforces[]>([])
    const [cfDataSecond,setCFdataSecond] = useState<ContestCodeforces[]>([])
    const [lcContest,setLcContest] = useState<LcInterface[]>([])
    const [numvalue,setValue] = useState(0);

    const [playlistData,setPlaylistData] = useState([])
    const [ccplaylistData,setCCplaylistData] = useState([])
    const [LcplaylistData,setLcplaylistData] = useState([])

    useEffect(()=>{
      const findData = async()=>{
          try{
              let ytdata = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB&key=${storageAPI}`)
              setPlaylistData(ytdata.data.items)
              console.log("yoyo" , playlistData)
          }
          catch(error){
              console.log("Something went wrong while fetching data " + error)
          }
      }
      findData()
      
  },[])

  useEffect(()=>{
    const findData = async()=>{
        try{
            let ytdata = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr&key=${storageAPI}`)
            setCCplaylistData(ytdata.data.items)
            console.log("yoyo" , playlistData)
        }
        catch(error){
            console.log("Something went wrong while fetching data " + error)
        }
    }
    findData()
    
},[])


useEffect(()=>{
  const findData = async()=>{
      try{
          let ytdata = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr&si=2AtlC9r-YCyB9rAd&key=${storageAPI}`)
          setLcplaylistData(ytdata.data.items)
          console.log("yoyo" , playlistData)
      }
      catch(error){
          console.log("Something went wrong while fetching data " + error)
      }
  }
  findData()
  
},[])


interface lcdatatype{
  title:string;
  videoId:string;
}

const [newlcplaylistData,setnewlcplaylistdata] = useState<lcdatatype[]>([])
useEffect(() => {
  setnewlcplaylistdata(prevState => [
    ...prevState,  // Purana data retain karo
    ...LcplaylistData.map(value=>({
      title: value.snippet.title,
      videoId: value.snippet.resourceId.videoId
    }))
  ]);
}, [LcplaylistData]);


// Magic with CF 

const [newCCplaylistData,setnewCCplaylistData] = useState<lcdatatype[]>([])

useEffect(()=>{
  setnewCCplaylistData(prev=>[
    ...prev,
    ...ccplaylistData.map(value=>({
      title: value.snippet.title,
      videoId: value.snippet.resourceId.videoId
    }))
  ])
},[ccplaylistData])



const [newCFplaylistData,setnewCFplaylistData] = useState<lcdatatype[]>([])

useEffect(()=>{
  setnewCFplaylistData(prev=>[
    ...prev,
    ...playlistData.map(value=>({
      title: value.snippet.title,
      videoId: value.snippet.resourceId.videoId
    }))
  ])
},[playlistData])

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

    

    // LC Contest

    // useEffect(()=>{
    //   const lcCaller = async()=>{
    //     try{
    //       let response = await axios.get("http://localhost:5000/lcData")
    //       setLcContest(response.data.lcdata)
    //       setValue(6)
    //     }
    //     catch(error){
    //       console.log("lc Error " + error)
    //     }
    //   }
    //   lcCaller()
    // },[])


    
    
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
            setCFdataFirst(response.data.DoneContest)
            setCFdataSecond(response.data.ComingContest)
            setValue(4)
            console.log("Mil gya data")
          }
          catch(error){
            console.error("Something went wrong while getting CF data:", error);
          }
        }
        CodeForcesData()
      }


      if(userData === "leetcode"){
        const lcCaller = async()=>{
          try{
            let response = await axios.get("http://localhost:5000/lcData")
            setLcContest(response.data.lcdata)
            setValue(6)
          }
          catch(error){
            console.log("lc Error " + error)
          }
        }
        lcCaller()
      }



      
    }, [userData]); 


    // Now here we are gonna write Bookmark code

    
    const onClickBookMark = (value: object) => {
      let alreadyStoredValue = localStorage.getItem("getbookmarkedData");
      let jsondata = alreadyStoredValue ? JSON.parse(alreadyStoredValue) : [];
      localStorage.setItem("getbookmarkedData", JSON.stringify([...jsondata, value]));
      alert("BookMark Added")
    };


    return(
        <>

        <Navbar bgvalue={bgvalue} setvalue={setvalue}></Navbar>
        <div className={`${bgvalue%2==0 ? "bg-[#0f0e1a]" : "bg-white"} w-full min-h-screen flex flex-col`}>
           <div className="w-full h-[100px] mt-[100px] flex space-x-6 items-center justify-center">
           <HyperTextDemo></HyperTextDemo>
           {/* <h1 className="text-[30px] text-purple-500">Select a platform</h1> */}
              <select onChange={(e)=>setUserData(e.target.value)} className={`${bgvalue%2==0 ? "bg-[white]" : "bg-slate-200 border-2 border-black"} border-lg rounded-lg p-1`}>
                <option value="selected">Select option</option>
                <option value="leetcode">LeetCode</option>
                <option value="codeforeces">CodeForces</option>
                <option value="codechef">CodeChef</option>
              </select>
           </div>

           
            
            
           <div className="w-full min-h-screen flex  flex-wrap justify-center space-x-3 space-y-3">
            
            {numvalue == 0&&(
              <div className="flex justify-center items-center min-h-screen w-full">
                 <h1 className={`${bgvalue%2==0 ? "text-white" : "text-black"} font-bold text-[40px]`}>Select a Platform......</h1>
              </div>
            )}

            {numvalue == 2 && (ccData.length>0 || ccDataSec.length>0)?(
              <>
              {ccData.map((cont,index)=>(
               <div 
               key={index} 
               className="bg-gradient-to-br from-slate-800 to-slate-900 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-full max-w-sm m-3 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500"
             >
               <div className="p-6 flex flex-col gap-4">
                 {/* Header with Timeline */}
                 <div className="flex justify-center items-center gap-2 mb-1">
                   <h3 className="text-lg font-bold text-white">TimeLine</h3>
                   <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900 text-green-200">
                     Upcoming
                   </span>
                 </div>
                 
                 {/* Contest Name */}
                 <div className="text-center">
                   <p className="text-sm text-slate-300 mb-1">Contest Name:</p>
                   <p className="text-red-400 font-bold text-lg">{cont.contest_code}</p>
                 </div>
                 
                 {/* Time Details */}
                 <div className="bg-slate-700 rounded-lg p-3 space-y-2">
                   <div>
                     <p className="text-sm text-slate-300">Starts At:</p>
                     <p className="text-white font-medium">{new Date(cont.contest_start_date).toLocaleString()}</p>
                   </div>
                   
                   <div>
                     <p className="text-sm text-slate-300">Ends At:</p>
                     <p className="text-white font-medium">{new Date(cont.contest_end_date).toLocaleString()}</p>
                   </div>
                   
                   <div>
                     <p className="text-sm text-slate-300">Time Left:</p>
                     <p className="text-red-400 font-bold">{findCCDate(cont.contest_start_date)}</p>
                   </div>
                 </div>
                 
                 {/* Actions */}
                 <div className="flex justify-center items-center gap-4 mt-2">
                   <Link href={`https://www.codechef.com/${cont.contest_code}`}>
                     <button className="bg-green-600 hover:bg-green-700 px-4 py-2 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                       <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                       </svg>
                       Go to Contest
                     </button>
                   </Link>
                   
                   <button 
                     onClick={() => onClickBookMark(cont)} 
                     className="p-2 text-blue-400 hover:text-blue-300 transition-colors bg-slate-700 hover:bg-slate-600 rounded-lg"
                   >
                     <Bookmark className="h-5 w-5" />
                   </button>
                 </div>
               </div>
             </div>
              ))}

            {ccDataSec.map((cont,index)=>{
              let checkContestName = cont.contest_code.match(/\d+/)?.[0];
              let setnewVideo = "";

            for(let check of newCCplaylistData){
              if(checkContestName && check.title.includes(checkContestName)){
                setnewVideo = check.videoId
              }
            }
               return( 
                <div 
                key={index} 
                className="bg-gradient-to-br from-slate-800 to-slate-900 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-full max-w-sm m-3 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500"
              >
                <div className="p-6 flex flex-col gap-4">
                  {/* Header with Timeline */}
                  <div className="flex justify-center items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-white">TimeLine</h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-200">
                      Past-Contest
                    </span>
                  </div>
                  
                  {/* Contest Name */}
                  <div className="text-center">
                    <p className="text-sm text-slate-300 mb-1">Contest Name:</p>
                    <p className="text-red-400 font-bold text-lg">{cont.contest_code}</p>
                  </div>
                  
                  {/* Time Details */}
                  <div className="bg-slate-700 rounded-lg p-3 space-y-2">
                    <div>
                      <p className="text-sm text-slate-300">Starts At:</p>
                      <p className="text-white font-medium">{new Date(cont.contest_start_date).toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-300">Ends At:</p>
                      <p className="text-white font-medium">{new Date(cont.contest_end_date).toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-slate-300">Time Left:</p>
                      <p className="text-red-400 font-bold">{findCCDate(cont.contest_start_date)}</p>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-wrap justify-center items-center gap-3 mt-2">
                    <Link href={`https://www.codechef.com/${cont.contest_code}`}>
                      <button className="bg-green-600 hover:bg-green-700 px-4 py-2 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Go to Contest
                      </button>
                    </Link>
                    
                    {setnewVideo.length > 1 ? (
                      <>
                        <Link href={`https://www.youtube.com/watch?v=${setnewVideo}`}>
                          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Check out Video
                          </button>
                        </Link>
                        
                        <button 
                          onClick={() => onClickBookMark(cont)} 
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors bg-slate-700 hover:bg-slate-600 rounded-lg"
                        >
                          <Bookmark className="h-5 w-5" />
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
               )
          })} 
             </>
            ):(
              <div>
              {/* <p>No data found</p> */}
              </div>
            )}



           {/* CodeForces Data  */}

           {numvalue == 4 && (cfDataFirst.length>0 || cfDataSecond.length>0)?(
              <>

            {cfDataSecond.map((cont,index)=>(
             <div 
             key={index} 
             className="bg-gradient-to-br from-slate-800 to-slate-900 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-full max-w-sm m-3 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500"
           >
             <div className="p-6 flex flex-col gap-4">
               {/* Header */}
               <h3 className="text-xl font-bold text-white text-center truncate">{cont.name}</h3>
               
               {/* Status Badge */}
               <div className="flex justify-center">
                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${cont.phase === "BEFORE" ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"}`}>
                   {cont.phase === "BEFORE" ? "Upcoming" : "Past Contest"}
                 </span>
               </div>
               
               {/* Time Details */}
               <div className="text-center">
                 <p className="text-sm text-slate-300 mb-1">Start Time:</p>
                 <p className="text-white font-medium">{new Date(1000*cont.startTimeSeconds).toLocaleString()}</p>
               </div>
               
               {/* Time Left */}
               <div className="text-center bg-slate-700 rounded-lg p-3">
                 <p className="text-sm text-slate-300 mb-1">Time Left:</p>
                 <p className="text-red-400 font-bold">{getTimeLeft(cont.startTimeSeconds.toString())}</p>
               </div>
               
               {/* Actions */}
               <div className="flex justify-center items-center gap-4 mt-2">
                 <Link href={`https://codeforces.com/contest/${cont.id}`}>
                   <button className="bg-green-600 hover:bg-green-700 px-4 py-2 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                     </svg>
                     Go to Contest
                   </button>
                 </Link>
                 
                 <button 
                   onClick={() => onClickBookMark(cont)} 
                   className="p-2 text-blue-400 hover:text-blue-300 transition-colors bg-slate-700 hover:bg-slate-600 rounded-lg"
                 >
                   <Bookmark className="h-5 w-5" />
                 </button>
               </div>
             </div>
           </div>
            ))} 

              {cfDataFirst.map((cont,index)=>{
                let checkContestName = cont.name.match(/\d+/)?.[0];
                let setnewVideo = "";

              for(let check of newCFplaylistData){
                if(checkContestName && check.title.includes(checkContestName)){
                  setnewVideo = check.videoId
                }
              }

                return(
                  <>
                  <div 
  key={index} 
  className="bg-gradient-to-br from-slate-800 to-slate-900 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-full max-w-sm m-3 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500"
>
  <div className="p-6 flex flex-col gap-4">
    {/* Header */}
    <h3 className="text-xl font-bold text-white text-center truncate">{cont.name}</h3>
    
    
    <div className="flex justify-center">
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${cont.phase === "BEFORE" ? "bg-green-900 text-green-200" : "bg-red-900 text-red-200"}`}>
        {cont.phase === "BEFORE" ? "Upcoming" : "Past Contest"}
      </span>
    </div>
    
   
    <div className="text-center">
      <p className="text-sm text-slate-300 mb-1">Start Time:</p>
      <p className="text-white font-medium">{new Date(1000*cont.startTimeSeconds).toLocaleString()}</p>
    </div>
    
    {/* Time Left */}
    <div className="text-center bg-slate-700 rounded-lg p-3">
      <p className="text-sm text-slate-300 mb-1">Time Left:</p>
      <p className="text-red-400 font-bold">{getTimeLeft(cont.startTimeSeconds.toString())}</p>
    </div>
    
    
    <div className="flex flex-wrap justify-center items-center gap-3 mt-2">
      <Link href={`https://codeforces.com/contest/${cont.id}`}>
        <button className="bg-green-600 hover:bg-green-700 px-4 py-2 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Go to Contest
        </button>
      </Link>
      
      {setnewVideo.length > 1 ? (
        <>
          <Link href={`https://www.youtube.com/watch?v=${setnewVideo}`}>
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Check out Video
            </button>
          </Link>
          
          <button 
            onClick={() => onClickBookMark(cont)} 
            className="p-2 text-blue-400 hover:text-blue-300 transition-colors bg-slate-700 hover:bg-slate-600 rounded-lg"
          >
            <Bookmark className="h-5 w-5" />
          </button>
        </>
      ) : null}
    </div>
  </div>
</div>
                  </>
                )
                
               })}

             </>
            ):(
              <div>
              {/* <p>No data found</p> */}
              </div>
            )}


           {numvalue == 6 &&  lcContest.length>0?(
              <>

            {lcContest.map((cont,index)=>{
              let checkContestName = cont.title.match(/\d+/)?.[0];

              let setnewVideo = "";

              for(let check of newlcplaylistData){
                if(checkContestName && check.title.includes(checkContestName)){
                  setnewVideo = check.videoId
                }
              }
              
              return(
                <div 
                key={index} 
                className="bg-gradient-to-br from-slate-800 to-slate-900 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-full max-w-sm m-3 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500"
              >
                <div className="p-6 flex flex-col gap-4">
                  {/* Header */}
                  <h3 className="text-xl font-bold text-white truncate">{cont.title}</h3>
                  
                  {/* Status Badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-900 text-red-200">
                      Finished
                    </span>
                    <span className="text-slate-400 text-sm">
                      {new Date(1000*cont.startTime).toLocaleDateString()}
                    </span>
                  </div>
                  
                  {/* Time Details */}
                  <div className="text-sm text-slate-300">
                    <p>Started: {new Date(1000*cont.startTime).toLocaleString()}</p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-2">
                    <Link href={`https://leetcode.com/contest/${cont.titleSlug}`}>
                      <button className="bg-green-600 hover:bg-green-700 px-4 py-2 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        Contest
                      </button>
                    </Link>
                    
                    {setnewVideo.length > 1 ? (
                      <>
                        <Link href={`https://www.youtube.com/watch?v=${setnewVideo}`}>
                          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white font-medium rounded-lg transition-colors flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Video
                          </button>
                        </Link>
                        
                        <button 
                          onClick={() => onClickBookMark(cont)} 
                          className="p-2 text-blue-400 hover:text-blue-300 transition-colors bg-slate-700 hover:bg-slate-600 rounded-lg"
                        >
                          <Bookmark className="h-5 w-5" />
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              )
            })} 

             </>
            ):(
              <div>
              
              </div>
            )}

          </div>
           
        </div>
        </>
    )
}