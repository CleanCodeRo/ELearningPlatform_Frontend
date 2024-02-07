import React from "react";
import Carousel from "../Carousel";

export default function SpecialKatas() {


  const FilterButton = () => {
    return (
      <div>

      </div>
    )
  }


  return (
    <div id="conatainer" className=" w-full   pt-5 pb-10">
      <p id="title" className="text-4xl p-4 text-fourth  font-bold ">Endless learning</p>

      <div id="containerSlider" className=" flex justify-center items-center " style={{ width: 'calc(100% - 80px)' }}>

        <Carousel />

      </div>



    </div>
  )
}
