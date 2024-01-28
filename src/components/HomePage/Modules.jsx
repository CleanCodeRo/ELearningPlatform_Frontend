import React, { useEffect, useState } from "react";
import ModuleAndWeekCard from "../ModuleAndWeekCard";

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
      });
  }, []);

  return (
    <div className="pt-5 pb-10 font-inter">
      <p className="text-4xl p-4  font-bold">Modules</p>
      <div className="flex items-center py-3">
        {modules?.map((module, index) => (
          <ModuleAndWeekCard
            key={index}
            id={module.id}
            title={`Module ${module.number}`}
            subtitle={module.name}
            image={module.imgLink}
          />
        ))}

        <a
          href="/createModule"
          className="h-20 w-20 rounded-full bg-fifth flex items-center justify-center text-5xl mx-10"
        >
          <i className="fa-solid fa-plus"></i>
        </a>
      </div>
    </div>
  );
}
