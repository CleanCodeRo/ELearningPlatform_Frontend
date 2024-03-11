import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import Loading from "../Loading/Loading";
import { useAtom } from "jotai";
import state from "../Atom";

export default function ModuleCard({ id, title, subtitle, image, userRole }) {
  let moduleCard = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [completedModules, setCompletedModules] = useAtom(state.completedModules);

  const deleteModule = async (e) => {
    e.stopPropagation();
    setLoading(true);

    fetch(`http://localhost:8080/modules?moduleId=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
        },
      })
      .then(res => res.json())
      .then(data =>{
         console.log(data)
         moduleCard.current.remove()
        })
  };

  return (
    <div
      name="wholeCard"
      id={id}
      ref={moduleCard}
      className="animate-fade-left animate-ease-in-out flex flex-col relative cursor-pointer min-w-[18rem]  max-w-80  bg-white rounded-2xl mx-3 p-1 border-b-[3px] border-transparent  shadow-md hover:shadow-[#2c8dfe] duration-100"
      onClick={() => navigate(`module/${id}`)}
    >

    {/* loading for card */}
    {loading &&
      <div id="loadinComponent" className="absolute top-0 left-0 bg-gray-100 bg-opacity-20 z-10 w-full h-full flex items-center justify-center">
        <Loading/>
      </div>
      }


      <div
        id="image"
        className="h-40 w-full rounded-lg rounded-t-2xl bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div
        id="title"
        className=" bg-[#2c8dfe] w-fit p-2 rounded-xl my-0  top-0"
        style={{ margin: "-16px 0 0 7px" }}
      >
        {title}
      </div>


      {userRole == "ADMIN" ?
      <div
        id="deleteAndModify"
        className="absolute top-2 right-2 p-1 text-first bg-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,1)] rounded-xl duration-300 cursor-pointer "
      >
        <Menu>
          <MenuHandler>
            <i className="fa-solid fa-pen p-1"></i>
          </MenuHandler>
          <MenuList className=" bg-first bg-opacity-40 backdrop-blur-md border-0 text-[#afafaf] ">
            <MenuItem
              onClick={(e) => {
                deleteModule(e);
              }}
              className="bg-first bg-opacity-80 mb-1"
            >
              <i className="fa-solid fa-trash-can mr-1" /> Delete
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/editModule/${id}`);
              }}
              className="bg-first bg-opacity-80"
            >
              <i className="fa-solid fa-pen-to-square mr-1" /> Edit
            </MenuItem>
          </MenuList>
        </Menu>
      </div> : null }

      <div id="other info" className="flex flex-col p-2 text-[#afafaf]">
        <p id="subtitle" className="text-3xl line-clamp-1 ">
          {subtitle}
        </p>

        <div id="three details" className="flex py-2 justify-between">
          <div id="group Div For Flex" className="flex items-center">
            <div id="time" className="flex items-center mr-4 ">
              <i className="fa-solid fa-clock mr-1"></i>
              <p>1h 53min</p>
            </div>

            <div id="rating" className="flex items-center mr-4 ">
              <i className="fa-solid fa-star mr-1"></i>
              <p>4.3/5</p>
            </div>
          </div>

          <div
            id="price"
            className="flex text-sixth items-center bg-[#2c8dfe] py-3 px-6 rounded-3xl"
          >
            <p className="">{completedModules.includes(id) ? "Done" : "Todo"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
