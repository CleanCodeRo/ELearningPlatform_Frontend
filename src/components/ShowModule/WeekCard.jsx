import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useAtom } from "jotai";
import state, { returnPercentage } from "../Atom";


export default function WeekCard({ week, setLoadingLessons, userRole }) {
  const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks)
  const [completedLessons, setCompletedLessons] = useAtom(state.completedLessons)
  let weekCard = useRef(null);
  const navigate = useNavigate();
  const params = useParams();


  const  [progresBarLength, setProgresBarLength] = useState( null )
  const [refreshWeekProgressBar, setRefreshWeekProgressBar] = useAtom(state.refreshWeekProgressBar);
 
   
  useEffect(() =>{
   if(  !progresBarLength ) {
    setProgresBarLength( returnPercentage(week.lessons, completedLessons) );
   } else if (params.weekId == week.id ){
    setProgresBarLength( returnPercentage(week.lessons, completedLessons) );
   }
  },[refreshWeekProgressBar])
  

  const deleteWeek = async (e) => {
    e.stopPropagation();
    try {
      await fetch(`http://localhost:8080/weeks?weekId=${week.id}`, {
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

      {userRole == "ADMIN" ?
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
                onClick={(e) => {
                  deleteWeek(e);
                }}
                className="bg-first bg-opacity-80 mb-1"
              >
                <i className="fa-solid fa-trash-can mr-1" /> Delete
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  {
                    e.stopPropagation();
                    navigate(`/home/module/${params.moduleId}/editWeek/${week.id}`);
                  }
                }}
                className="bg-first bg-opacity-80"
              >
                <i className="fa-solid fa-pen-to-square mr-1" /> Edit
              </MenuItem>
            </MenuList>
          </Menu>
        </div> : null}

      <div id="other info" className="flex flex-col p-2">
        <p id="subtitle" className="text-3xl line-clamp-1">
          {week.name}
        </p>

        <div id="three details" className="flex py-2 justify-between">
          {/* <div id="group Div For Flex" className="flex items-center">
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
            <p className="">{completedWeeks.includes(week.id) ? "Done" : "Todo"}</p>
          </div> */}

          <div className="flex items-center bg-third justify-center h-10 w-full  rounded-lg relative">
            <p className="text-sixth text-center  rounded-lg   text-lg font-bold z-10">{completedWeeks.includes(week.id) ? "Done" : "Todo"}</p>
            <div className={`absolute bg-fifth h-full rounded-lg left-0 top-0 transition-all duration-[1s] ease-out `} style={{width : `${progresBarLength}%`}}></div>
          </div>

      
        </div>
      </div>
    </div>
  );
}
