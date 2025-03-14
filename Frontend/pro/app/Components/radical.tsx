"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/registry/magicui/dot-pattern";
import { SparklesTextDemo } from "./sparkle";
import { TextAnimateDemo8 } from "./Heading";

export function DotPatternDemo() {
  return (
    <div className="relative border-none flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-[#0f0e1a]">
      <DotPattern
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="w-full h-full flex flex-col justify-center items-center space-y-2 mt-14 p-4">
            
            <div className="w-[70%]">
            <h1 className="font-bold text-[70px] text-center"><TextAnimateDemo8></TextAnimateDemo8></h1>
            </div>
            <div className="w-[50%]">
                <SparklesTextDemo></SparklesTextDemo>
            </div>

            <div className="w-[70%] flex justify-center items-center space-x-12 mt-8">
             <button className="font-medium text-[20px] text-white bg-purple-600 rounded-lg p-3 w-[200px]">Explore</button>
             <button className="font-medium text-[20px] bg-green-500 text-white rounded-lg p-3">Explore Our Community</button>
            </div>

          </div>
    </div>
  );  
}
