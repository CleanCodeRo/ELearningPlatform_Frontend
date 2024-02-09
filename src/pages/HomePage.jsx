import React from "react";
import Modules from "../components/HomePage/Modules";
import SideHeader from "../components/SideHeader";
import SpecialKatas from "../components/HomePage/SpecialKatas/SpecialKatas";
import FilterKataList from "../components/HomePage/SpecialKatas/FilterKataList";

function HomePage() {
  return (
    <div className=" select-none flex flex-row text-sixth">
      <SideHeader />
    
      <div className="flex flex-col px-5 " style={{width : "calc(100vw - 5rem)"}}>
        <Modules />
        <FilterKataList/>
        <SpecialKatas />
      </div>
    </div>
  );
}

export default HomePage;
