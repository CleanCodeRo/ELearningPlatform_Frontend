import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import state, { returnPercentage } from "../ReusableComponents/Atom";
import EditPen from "../ReusableComponents/EditPen";


export default function WeekCard({ week, setLoadingLessons, userRole }) {
  const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks)
  const [completedLessons, setCompletedLessons] = useAtom(state.completedLessons)

  const [progresBarLength, setProgresBarLength] = useState(null)
  const [truePercentage, setTruePercentage] = useState(0);
  const [refreshWeekProgressBar, setRefreshWeekProgressBar] = useAtom(state.refreshWeekProgressBar);

  let weekCard = useRef(null);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (!progresBarLength) {
      let [mandatoryPercentage, completePercentage] = returnPercentage(week.lessons, completedLessons)
      setTruePercentage(completePercentage)
      setProgresBarLength(mandatoryPercentage);
    } else if (params.weekId == week.id) {
      let [mandatoryPercentage, completePercentage] = returnPercentage(week.lessons, completedLessons)
      setTruePercentage(completePercentage)
      setProgresBarLength(mandatoryPercentage);
    }
  }, [refreshWeekProgressBar])

  const deleteWeek = async (e, weekId) => {
    e.stopPropagation();
    try {
      await fetch(`http://localhost:8080/weeks?weekId=${weekId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
        },
      });
      navigate(window.location.pathname.split("/").slice(0, 4).join("/"))
      window.location.reload();
    } catch (error) {
      console.error("Error during DELETE operation:", error);
    }
  };

  const editEvent = (e, moduleId, weekId) =>{
    e.stopPropagation();
    navigate(`/home/module/${moduleId}/editWeek/${weekId}`); 
  }

  return (
    <div
      name="wholeCard"
      id={week.id}
      ref={weekCard}
      onClick={(e) => {
        e.stopPropagation();
        let nextPath = `/home/module/${params.moduleId}/week/${week.id}`
        if (nextPath != window.location.pathname) {
          setLoadingLessons(true);
          navigate(nextPath);
        }
      }}
      className="flex flex-col relative cursor-pointer animate-fade-left animate-ease-in-out  min-w-[18rem]  max-w-80 text-[#afafaf] bg-white rounded-2xl mx-3 p-1 border-b-[3px] border-transparent hover:border-light-blue-200 shadow-lg hover:shadow-light-blue-100 duration-100"
    >
      <div
        id="image"
        className=" h-40 w-full rounded-lg rounded-t-2xl bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${week.imgLink})` }}
      ></div>
      <div
        id="title"
        className="text-sixth bg-[#2c8dfe] w-fit p-2 rounded-xl my-0  top-0"
        style={{ margin: "-16px 0 0 7px" }}
      >
        {`Week ${week.number}`}
      </div>

        <div
          id="deleteAndModify"
          className="absolute top-2 right-2  "
        >
         <EditPen user={{role : userRole}} deleteEvent={(e) => deleteWeek(e, week.id)} editEvent={(e) => editEvent(e, params.moduleId, week.id) }/>
        </div>

      <div id="other info" className="flex flex-col p-2">
        <p id="subtitle" className="text-3xl line-clamp-1">
          {week.name}
        </p>

        <div id="PercentageAndRating" className="flex py-2 justify-between">
          <p>Progress {truePercentage}%</p>
          <div id="rating" className="flex items-center mr-4">
            <p>4.3/5</p>
            <i className="fa-solid fa-star mr-1"></i>
          </div>
        </div>

        <div id="progressBar" className="flex items-center bg-third justify-center h-10 w-full  rounded-lg relative">
          <p className="text-sixth text-center  rounded-lg   text-lg font-bold z-10">{completedWeeks.includes(week.id) ? "Done" : "Todo"}</p>
          <div className={`absolute bg-fifth h-full rounded-lg left-0 top-0 transition-all duration-[1s] ease-out `} style={{ width: `${progresBarLength}%` }}></div>
        </div>
      </div>
    </div>
  );
}