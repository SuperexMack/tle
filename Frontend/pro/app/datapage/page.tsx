"use client"

import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { HyperTextDemo } from "../Components/option";
import axios from "axios";
import Link from "next/link";
import { Bookmark } from 'lucide-react';

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


  interface LcInterface{
    title:string;
    startTime:number
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
              let ytdata = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB&key=AIzaSyDM-ijJJgH9nirFb2hNGUYOpUm5XCgS4oo`)
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
            let ytdata = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr&key=AIzaSyDM-ijJJgH9nirFb2hNGUYOpUm5XCgS4oo`)
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
          let ytdata = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr&si=2AtlC9r-YCyB9rAd&key=AIzaSyDM-ijJJgH9nirFb2hNGUYOpUm5XCgS4oo`)
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
                <div key={index} className="bg-slate-800 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-[30%] m-3 rounded-xl  hover:cursor-pointer p-2 flex flex-col justify-center items-center space-y-4">
                    <p className="text-[20px] text-white font-bold">TimeLine <span className="text-red-500">Upcoming</span></p>
                    <p className="text-[20px] text-white font-bold">Contest Name : <span className="text-red-500">{cont.contest_code}</span></p>
                    <p className="text-[20px] text-white font-bold">Starts At : <span className="text-red-500">{new Date(cont.contest_start_date).toLocaleString()}</span></p>
                    <p className="text-[20px] text-white font-bold">End At : <span className="text-red-500">{new Date(cont.contest_end_date).toLocaleString()}</span></p>
                    <p className="text-[20px] text-white font-bold">Time Left : <span className="text-red-500">{findCCDate(cont.contest_start_date)}</span></p>
                    <Link href={`https://www.codechef.com/${cont.contest_code}`}><button className="bg-green-600 hover:bg-red-600 p-3 text-white font-bold rounded-xl">Go to Contest</button></Link>
                    <Bookmark onClick={()=>onClickBookMark(cont)} className="text-blue-600 hover:text-red-500"></Bookmark>
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
              <div key={index} className="bg-slate-800 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-[30%] m-3 rounded-xl  hover:cursor-pointer p-2 flex flex-col justify-center items-center space-y-4">
                    <p className="text-[20px] text-white font-bold">TimeLine <span className="text-red-500">Past-Contest</span></p>
                    <p className="text-[20px] text-white font-bold">Contest Name : <span className="text-red-500">{cont.contest_code}</span></p>
                    <p className="text-[20px] text-white font-bold">Starts At : <span className="text-red-500">{new Date(cont.contest_start_date).toLocaleString()}</span></p>
                    <p className="text-[20px] text-white font-bold">End At : <span className="text-red-500">{new Date(cont.contest_end_date).toLocaleString()}</span></p>
                    <p className="text-[20px] text-white font-bold">Time Left : <span className="text-red-500">{findCCDate(cont.contest_start_date)}</span></p>
                    <div className="flex justify-center items-center space-x-6 w-full">
                    <Link href={`https://codeforces.com/contest/${cont.id}`}><button className="bg-green-600 hover:cursor-pointer hover:bg-red-600 p-3 text-white font-bold rounded-xl">Go to Contest</button></Link>
                   
                    {setnewVideo.length>1?(
                      <>
                    <Link href={`https://www.youtube.com/watch?v=${setnewVideo}`}><button className="bg-green-600 hover:cursor-pointer hover:bg-red-600 p-3 text-white font-bold rounded-xl">Check out Video</button></Link>
                    <Bookmark onClick={()=>onClickBookMark(cont)} className="text-blue-600 hover:text-red-500"></Bookmark>
                    </>
                    ):(
                      <>
                      </>
                    )}
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
              <div key={index} className="bg-slate-800 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-[30%] m-3 rounded-xl  hover:cursor-pointer p-2 flex flex-col justify-center items-center space-y-4">
                   <p className="text-center text-[20px] text-white font-bold">{cont.name}</p>
                    <p className="text-center text-[20px] text-white font-bold">Contest Duration : <span className="text-red-500">{cont.phase === "BEFORE"?"Upcoming":"Past Contest"}</span></p>
                    <p className="text-center text-[20px] text-white font-bold">StartTime: <span className="text-red-500">{new Date(1000*cont.startTimeSeconds).toLocaleString()}</span></p>
                    <p className="text-center text-white font-bold">Time Left - <span className="text-red-500">{getTimeLeft(cont.startTimeSeconds.toString())}</span></p>
                    <div className="flex justify-center items-center space-x-6 w-full">
                    <Link href={`https://codeforces.com/contest/${cont.id}`}><button className="bg-green-600 hover:cursor-pointer hover:bg-red-600 p-3 text-white font-bold rounded-xl">Go to Contest</button></Link>
                    <Bookmark onClick={()=>onClickBookMark(cont)} className="text-blue-600 hover:text-red-500"></Bookmark>
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
                  <div className="bg-slate-800 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-[30%] m-3 rounded-xl  hover:cursor-pointer p-2 flex flex-col justify-center items-center space-y-4">
                   <p className="text-center text-[20px] text-white font-bold">{cont.name}</p>
                    <p className="text-center text-[20px] text-white font-bold">Contest Duration : <span className="text-red-500">{cont.phase === "BEFORE"?"Upcoming":"Past Contest"}</span></p>
                    <p className="text-center text-[20px] text-white font-bold">StartTime: <span className="text-red-500">{new Date(1000*cont.startTimeSeconds).toLocaleString()}</span></p>
                    <p className="text-center text-white font-bold">Time Left - <span className="text-red-500">{getTimeLeft(cont.startTimeSeconds.toString())}</span></p>
                    <div className="flex justify-center items-center space-x-6 w-full">
                    <Link href={`https://codeforces.com/contest/${cont.id}`}><button className="bg-green-600 hover:cursor-pointer hover:bg-red-600 p-3 text-white font-bold rounded-xl">Go to Contest</button></Link>
                   
                    {setnewVideo.length>1?(
                      <>
                    <Link href={`https://www.youtube.com/watch?v=${setnewVideo}`}><button className="bg-green-600 hover:cursor-pointer hover:bg-red-600 p-3 text-white font-bold rounded-xl">Check out Video</button></Link>
                    <Bookmark onClick={()=>onClickBookMark(cont)} className="text-blue-600 hover:text-red-500"></Bookmark>
                    </>
                    ):(
                      <>
                      </>
                    )}
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
              <div key={index} className="bg-slate-800 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 w-[30%] m-3 rounded-xl  hover:cursor-pointer p-2 flex flex-col justify-center items-center space-y-4">
                   <p className="text-center text-[20px] text-white font-bold">{cont.title}</p>
                    <p className="text-center text-[20px] text-white font-bold">Contest Duration : <span className="text-red-500">Finished</span></p>
                    <p className="text-center text-[20px] text-white font-bold">StartTime: <span className="text-red-500">{new Date(1000*cont.startTime).toLocaleString()}</span></p>
                    <div className="flex justify-center items-center space-x-6 w-full">
                    <div className="flex justify-center items-center space-x-6 w-full">
                    <Link href={`https://codeforces.com/contest/${cont.id}`}><button className="bg-green-600 hover:cursor-pointer hover:bg-red-600 p-3 text-white font-bold rounded-xl">Go to Contest</button></Link>
                    {setnewVideo.length>1?(
                      <>
                    <Link href={`https://www.youtube.com/watch?v=${setnewVideo}`}><button className="bg-green-600 hover:cursor-pointer hover:bg-red-600 p-3 text-white font-bold rounded-xl">Check out Video</button></Link>
                    <Bookmark onClick={()=>onClickBookMark(cont)} className="text-blue-600 hover:text-red-500"></Bookmark>
                    </>
                    ):(
                    <>
                    </>
                    )}
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