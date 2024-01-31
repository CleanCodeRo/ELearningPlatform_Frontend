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
      .catch((err) =>{
        navigate("/login")
       })
  }, []);

  return (
    <div className="pt-5 pb-10 px-5 font-inter">
      <div id="titleAndAddButton" className="flex items-center  border-2 rounded-xl">
        <p className="text-4xl p-4  font-bold border-2 rounded-lg text-fourth">MODULES</p>
        <Link to="/createModule"
          className="h-10 w-10 rounded-full bg-fifth flex items-center justify-center text-xl mx-2"
        >
          <i className="fa-solid fa-plus"></i>
        </Link>
      </div>

      <div className="flex items-center py-3">
        {modules?.map((module, index) => (
          <ModuleCard
            key={index}
            id={module.id}
            title={`Module ${module.number}`}
            subtitle={module.name}
            image={module.imgLink}
          />
        ))}


      </div>
    </div>
  );
}
