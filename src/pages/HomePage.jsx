import React from "react";
import Modules from "../components/HomePage/Modules";
import SpecialKatas from "../components/HomePage/SpecialKatas";
import SideHeader from "../components/SideHeader";
import FilterButtons from "../components/Category";

function HomePage() {
  return (
    <div className="font-inter select-none flex flex-row text-sixth">
      <SideHeader />

      <div className="flex flex-col w-screen">
        <Modules />
        <FilterButtons/>
        <SpecialKatas />
      </div>
    </div>
  );
}

export default HomePage;
