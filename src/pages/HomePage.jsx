import React from "react";
import Modules from "../components/HomePage/Modules";
import SpecialKatas from "../components/HomePage/SpecialKatas";
import Header from "../components/Header";

function HomePage() {
  return (
    <div className="select-none">
      <Header />
      <Modules />
      <SpecialKatas />
    </div>
  );
}

export default HomePage;
