import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";
import { useAtom } from "jotai";
import state from "../Atom";

export default function LessonCard({ id, name, description, gitHubLink, userRole }) {
  const [user, setUser] = useAtom(state.user);
  const lessonCard = useRef(null);
  const navigate = useNavigate();
  const params = useParams();

  const deleteLesson = async (e) => {
    e.stopPropagation();
    try {
      await fetch(`http://localhost:8080/lessons?lessonId=${id}`, {
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
                  `/home/module/${params.moduleId}/week/${params.weekId}/editLesson/${id}`
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
    const [value, setValue] = useState(user.completedLessons.includes(id) ? "DONE" : "TODO");
    return (
      <div id="holder" className="">
        <Select
          size="md"
          color="blue"
          id="select"
          label="Select Status"
          value={value}
          onChange={(status) => EditStatusEvent(status)}
          className="text-sixth  "
        >
          <Option  value="DONE">Done</Option>
          <Option  value="TODO">To Do</Option>

        </Select>
      </div>
    );
  };

  const EditStatusEvent = (status) =>{
    if(status == "DONE"){
      user.completedLessons.push(id)
    }else{
      user.completedLessons =  user.completedLessons.filter(item => item != id);
    }

    fetch(` http://localhost:8080/users/${user.id}/addOrRemoveLesson/${id}`,{
      method : "PATCH",
      headers :{
        "Content-Type" : "application/json",
        Authorization : `Bearer ${localStorage.getItem("ELearningToken")}`
      },
      body : JSON.stringify(status)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setValue(status);
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div
      name="principleHolder"
      id={id}
      ref={lessonCard}
      className="flex flex-col justify-between bg-second p-3 m-3 rounded-xl animate-fade-down animate-ease-in-out"
    >
      <div id="topPart" className="flex flex-col">
        <div id="lessonTitle" className="flex items-center">
          <p className="my-3 text-3xl  line-clamp-2 w-full   font-bold">
            {name}
          </p>
          <EditPen />
        </div>
        <p id="description" className="my-3 line-clamp-5">
          {description}
        </p>
      </div>

      <div
        name="bottomPart"
        id="redirectButtonAndStatus"
        className="flex justify-between items-center px-4 mt-6"
      >
        <a
          href={gitHubLink}
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
