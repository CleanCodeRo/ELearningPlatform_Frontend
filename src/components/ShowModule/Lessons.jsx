import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LessonCard1 from "./LessonCard1";
import Loading from "../ReusableComponents/Loading/Loading";
import { startLink } from "../../constants/Constants";



export default function Lessons({ userRole, setWeekNumber }) {
  const [mandatoryLessons, setMandatoryLessons] = useState(null)
  const [optionalLessons, setOptionalLessons] = useState(null)
  const [loadingLessons, setLoadingLessons] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.weekId) {
      // fetch(`${startLink}/lessons/${params.weekId}`, {
        fetch(`${startLink}/weeks?weekId=${params.weekId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setWeekNumber(data.number)
          setOptionalLessons([]);
          setMandatoryLessons([]);
          let dummyMandatory = [];
          let dummyOptional = [];
          let i = 0;

          async function renderLessons() {
            if (i == data.lessons.length) {
              return;
            } else {
              if (data.lessons[i].optional) {
                dummyOptional.push(data.lessons[i]);
                setOptionalLessons([...dummyOptional]);
              } else {
                dummyMandatory.push(data.lessons[i]);
                setMandatoryLessons([...dummyMandatory]);
              }

              i++;
              setTimeout(() => renderLessons(), 100)
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
    <div className="w-full flex flex-col items-center pt-5 pb-10 font-inter " >
      <div className=" flex items-center ">

        {params.weekId && userRole == "ADMIN" && (
           <button
           onClick={() =>
            navigate(
              `/home/module/${params.moduleId}/week/${params.weekId}/createLesson`
            )
          }
           className="gap-3 rounded-full bg-fifth flex items-center justify-center text-xl mx-2 text-1xl sm:text-2xl px-16 py-1 font-bold border-2 text-generalColors-dark-blue bg-white">
           Add Lesson <i className="fa-solid fa-plus"></i>
         </button>
          
        )}
      </div>


      {loadingLessons ?
        <div id="loading" className="w-full h-[10rem] flex items-center justify-center">
          <Loading />
        </div>

        :

        <div id="listOfLessons" className="flex flex-col  " >
          {/* RENDERING MADATORY LESSONS */}
          {mandatoryLessons && mandatoryLessons.length > 0 ? (
            mandatoryLessons.map((lesson, index) => <LessonCard1 key={index} lesson={lesson}  />)
          ) : (
            <div className="col-span-full text-4xl text-center my-10 text-third animate-flip-down animate-duration-[400ms]">
              - No mandatory lessons here -
            </div>
          )}

          {/* RENDERING OPTIONAL LESSONS */}
          {optionalLessons && optionalLessons.length > 0 ? (
            <>
              <div id="optionalLessonsSection" className="w-full col-span-full flex  items-center animate-fade-down animate-ease-in-out">
                <h1 className="text-2xl sm:text-3xl min-w-fit p-4 font-bold  rounded-xl text-fourth  ">Optional lessons</h1>
                <div className="bg-generalColors-dark-blue h-[1.5px] w-full rounded-full"></div>
              </div>
              {optionalLessons.map((lesson, index) => <LessonCard1 key={index} lesson={lesson} userRole={userRole} />)}
            </>
          ) : (
            null
          )}
          
        </div>
      }
    </div>
  );
}
