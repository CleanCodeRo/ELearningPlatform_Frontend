import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";
import { useAtom } from "jotai";
import state, { getCompletedStuff } from "../Atom";
import Loading from "../Loading/Loading";

export default function LessonCard({lesson, userRole }) {
  const [user, setUser] = useAtom(state.user);
  const [completedLessons, setCompletedLessons] = useAtom(state.completedLessons);
  const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks);
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const deleteLesson = async (e) => {
    e.stopPropagation();
    try {
      await fetch(`http://localhost:8080/lessons?lessonId=${lesson.id}&weekId=${params.weekId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
        },
      });

      window.location.reload();
    } catch (error) {
      console.error("Error during DELETE operation:", error);
    }
  };

  const EditStatusEvent = (initialStatus, status) =>{
    setLoading(true)

    if(status == initialStatus){
      setLoading(false)
      return;
    }

    fetch(` http://localhost:8080/users?userId=${user.id}&lessonId=${lesson.id}&weekId=${params.weekId}`,{
      method : "PATCH",
      headers :{
        "Content-Type" : "application/json",
        Authorization : `Bearer ${localStorage.getItem("ELearningToken")}`
      },
      body : JSON.stringify(status)
    })
    .then(res => res.json())
    .then(data => {
      getCompletedStuff(user.id, setCompletedLessons, setCompletedWeeks)
      console.log(data);
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const EditPen = () => {
    return (
      userRole == "ADMIN" ?
        <Menu>
          <MenuHandler>
            <i className="fa-solid fa-pen p-2 text-first bg-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,1)] rounded-xl duration-300 cursor-pointer mx-3"></i>
          </MenuHandler>
          <MenuList className=" bg-first bg-opacity-40 backdrop-blur-md border-0 text-sixth ">
            <MenuItem
              onClick={(e) => { deleteLesson(e) }}
              className="bg-first bg-opacity-80 mb-1"
            >
              <i className="fa-solid fa-trash-can mr-1" /> Delete
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  `/home/module/${params.moduleId}/week/${params.weekId}/editLesson/${lesson.id}`
                );
              }}
              className="bg-first bg-opacity-80"
            >
              <i className="fa-solid fa-pen-to-square mr-1" /> Edit
            </MenuItem>
          </MenuList>
        </Menu> : null
    );
  };

  const EditStatusComponent = () => {

    const [initialStatus, setInitialStatus] = useState(completedLessons.includes(lesson.id) ? "DONE" : "TODO");
    return (
      <div id="holder" className="">
        <Select
          size="md"
          color="blue"
          id="select"
          label="Select Status"
          value={initialStatus}
          onChange={(status) => EditStatusEvent(initialStatus ,status)}
          className="text-sixth"
        >
          <Option  value="DONE">Done</Option>
          <Option  value="TODO">To Do</Option>

        </Select>
      </div>
    );
  };

 

  return (
    <div
      name="principleHolder"
      id={lesson.id}
      className="flex flex-col justify-between bg-second p-3 m-3 rounded-xl animate-fade-down animate-ease-in-out relative"
    >

      {/* loading for card */}
      {loading &&
      <div id="loadinComponent" className="absolute top-0 left-0 bg-gray-100 bg-opacity-20 z-10 w-full h-full flex items-center justify-center">
        <Loading/>
      </div>
      }

      <div id="topPart" className="flex flex-col">
        <div id="lessonTitle" className="flex items-center">
          <p className="my-3 text-3xl  line-clamp-2 w-full   font-bold">
            {lesson.name}
          </p>
          <EditPen />
        </div>
        <p id="description" className="my-3 line-clamp-5">
          {lesson.description}
        </p>
      </div>

      <div
        name="bottomPart"
        id="redirectButtonAndStatus"
        className="flex justify-between items-center px-4 mt-6"
      >
        <a
          href={lesson.gitHubLink}
          target="_blank"
          className="cursor-pointer my-2 xs:my-0 px-6 py-4 bg-fourth rounded-lg text-light-green-50 mr-4 shadow-sm shadow-fifth text-xl"
        >
          Learn
        </a>
        < EditStatusComponent />
      </div>
    </div>
  );
}
