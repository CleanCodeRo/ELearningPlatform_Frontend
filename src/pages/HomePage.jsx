import React from "react";
import Modules from "../components/HomePage/Modules";
import SpecialKatas from "../components/HomePage/SpecialKatas";
import SideHeader from "../components/SideHeader";

function HomePage() {
  return (
    <div className="font-inter select-none flex flex-row text-light-blue-50">
      <SideHeader />

      <div className="flex flex-col w-screen">
        <Modules />
        <SpecialKatas />
      </div>
    </div>
  );
}

export default HomePage;
