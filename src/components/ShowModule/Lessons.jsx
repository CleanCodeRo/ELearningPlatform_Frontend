import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LessonCard from "./LessonCard";
import Loading from "../Loading/Loading";
import CheckBox from "../CheckBox/CheckBox";

export default function Lessons({ setLoadingLessons, loadingLessons, userRole }) {
  const [mandatoryLessons, setMandatoryLessons] = useState(null)
  const [optionalLessons, setOptionalLessons] = useState(null)
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
          setOptionalLessons([]);
          setMandatoryLessons([]);
          let dummyMandatory = [];
          let dummyOptional = [];
          let i = 0;

          async function renderLessons() {
            if (i == data.length) {
              return;
            } else {
              if (data[i].optional) {
                dummyOptional.push(data[i]);
                setOptionalLessons([...dummyOptional]);
              } else {
                dummyMandatory.push(data[i]);
                setMandatoryLessons([...dummyMandatory]);
              }

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
        <p className="text-3xl sm:text-4xl p-4 font-bold border-2 rounded-xl text-fourth">
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

        <div id="listOfLessons" className=" grid smd:grid-cols-2 2xl:!grid-cols-3 " >
          {/* RENDERING MADATORY LESSONS */}
          {mandatoryLessons && mandatoryLessons.length > 0 ? (
            mandatoryLessons.map((lesson, index) => <LessonCard key={index} lesson={lesson} userRole={userRole} />)
          ) : (
            <div className="col-span-4 text-4xl text-center my-10 text-third animate-flip-down animate-duration-[400ms]">
              - No madatory lessons here -
            </div>
          )}

          {/* RENDERING OPTIONAL LESSONS */}
          {optionalLessons && optionalLessons.length > 0 ? (
            <>
              <div id="optionalLessonsSection" className="w-full col-span-4 flex  items-center animate-fade-down animate-ease-in-out">
                <h1 className="text-2xl sm:text-3xl min-w-fit p-4 font-bold  rounded-xl text-fourth  ">Optional lessons</h1>
                <div className="bg-[#afafaf] h-[1.5px] w-full rounded-full"></div>
              </div>
              {optionalLessons.map((lesson, index) => <LessonCard key={index} lesson={lesson} userRole={userRole} />)}
            </>
          ) : (
            null
          )}
        </div>
      }
    </div>
  );
}
