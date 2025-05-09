"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/registry/magicui/dot-pattern";
import { SparklesTextDemo } from "./sparkle";
import { TextAnimateDemo8 } from "./Heading";
import Link from "next/link";

export function DotPatternDemo() {
  return (
    <div className="relative border-none flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-[#0f0e1a]">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="w-full h-full flex flex-col justify-center items-center space-y-8 mt-14 p-4">
            
            <div className="w-[60%]">
            <h1 className="font-bold md:text-[70px] text-[50px] text-center"><TextAnimateDemo8></TextAnimateDemo8></h1>
            </div>
            <div className="w-[50%]">
                <SparklesTextDemo></SparklesTextDemo>
            </div>

            <div className="w-[70%] flex justify-center items-center space-x-12 mt-8">
             <Link href={"/datapage"} className="text-[20px] text-center font-bold text-white bg-purple-600 rounded-lg p-2 w-[200px] z-50">Explore</Link>
             <Link href={"/bookmark"} className="font-bold text-[20px] border-2 border-white bg-black text-white p-2 z-50">Explore Our Community</Link>
            </div>

          </div>
    </div>
  );  
}
