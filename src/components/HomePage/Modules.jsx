import React from "react";
import ModuleAndWeekCard from "../ModuleAndWeekCard";

export default function Modules() {
  

  const addNewModule = () =>{

  }


  return (
    <div className="pt-5 pb-10">
      <p className="text-4xl p-4  font-bold">Modules</p>
      <div className="flex items-center py-3">
        <ModuleAndWeekCard title="Module 1" subtitle="Prog Basisc" />
        <ModuleAndWeekCard title="Module 2" subtitle="Web" />
        <ModuleAndWeekCard title="Module 3" subtitle="OOP" />
        <ModuleAndWeekCard title="Module 4" subtitle="Advanced" />


        <button onClick={addNewModule} className="h-20 w-20 rounded-full bg-blue-700 flex items-center justify-center text-5xl mx-10">
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  )
}