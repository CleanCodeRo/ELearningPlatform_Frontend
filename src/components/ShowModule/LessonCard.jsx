import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom } from "jotai";
import state, { getCompletedStuff } from "../ReusableComponents/Atom";
import EditPen from "../ReusableComponents/EditPen";
import CosutmCheckBox from "../ReusableComponents/CheckBox/CosutmCheckBox";
import Loading from "../ReusableComponents/Loading/Loading";
import { startLink } from "../../constants/Constants";


export default function LessonCard({ lesson }) {
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
    if (e.target.checked) {
      setLessonStatus(true);
    } else {
      setLessonStatus(false);
    }
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
      <div id="container" className="flex flex-col items-center border rounded-lg mb-3 lg:mb-0">
        <p id="label" className=" bg-second w-fit px-1" style={{ margin: "-13px 0 0 0px" }}>Modify Status</p>
        <div className="flex items-center gap-5 bg-sixth shadow-md hover:shadow-lg shadow-sixth hover:shadow-sixth px-6 py-2 text-first rounded-lg duration-300">
          <CosutmCheckBox idNumber={lesson.id} checkBoxEvent={EditStatusEvent} defaultChecked={defaultChecked} />
          <label className="text-2xl font-bold">{lessonStatus ? "Done" : "Todo"}</label>
        </div>
      </div>
    );
  };

  return (
    <div
      name="principleHolder"
      id={lesson.id}
      className="flex  items-center justify-between min-w-[15rem]  bg-white p-3 m-3 rounded-xl animate-fade-down animate-ease-in-out relative"
      ref={lessonRef}
    >

      {/* loading for card */}
      {loading &&
        <div id="loadinComponent" className="absolute top-0 left-0 bg-gray-100 bg-opacity-20 z-10 w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      }

      <div id="topPart" className="flex ">
          <img className="w-10 mx-2" src={lesson.optional ? `/SVGs/statusSVGs/optional.svg` : `/SVGs/statusSVGs/mandatory.svg`}/>
          <p className="my-3 text-2xl sm:text-2xl  line-clamp-2 w-full ">
            {lesson.name}
          </p>

          <div id='editPenContainer' className="flex items-center">
          <EditPen user={{ role: user.role }}
            deleteEvent={(e) => deleteLesson(e, lesson.id, params.weekId)}
            editEvent={(e) => editEvent(e, params.moduleId, params.weekId, lesson.id)} />
          </div>
      </div>

      <div
        name="bottomPart"
        id="redirectButtonAndStatus"
        className="flex flex-col-reverse lg:flex-row  justify-between items-center px-4 "
      >
        <a
          href={lesson.gitHubLink}
          target="_blank"
          className="cursor-pointer w-full lg:w-fit my-2 xs:my-0  lg:mr-4  px-6 py-2   bg-sixth rounded-lg text-first shadow-md hover:shadow-lg hover:shadow-sixth shadow-sixth text-2xl font-bold text-center duration-300"
        >
          Learn
        </a>

        < EditStatusComponentV2 />
      </div>
    </div>
  );
}