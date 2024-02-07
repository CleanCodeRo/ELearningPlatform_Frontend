import React from "react";
import Modules from "../components/HomePage/Modules";
import SpecialKatas from "../components/HomePage/SpecialKatas";
import SideHeader from "../components/SideHeader";
import FilterButtons from "../components/Category";

function HomePage() {
  return (
    <div className=" select-none flex flex-row text-sixth">
      <SideHeader />

      <div className="flex flex-col px-5 " style={{width : "calc(100vw - 5rem)"}}>
        <Modules />
        <FilterButtons/>
        <SpecialKatas />
      </div>
    </div>
  );
}

export default HomePage;
