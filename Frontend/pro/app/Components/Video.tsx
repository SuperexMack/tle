import {HeroVideoDialog} from "@/registry/magicui/hero-video-dialog";
import myimg from "./priyansh.jpg"

export function HeroVideoDialogDemo() {
 
  return (
    <div className="relative shadow-[0px_-40px_80px_-10px_gray]">
      <HeroVideoDialog
        className="block dark:hidden"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/n-Xkbqcfi9w?si=NlwS1VAmbC0aqrlr"
        thumbnailSrc={myimg.src}
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/n-Xkbqcfi9w?si=NlwS1VAmbC0aqrlr"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}
