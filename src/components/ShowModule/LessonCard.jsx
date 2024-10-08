import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import state, { getCompletedStuff } from "../ReusableComponents/Atom";
import EditPen from "../ReusableComponents/EditPen";
import Loading from "../ReusableComponents/Loading/Loading";
import { startLink } from "../../constants/Constants";
import { Checkbox } from "@material-tailwind/react";


export default function LessonCard({ lesson, setConfirmNavigate, setNavigateLink }) {
  const [user, setUser] = useAtom(state.user);

  const [completedLessons, setCompletedLessons] = useAtom(state.completedLessons);
  const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks);
  const [completedModules, setCompletedModules] = useAtom(state.completedModules);

  const [lessonStatus, setLessonStatus] = useState(completedLessons.includes(lesson.id) ? true : false)
  const [loading, setLoading] = useState(false);
  const [refreshWeekProgressBar, setRefreshWeekProgressBar] = useAtom(state.refreshWeekProgressBar);
  const navigate = useNavigate();
  const params = useParams();
  const lessonRef = useRef(null)

  const deleteLesson = async (e, lessonId, weekId) => {
    e.stopPropagation();
    setLoading(true)
    try {
      await fetch(`${startLink}/lessons?lessonId=${lessonId}&weekId=${weekId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
        },
      });
      setLoading(false)
      lessonRef.current.remove()
    } catch (error) {
      setLoading(false)
      console.error("Error during DELETE operation:", error);
    }
  };

  const EditStatusEvent = (e) => {
    e.stopPropagation()
    setLessonStatus(e.target.checked)
  
    setLoading(true);
    fetch(`${startLink}/users?userId=${user.id}&lessonId=${lesson.id}&weekId=${params.weekId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`
      },
      body: JSON.stringify(e.target.checked ? "DONE" : "TODO")
    })
      .then(res => res.json())
      .then(() => {
        let userId = user.id
        getCompletedStuff({ userId, setCompletedLessons, setCompletedWeeks, setCompletedModules, setRefreshWeekProgressBar })
        setLoading(false);
      })
      .catch(err => {
        console.log(err)
      })
  }

  const editEvent = (e, moduleId, weekId, lessonId) => {
    e.stopPropagation();
    navigate(
      `/home/module/${moduleId}/week/${weekId}/editLesson/${lessonId}`
    );
  }

  const EditStatusComponentV2 = () => {
    let defaultChecked = completedLessons.includes(lesson.id) ? true : false;
    return (
      <div id="checkbox" className="flex items-center w-fit">
        <label className="text-2xl font-bold ">Mark as done</label>
            <Checkbox
              style={{ backgroundColor: `${!defaultChecked ? "#ffffff" : "#174072"}` }}
              onChange={EditStatusEvent} className={`border-2 `}
              inputRef={null} 
              defaultChecked={defaultChecked}
              />
          </div>
    );
  };

  const navigateToLesson = (e) => {
    e.stopPropagation()
    setNavigateLink(lesson.gitHubLink)
    setConfirmNavigate((value) => value + 1)
  }

  return (
    <div
      name="principleHolder"
      id={lesson.id}
      className="flex flex-col justify-between w-full bg-white text-generalColors-dark-blue p-3 m-3 rounded-xl animate-fade-down animate-ease-in-out relative"
      ref={lessonRef}
    >


      {/* loading for card */}
      {loading &&
        <div id="loadinComponent" className="absolute top-0 left-0 bg-gray-100 bg-opacity-20 z-10 w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      }

      <div className="flex flex-col mb-7">
        <div id="top-part" className="flex justify-between items-start w-full">
          <img className="w-10 mx-2 mt-1" src={lesson.optional ? `/SVGs/statusSVGs/optional.svg` : `/SVGs/statusSVGs/mandatory.svg`} />
          <p className=" text-2xl sm:text-2xl  line-clamp-2 w-full font-bold ">
            {lesson.number ? `${lesson.number}. ` : null}{lesson.name}
          </p>

          <EditPen user={{ role: user.role }}
            deleteEvent={(e) => deleteLesson(e, lesson.id, params.weekId)}
            editEvent={(e) => editEvent(e, params.moduleId, params.weekId, lesson.id)} />
        </div>

        <p id="description" className="mt-4">
          {lesson.description}
        </p>
      </div>


      <div className="flex justify-between items-center">
        <button
          onClick={navigateToLesson}
          target="_blank"
          className=" cursor-pointer w-full lg:w-fit my-4  lg:mr-4  px-6 py-2   bg-sixth rounded-lg shadow-md hover:shadow-lg hover:shadow-sixth shadow-sixth text-2xl font-bold text-center duration-300"
        >
          Learn
        </button>

        < EditStatusComponentV2 />
      </div>
    </div>
  );
}