import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import state, { returnPercentage } from "../ReusableComponents/Atom";
import EditPen from "../ReusableComponents/EditPen";
import Loading from "../ReusableComponents/Loading/Loading";
import { startLink } from "../../constants/Constants";
import ProgressBar from "../ReusableComponents/ProgressBar";

export default function ModuleCard({ id, title, userRole, weeks, color, moduleIndex }) {
  let moduleCard = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks);
  const [progressBarLength, setProgresBarLength] = useState(null)

  const [refreshWeekProgressBar, setRefreshWeekProgressBar] = useAtom(state.refreshWeekProgressBar);
  const [[moduleNumber, moduleName], setModuleDetails] = useAtom(state.moduleNumberAndName)

  useEffect(() => {
    if (!progressBarLength) {
      let [mandatoryPercentage, completePercentage] = returnPercentage(weeks, completedWeeks)
      setProgresBarLength(mandatoryPercentage);
    }
  }, [refreshWeekProgressBar])

  const deleteModule = async (e) => {
    e.stopPropagation();
    setLoading(true);

    fetch(`${startLink}/modules?moduleId=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        moduleCard.current.remove()
      })
  };

  const editEvent = (e, navigate) => {
    e.stopPropagation();
    navigate(`/editModule/${id}`);
  }

  return (
    <div
      name="wholeCard"
      id={id}
      ref={moduleCard}
      className={`${userRole == "USER" && progressBarLength == 0 ? "bg-generalColors-light-gray" : color} animate-fade-left animate-ease-in-out flex flex-col relative cursor-pointer min-w-[16rem] max-w-[16.1] rounded-2xl mx-3 border-[4.5px] border-white duration-100 text-generalColors-dark-blue`}
      onClick={() => {
        navigate(`module/${id}`);
        }}
    >

      {/* loading for card */}
      {loading &&
        <div id="loadinComponent" className="absolute top-0 left-0 bg-gray-100 bg-opacity-20 z-10 w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      }

      <div id="deleteAndModify" className="flex items-center justify-center absolute top-0 right-0 r w-11 h-11">
        <EditPen user={{ role: userRole }} deleteEvent={(e) => deleteModule(e)} editEvent={(e) => editEvent(e, navigate)} />
      </div>

      <div id="moduleNumber" className="flex items-center justify-center text-xl font-bold absolute top-0 left-0 rounded-tl-xl rounded-br-xl  bg-white w-11 h-11">
        <p>{moduleIndex + 1}</p>
      </div>

      <div id="moduleLogo" className={` w-full h-[15rem] flex items-center justify-center`} >
        <img className="w-[10rem] mb-2 " src={`/moduleIcons/quest-module_${moduleIndex}_icon.png`} />
      </div>

      <div id="restOfDetails" className="bg-white w-full rounded-t-2xl text-generalColors-dark-grey pt-4 p-1">
        <p className="text-center font-bold text-sm mb-7">{title}</p>
        <ProgressBar progressBarLength={progressBarLength} />
      </div>

      <div id="totalPercentage" className=" flex justify-end bg-white pt-9">
        <p className="flex items-center justify-center h-12 w-16 bg-generalColors-light-gray rounded-br-xl rounded-tl-xl text-sm ">{progressBarLength}%</p>
      </div>




    </div>
  );
}
