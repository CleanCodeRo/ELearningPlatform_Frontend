import React from "react"
import Button1 from "../Button1"

const PresentationHero = () => {
  return (
    <div id="ParentHolder" className="grid grid-cols-5 w-full px-[6rem] bg-cover bg-center py-20 font-inter" style={{backgroundImage : "url(/images/bgTexture.jpg)"}}>

      <div id="TitleAndButtons" className="col-span-2 mt-10">
         <p className="text-[4rem] leading-snug  tracking-wide  font-bold">Up Your <span className=" text-[#20B486]">Skills</span> <br/> To  <span className=" text-[#20B486]">Advance</span> Your <br/>  <span className=" text-[#20B486]">Career</span> Path</p>
         <p className="text-lg  text-gray-800 tracking-wide ">Learn Full Stack Development, UI-UX Design skills with weekend UX . The latest online learning system and material that help your knowledge growing.</p>

         <div id="buttons" className="flex items-center text-xl  font-bold my-14">
            <button className="px-8 py-5 bg-[#20B486] rounded-lg text-light-green-50 mr-4 shadow-sm shadow-[#20B486]">
              Get Started
            </button>
            <button className="px-8 py-5 text-[#20B486] rounded-lg bg-[#EAFFF9] shadow-sm shadow-[#EAFFF9]">
             Get Free Trail
            </button>
         </div>
      </div>

      <div id="PhotoPart" className="flex items-center justify-center col-span-3">
        <img className="rounded-full w-[35rem]" src="/images/CleanCode.jpg"/>
      </div>

      
    

    </div>
  )
}
export default PresentationHero