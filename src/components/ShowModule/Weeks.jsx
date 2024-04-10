import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import WeekCard from "./WeekCard1";
import Loading from "../ReusableComponents/Loading/Loading";
import { startLink } from "../../constants/Constants";
import BreadCrumbs from "../ReusableComponents/BreadCrumbs/BreadCrumbs";
import { useAtom } from "jotai";
import state from "../ReusableComponents/Atom";

export default function Weeks({ setLoadingLessons, userRole, setModule }) {
  const [weeks, setWeeks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [[moduleNumber, moduleName], setModuleDetails] = useAtom(state.moduleNumberAndName)
  const params = useParams();
  const navigate = useNavigate();

  const moduleColors = [
    "bg-generalColors-medium-green",
    "bg-generalColors-medium-yellow",
    "bg-generalColors-light-blue",
    "bg-generalColors-medium-blue"
  ]

  useEffect(() => {
    fetch(`${startLink}/modules/${params.moduleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let dataWeeks = data.weeks.sort((a,b) => a.number - b.number)
        setModule(data)
        setModuleDetails([data.number, data.name])
        let dummyArr = []
        let i = 0;

        async function renderWeeks() {
          if (i == dataWeeks.length) {
            return;
          } else {
            dummyArr.push(dataWeeks[i])
            setWeeks([...dummyArr]);
            i++;
            setTimeout(() => renderWeeks(), 100)
          }
        }
        renderWeeks();
        setLoading(false)
      })
      .catch((err) => {
        navigate("/login");
      });
  }, []);

  return (
    <div className="pt-5 pb-10">
     
        {userRole == "ADMIN" ?
          <Link to={`/home/module/${params.moduleId}/createWeek`}>
            <button className="gap-3 rounded-full bg-fifth flex items-center justify-center text-xl mx-2 text-1xl sm:text-2xl px-16 py-1 font-bold border-2 text-generalColors-dark-blue bg-white">
              Add Week <i className="fa-solid fa-plus"></i>
            </button>
          </Link> : null}
      

      {loading ?
        <div id="loading" className="w-full h-[10rem] flex items-center justify-center">
          <Loading />
        </div>

        :

        <div id="listOfWeek" className="w-full flex flex-wrap items-center py-7 gap-[3rem] overflow-x-scroll custom-scrollbar" >
          {weeks && weeks.length > 0 ? (
            weeks.map((week, index) => (
              <WeekCard
                key={index}
                week={week}
                weekColor={moduleColors[moduleNumber-1]}
                setLoadingLessons={setLoadingLessons}
                userRole={userRole}
                moduleName={moduleName}
              />
            ))
          ) : (
            <div className="col-span-4 text-4xl text-center my-10 text-fourth">
              - Add a week -
            </div>
          )}
        </div>
      }
    </div>
  );
}
