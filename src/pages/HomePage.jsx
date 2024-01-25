import React from "react";
import Modules from "../components/HomePage/Modules";
import SpecialKatas from "../components/HomePage/SpecialKatas";

function HomePage() {
  return (
    <div className="select-none">
      <Modules />
      <SpecialKatas />
    </div>
  );
}

export default HomePage;
