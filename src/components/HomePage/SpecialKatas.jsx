import React from "react";
import { Link } from "react-router-dom";

export default function SpecialKatas() {
  const FilterButton = () => {
    return <div></div>;
  };

  return (
    <div className="pt-5 pb-10 px-5 font-inter">
      <div
        id=""
        className="flex items-center"
      >
        <p className="text-4xl p-4  font-bold border-2 rounded-lg text-fourth">
          SPECIAL KATAS
        </p>
        <Link
          to="/createModule"
          className="h-10 w-10 rounded-full bg-fifth flex items-center justify-center text-xl mx-2"
        >
          <i className="fa-solid fa-plus"></i>
        </Link>
      </div>
    </div>
  );
}
