"use client"

import { useEffect, useState } from "react";
import { Navbar } from "../Components/Navbar";
import { HyperTextDemo } from "../Components/option";
import axios from "axios";
export default function(){
    const [userdata,setUserData] = useState("")
    const [playlistData,setPlaylistData] = useState([])
    const [fa, setFa] = useState("PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr");
    
    
    useEffect(() => {
        if (userdata === "leetcode") {
            setFa("PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr");
        } else if (userdata === "codeforces") {
            console.log("cf checked");
            setFa("PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB");
        } else if (userdata === "codechef") {
            setFa("PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr");
        }
    }, [userdata]);

    const [storageAPI , setAPI] = useState("")
  useEffect(() => {
    const api = process.env.NEXT_PUBLIC_YTAPI;
    setAPI(api)
    console.log("The API key is " + api);
  }, []);
    


    useEffect(()=>{
        const findData = async()=>{
            try{
                let ytdata = await axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${fa}&key=${storageAPI}`)
                console.log(ytdata)
                setPlaylistData(ytdata.data.items)
                console.log("yoyo" , playlistData)
            }
            catch(error){
                console.log("Something went wrong while fetching data " + error)
            }
        }
        findData()
        
    },[fa])

    return(
        <>
        <Navbar></Navbar>
        <div className="bg-[#0f0e1a] w-full min-h-screen flex flex-col">


        <div className="w-full h-[100px] mt-[100px] flex space-x-6 items-center justify-center">
           <HyperTextDemo></HyperTextDemo>
              <select onChange={(e)=>setUserData(e.target.value)} className="bg-white border-lg rounded-lg p-1">
                <option value="selected">Select option</option>
                <option value="leetcode">LeetCode</option>
                <option value="codeforces">CodeForces</option>
                <option value="codechef">CodeChef</option>
              </select>
           </div>

           {/* Videos platform */}

           <div className="w-full min-h-screen p-3 flex flex-wrap justify-center space-y-5">
              {playlistData.length > 0 ?(
                 playlistData.map((video,index)=>
                    <div key={index} className="w-[25%] h-auto p-3  m-10 space-y-5">
                    <a href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}>
                    
                    <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="w-full rounded-lg  h-full bg-green-600"
                    />
                    <div className="p-2 text-white">
                    <p className="text-center">{index+1} . {video.snippet.title}</p>
                    </div>
                   
                    </a>
                    </div>
                
              )):(
                <div>
                    <h1>Get Data</h1>
                 </div>
              )}

            
           </div>

        </div>
        </>
    )
}