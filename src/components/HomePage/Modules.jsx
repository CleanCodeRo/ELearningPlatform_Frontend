import React from "react";
import ModuleAndWeekCard from "../ModuleAndWeekCard";

export default function Modules(){
    return( 
        <div className=" w-full   pt-5 pb-10">
          <p className="text-4xl p-4  font-bold">Modules</p>
          <div className="flex  py-3"> 
                <ModuleAndWeekCard title="Module 1" subtitle="Prog Basisc" />
                <ModuleAndWeekCard title="Module 2" subtitle="Web" />
                <ModuleAndWeekCard title="Module 3" subtitle="OOP" />
                <ModuleAndWeekCard title="Module 4" subtitle="Advanced" />
                
          </div>
        </div>
    )
}