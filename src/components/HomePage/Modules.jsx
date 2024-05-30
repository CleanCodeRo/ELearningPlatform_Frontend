import React, { useEffect, useState } from "react";
import ModuleCard from "./ModuleCard";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../ReusableComponents/Loading/Loading";
import { startLink } from "../../constants/Constants";

const moduleColors = [
  "bg-generalColors-medium-green",
  "bg-generalColors-medium-yellow",
  "bg-generalColors-light-blue",
  "bg-generalColors-medium-blue"
]

export default function Modules({userRole}) {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
  
    fetch(`${startLink}/modules`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModules(data)
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        navigate("/login");
      });
    
  }, []);

  

  return (
    <div className="pt-5 pb-10 bg-generalColors-dark-blue">
  <div id="titleAndAddButton" className="flex items-center justify-between px-4 sm:px-6 lg:px-8 mb-4">
    <p className="text-3xl sm:text-4xl font-bold text-fourth">Modules</p>
    {userRole === "ADMIN" && (
      <Link
        to="/createModule"
        className="h-10 w-10 rounded-full bg-fourth flex items-center justify-center text-xl hover:bg-[#2c8dfe]"
        aria-label="add_module"
      >
        <i className="fa-solid fa-plus"></i>
      </Link>
    )}
  </div>

  {loading ? (
    <div id="loading" className="w-full h-40 flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    
<div id="listOfModules" className="flex items-center py-7 overflow-x-scroll custom-scrollbar md:justify-center justify-start">
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
        {modules.map((module, index) => (
          <ModuleCard
            key={index}
            id={module.id}
            title={module.name}
            userRole={userRole}
            weeks={module.weeks}
            color={moduleColors[index]}
            moduleIndex={index}
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
          />
        ))}
      </div>
    </div>
  )}
</div>


  );
}




// <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
// <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
// <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
// <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
