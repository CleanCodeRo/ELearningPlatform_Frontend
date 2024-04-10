import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import state, { returnPercentage } from "../ReusableComponents/Atom";
import EditPen from "../ReusableComponents/EditPen";
import { startLink } from "../../constants/Constants";
import ProgressBar from "../ReusableComponents/ProgressBar";


export default function WeekCard({ week, weekColor, setLoadingLessons, userRole, moduleName }) {
  const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks)
  const [completedLessons, setCompletedLessons] = useAtom(state.completedLessons)
  const [progressBarLength, setProgresBarLength] = useState(null)
  const [truePercentage, setTruePercentage] = useState(0);
  const [refreshWeekProgressBar, setRefreshWeekProgressBar] = useAtom(state.refreshWeekProgressBar);
  const [[statusImage, statusColor], setStatusInfo] = useState([]);

  let weekCard = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  
  useEffect(() => {
    if (!progressBarLength) {
      let [mandatoryPercentage, completePercentage] = returnPercentage(week.lessons, completedLessons)
      setTruePercentage(completePercentage)
      setProgresBarLength(mandatoryPercentage);
      setStatusIcon(mandatoryPercentage)
    } else if (params.weekId == week.id) {
      let [mandatoryPercentage, completePercentage] = returnPercentage(week.lessons, completedLessons)
      setTruePercentage(completePercentage)
      setProgresBarLength(mandatoryPercentage);
      setStatusIcon(mandatoryPercentage)
    }

  }, [refreshWeekProgressBar])

  const setStatusIcon = (progressBarLength) =>{
    if(progressBarLength == 0){
      setStatusInfo(["/SVGs/statusSVGs/closed.svg", "bg-generalColors-dark-red"])
    } else if (completedWeeks.includes(week.id)){
      setStatusInfo([ "/SVGs/statusSVGs/done.svg", "bg-secondaryColors-dark-green"])
    }else{
      setStatusInfo(["/SVGs/statusSVGs/open.svg", "bg-secondaryColors-light-orange"])
    }
  }

  const deleteWeek = async (e, weekId) => {
    e.stopPropagation();
    try {
      await fetch(`${startLink}/weeks?weekId=${weekId}`, {
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

  const editEvent = (e, moduleId, weekId) => {
    e.stopPropagation();
    navigate(`/home/module/${moduleId}/editWeek/${weekId}`);
  }

  return (
    <div
      name="wholeWeekCard"
      id={week.id}
      ref={weekCard}
      // style={{backgroundColor : weekColor}}
      className={`min-w-[17rem] max-w-[17.1rem] ${progressBarLength == 0 && userRole == "USER"? "bg-generalColors-light-gray" : weekColor } animate-fade-left animate-ease-in-out flex flex-col relative cursor-pointer  rounded-2xl   border-[4.5px] border-white duration-100 text-generalColors-dark-blue`}
      onClick={(e) => {
        e.stopPropagation();
        let nextPath = `/home/module/${params.moduleId}/week/${week.id}`
        if (nextPath != window.location.pathname) {
          setLoadingLessons(true);
          navigate(nextPath);
        }
      }}
    // style={{ backgroundColor: color }}
    >



      <div id="deleteAndModifyWeek" className="flex items-center justify-center absolute top-0 right-0 w-11 h-11">
        <EditPen user={{ role: userRole }} deleteEvent={(e) => deleteWeek(e, week.id)} editEvent={(e) => editEvent(e, params.moduleId, week.id)} />
      </div>

      <div id="weeknumber" className={`flex items-center justify-center ${statusColor} text-xl font-bold absolute top-0 left-0 rounded-tl-xl rounded-br-xl  w-11 h-11`}>
        <img className="w-[40%]" src={statusImage}/>
      </div>

      <div id="weekHero" className={` flex flex-col items-center w-full h-[5rem] rounded-xl mt-14`} >
        <p className="text-center font-bold text-sm mb-4">{week.name}</p>
        <div className="flex items-center justify-center bg-generalColors-dark-blue text-white font-bold w-[70%] py-1 rounded-full">Week {week.number}</div>
      </div>

      <div className="flex flex-col bg-white">
        <div id="restOfDetails" className=" w-full rounded-t-2xl text-generalColors-dark-grey pt-4 p-1">
          <ProgressBar progressBarLength={progressBarLength} />
        </div>

        <div id="listCategoriesWeek" className="flex flex-wrap items-center gap-1 my-2 p-1 h-16  text-xs overflow-y-scroll lowercase">
          {week.categories.map((category, index) => (
            <div key={index} className="w-fit bg-gray-500 h-7 text-white flex items-center px-2 rounded-lg">
              {category}
            </div>
          ))}
        </div>

        <div id="totalPercentage" className=" flex justify-end  ">
          <p className="flex items-center justify-center h-12 w-16 bg-generalColors-light-gray rounded-br-xl rounded-tl-xl text-sm ">{truePercentage}%</p>
        </div>
      </div>

    </div>
  );
}