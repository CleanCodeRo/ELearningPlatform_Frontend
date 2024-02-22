import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LessonCard from "./LessonCard";
import Loading from "../Loading/Loading";

export default function Lessons({ setLoadingLessons, loadingLessons, userRole }) {
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
          setLessons([])
          let dummyArr = []
          let i = 0;

          async function renderLessons() {
            if (i == data.length) {
              return;
            } else {
              dummyArr.push(data[i])
              setLessons([...dummyArr]);
              i++;
              setTimeout(() => renderLessons(), 400)
            }
          }

          renderLessons();
          setLoadingLessons(false)
        })
        .catch((err) => {
          console.error("Error fetching lessons:", err);
          navigate("/login");
        });
    } else {
      setLoadingLessons(false)
    }

  }, [params.weekId]);

  return (
    <div className="pt-5 pb-10 font-inter" >
      <div className=" flex items-center ">
        <p className="text-4xl p-4 font-bold border-2 rounded-xl text-fourth">
          LESSONS
        </p>
        {params.weekId && userRole == "ADMIN" && (
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


      {loadingLessons ?
        <div id="loading" className="w-full h-[10rem] flex items-center justify-center">
          <Loading />
        </div>

        :

        <div id="listOfLessons" className="grid grid-cols-3 " >
          {lessons && lessons.length > 0 ? (
            lessons.map((lesson, index) => (
              <LessonCard
                key={index}
                lesson = {lesson}
                userRole={userRole}
              />
            ))
          ) : (
            <div className="col-span-4 text-4xl text-center my-10 text-third animate-flip-down animate-duration-[400ms]">
              - No lessons here -
            </div>
          )}
        </div>
      }

    </div>
  );
}
