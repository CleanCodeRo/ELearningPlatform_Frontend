import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import LessonCard from "./LessonCard";

export default function Lessons() {
  const [lessons, setLessons] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (params.weekId) {
      fetch(`http://localhost:8080/lessons/${params.weekId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setLessons(data);
        })
        .catch((err) => {
          console.error("Error fetching lessons:", err);
          navigate("/login");
        });
    }
  }, [params.weekId]);

  return (
    <div className="pt-5 pb-10 font-inter" >
      <div className=" flex items-center ">
        <p className="text-2xl p-4 font-bold rounded-xl text-quaternary">
          LESSONS
        </p>
        {params.weekId && (
          <button
            onClick={() =>
              navigate(
                `/home/module/${params.moduleId}/week/${params.weekId}/createLesson`
              )
            }
            className="h-10 w-10 rounded-full bg-fifth flex items-center justify-center text-xl mx-2"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" >
        {lessons != null ? (
          lessons.map((lesson, index) => (
            <LessonCard
              key={index}
              id={lesson.id}
              name={lesson.name}
              description={lesson.description}
              gitHubLink={lesson.gitHubLink}
            />
          ))
        ) : (
          <div className="col-span-4 text-xl text-center my-10 text-gray-500">
            - No week selected -
          </div>
        )}
      </div>
    </div>
  );
}
