
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import WeekCard from "./WeekCard";

export default function Weeks() {
  const [weeks, setWeeks] = useState(null);
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`http://localhost:8080/weeks/${params.moduleId}`, {
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
        {weeks?.map((week, index) => (
          <WeekCard
            key={index}
            id={week.id}
            title={`Week ${week.number}`}
            subtitle={week.name}
            image={week.imgLink}
          />
        ))}

        <Link to={`/home/module/${params.moduleId}/createWeek`}>
          <button
            className="h-20 w-20 rounded-full bg-fifth flex items-center justify-center text-5xl mx-10"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </Link>
      </div>
    </div>
  );
}
