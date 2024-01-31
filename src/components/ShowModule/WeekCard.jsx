import React, { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";

export default function WeekCard({ id, title, subtitle, image }) {
  let weekCard = useRef(null);
  const navigate = useNavigate();
  const params = useParams()
   

  const deleteWeek = () => {
    fetch(`http://localhost:8080/weeks?weekId=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
    }).then(() => {
        weekCard.current.remove();
    });
  };

  return (
    <div
      name="wholeCard"
      id={id}
      ref={weekCard}
      onClick={() => navigate(`/home/module/${params.moduleId}/week/${id}`)}
      className="flex flex-col relative cursor-pointer min-w-40  max-w-80  bg-fifth rounded-2xl mx-3 p-1 border-b-[3px] border-transparent hover:border-light-blue-200 shadow-xl hover:shadow-light-blue-100 duration-100"
    >
      <div
        id="image"
        className="h-32 w-full rounded-lg rounded-t-2xl bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div
        id="title"
        className=" bg-first w-fit p-2 rounded-xl my-0  top-0"
        style={{ margin: "-16px 0 0 7px" }}
      >
        {title}
      </div>

      <div
        id="deleteAndModify"
        className="absolute top-2 right-2 p-1 text-first bg-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,1)] rounded-xl duration-300 cursor-pointer "
      >
        <Menu>
          <MenuHandler>
            <i className="fa-solid fa-pen p-1"></i>
          </MenuHandler>
          <MenuList className=" bg-first bg-opacity-40 backdrop-blur-md border-0 text-sixth ">
            <MenuItem
              onClick={() => deleteWeek()}
              className="bg-first bg-opacity-80 mb-1"
            >
              <i className="fa-solid fa-trash-can mr-1" /> Delete
            </MenuItem>
            <MenuItem
              onClick={(event) =>{event.stopPropagation(); navigate(`/home/module/${params.moduleId}/editWeek/${id}`)}}
              className="bg-first bg-opacity-80"
            >
              <i className="fa-solid fa-pen-to-square mr-1" /> Edit
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      <div id="other info" className="flex flex-col p-2">
        <p id="subtitle" className="text-3xl line-clamp-1">
          {subtitle}
        </p>

        <div id="three details" className="flex py-2 justify-between">
          <div id="group Div For Flex" className="flex items-center">
            <div id="time" className="flex items-center mr-4">
              <i className="fa-solid fa-clock mr-1"></i>
              <p>1h 53min</p>
            </div>

            <div id="rating" className="flex items-center mr-4">
              <i className="fa-solid fa-star mr-1"></i>
              <p>4.3/5</p>
            </div>
          </div>

          <div
            id="price"
            className="flex items-center bg-black py-3 px-6 rounded-3xl"
          >
            <i className="fa-solid fa-dollar-sign "></i>
            <p className="">18</p>
          </div>
        </div>
      </div>
    </div>
  );
}

