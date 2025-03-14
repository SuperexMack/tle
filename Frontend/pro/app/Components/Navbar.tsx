export function Navbar(){
    return(
        <>
        <div className="bg-white/20 backdrop-blur-lg  w-full h-[80px] flex items-center border-b-slate-300 fixed top-0">

            {/* Name tag */}
           <div className="absolute left-[20%]">
            <h1 className="font-bold text-[30px] text-white">TLE-Ele-App</h1>
           </div>

           {/* Go Tag */}
           
           <div className="absolute right-[10%] flex items-center justify-center  space-x-7">
              <div className="flex items-center justify-center bg-purple-500 rounded-xl w-[200px]">
              <h1 className="p-3">Explore</h1>
              </div>

              <div className="flex items-center justify-center bg-slate-500 rounded-xl w-[200px]">
              <h1 className="p-3">Explore</h1>
              </div>
           </div>
          

        </div>
        </>
    )
}