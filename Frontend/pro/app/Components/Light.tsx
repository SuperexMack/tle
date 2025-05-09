import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "./spotlight";
import { HeroVideoDialogDemo } from "./Video";

export function SpotlightPreview() {
  return (
    <div className="relative flex flex-col min-h-screen p-4 w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />

      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-4xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          The<br /> TLE-Eliminators Contest Ground.
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
        We are here to give u update about the upcoming Contest and the past contest so that you don't need to worry about contest details
          copy.
        </p>
      </div>
      <div className="w-full  flex items-center justify-center mt-5 h-auto p-6">
            <div className="w-[60%] h-[50%] rounded-lg">
           <HeroVideoDialogDemo></HeroVideoDialogDemo>
            </div>
          </div>
    </div>
  );
}
