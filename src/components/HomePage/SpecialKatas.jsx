import React from "react";
import KataCarousel from "./KataCarousel";



export default function SpecialKatas() {


  const FilterButton = () => {
    return (
      <div>

      </div>
    )
  }


  return (
    <div id="conatainer" className=" w-full pt-5 pb-10">
      <p id="title" className="text-4xl p-4 text-fourth  font-bold text-center">Endless learning</p>

      <div id="containerSlider" className=" flex justify-center items-center " >

        <KataCarousel />

      </div>



    </div>
  )
}
