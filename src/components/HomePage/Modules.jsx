import React from "react";
import ModuleAndWeekCard from "../ModuleAndWeekCard";

export default function Modules(){
    return( 
        <div className=" w-full  bg-blue-400 py-10">
          <p className="text-4xl p-4  font-bold">Modules</p>
          <div className="flex bg-blue-200 py-3"> 
                <ModuleAndWeekCard/>
                <ModuleAndWeekCard/>
                <ModuleAndWeekCard/>
                <ModuleAndWeekCard/>
                
          </div>
        </div>
    )
}