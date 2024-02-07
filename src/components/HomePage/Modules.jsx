import React, { useEffect, useState } from "react";
import ModuleCard from "./ModuleCard";
import { Link } from "react-router-dom";

export default function Modules() {
  const [modules, setModules] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/modules", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModules(data);
      })
      .catch((err) => {
        navigate("/login");
      });
  }, []);

  return (
    <div className="pt-5 pb-10 px-5 font-inter">
      <div id="titleAndAddButton" className="flex items-center ">
        <p className="text-4xl p-4  font-bold  rounded-lg text-fourth">
          Modules
        </p>
        <Link
          to="/createModule"
          className="h-10 w-10 rounded-full bg-fourth flex items-center justify-center text-xl mx-2 hover:bg-[#2c8dfe]"
        >
          <i className="fa-solid fa-plus"></i>
        </Link>
      </div>

      <div className="flex items-center py-3">
        <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
        <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
        <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
        <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>

      </div>
    </div>
  );
}


 {/* {modules?.map((module, index) => (
          <ModuleCard
            key={index}
            id={module.id}
            title={`Module ${module.number}`}
            subtitle={module.name}
            image={module.imgLink}
          />
        ))} */}