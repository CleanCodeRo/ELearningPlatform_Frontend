
import React, { useEffect, useState } from "react";
import ModuleAndWeekCard from "../ModuleAndWeekCard";
import { useParams } from "react-router-dom";

export default function Weeks() {
  const [weeks, setWeeks] = useState(null);
  const params = useParams()

  useEffect(() => {
    fetch(`http://localhost:8080/weeks/${params.id}` , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWeeks(data) 
      });
  }, []);

  return (
    <div className="pt-5 pb-10 font-inter">
      <p className="text-4xl p-4  font-bold">Weeks</p>
      <div className="flex items-center py-3">
        { weeks?.map((week, index) => (
          <ModuleAndWeekCard
            key={index}
            id={week.id}
            title={`Week ${week.number}`}
            subtitle={week.name}
            image={week.imgLink}
          />
        ))}

        <a
          href="/createWeek"
          className="h-20 w-20 rounded-full bg-fifth flex items-center justify-center text-5xl mx-10"
        >
          <i className="fa-solid fa-plus"></i>
        </a>
      </div>
    </div>
  );
}
