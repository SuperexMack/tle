"use client"
import { useEffect, useState } from "react"
import { Navbar } from "../Components/Navbar"
import { Bookmark } from "lucide-react"

export default function(){
    const [bgvalue,setvalue] = useState(0)
    const [allBookMarkedData , setAllBookmarkedData] = useState<any[]>([]);
    

    interface lcint{
        title:string;
        startTime:number
    }

    interface cfint{
        name:string;
        startTimeSeconds:number;
        phase:string;
    }
    
    interface ccint{
        contest_code:string;
        contest_end_date:string;
        phase:string;
        startTimeSeconds:number;
    }

    const [lcData,setLcData] = useState<lcint[]>([])
    const [cfData,setcfData] = useState<cfint[]>([])
    const [ccData,setCCData] = useState<ccint[]>([])


    useEffect(()=>{
        let bookmarkedData = localStorage.getItem("getbookmarkedData")
        let newData = bookmarkedData? JSON.parse(bookmarkedData):[]
        setAllBookmarkedData(newData)
    },[])

    // Getting And setting data

    useEffect(()=>{
       
        let lcData:lcint[] = []
        let cfData:cfint[] = []
        let ccData:ccint[] = []

        allBookMarkedData.forEach((value)=>{
            if ("title" in value && "startTime" in value) {
                lcData.push(value as lcint); 
            }
            if ("name" in value && "startTimeSeconds" in value) {
                cfData.push(value as cfint); 
            }
            if ("contest_code" in value && "contest_end_date" in value) {
                ccData.push(value as ccint)
            }
        })
        setLcData(lcData)
        setcfData(cfData)
        setCCData(ccData)
    },[allBookMarkedData])




    return(
        <>
        <Navbar bgvalue={bgvalue} setvalue={setvalue}></Navbar>
        <div className={`${bgvalue%2==0 ? "bg-gradient-to-b from-[#0f0e1a] to-[#1a1930]" : "bg-gradient-to-b from-white to-gray-100"} w-full min-h-screen flex flex-col`}>
            <div className="flex w-full p-4 justify-center items-center mt-24 space-x-3">
                <Bookmark className="text-pink-600 w-8 h-8 animate-pulse"></Bookmark>
                <h1 className="text-center font-bold text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">Bookmarked Contests</h1>
            </div>
            
            <div className="w-full px-4 py-8 mt-8 flex flex-col items-center">
                {(lcData.length === 0 && cfData.length === 0 && ccData.length === 0) && (
                    <div className="text-center p-8 bg-gray-800 bg-opacity-50 rounded-xl w-full max-w-2xl">
                        <p className="text-gray-300 text-xl">No bookmarked contests yet!</p>
                        <p className="text-gray-400 mt-2">Bookmark your favorite contests to see them here.</p>
                    </div>
                )}
                
                {lcData.length > 0 && (
                    <div className="w-full mb-8">
                        <h2 className="text-2xl font-bold mb-4 pl-2 border-l-4 border-green-500  text-purple-600">LeetCode Contests</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                         {lcData.map((cont, index) => (
                        <div key={index} className="bg-gray-800 hover:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 cursor-pointer">
                        <div className="bg-gradient-to-r from-green-600 to-green-800 p-2">
                             <p className="text-center text-white font-bold truncate">{cont.title}</p>
                        </div>
                           <div className="p-4">
                              <p className="text-white mb-2">
<span className="text-gray-400">Status: </span>
                            <span className="font-medium text-red-400">Finished</span>
                            </p>
                        <p className="text-white text-sm"> <span className="text-gray-400">Started: </span> <span className="font-medium text-blue-400">{new Date(1000*cont.startTime).toLocaleString()}</span>
                          </p>
                    </div>
                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {cfData.length > 0 && (
                    <div className="w-full mb-8">
                <h2 className="text-2xl font-bold mb-4 pl-2 border-l-4 border-blue-500  text-purple-600">CodeForces Contests</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {cfData.map((cont, index) => (
                    <div key={index} className="bg-gray-800 hover:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 cursor-pointer">
                         <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-2">
                            <p className="text-center text-white font-bold truncate">{cont.name}</p>
                            </div>
                            <div className="p-4">
                            <p className="text-white mb-2">
                                <span className="text-gray-400">Status: </span>
                                <span className={`font-medium ${cont.phase === "BEFORE" ? "text-green-400" : "text-red-400"}`}>{cont.phase === "BEFORE" ? "Upcoming" : "Past Contest"}</span>
                                </p>
                                <p className="text-white text-sm"> <span className="text-gray-400">Starts: </span>
                                <span className="font-medium text-blue-400">{new Date(1000*cont.startTimeSeconds).toLocaleString()}</span>
                                    </p>
                                </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {ccData.length > 0 && (
                    <div className="w-full mb-8">
                        <h2 className="text-2xl font-bold mb-4 pl-2 border-l-4 border-yellow-500 text-purple-600">CodeChef Contests</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {ccData.map((cont, index) => (
                                <div key={index} className="bg-gray-800 hover:bg-gray-700 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-yellow-500/30 transition-all duration-300 cursor-pointer">
                                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 p-2">
                                    <p className="text-center text-white font-bold truncate">{cont.contest_code}</p>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-white mb-2">
                                         <span className="text-gray-400">Status: </span>
                                        <span className={`font-medium ${cont.phase === "BEFORE" ? "text-green-400" : "text-red-400"}`}>{cont.phase === "BEFORE" ? "Upcoming" : "Past Contest"} </span>
                                        </p>
                                        <p className="text-white text-sm"><span className="text-gray-400">Starts: </span>
                                            <span className="font-medium text-blue-400">{new Date(1000*cont.startTimeSeconds).toLocaleString()}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}