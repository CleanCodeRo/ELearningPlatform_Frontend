import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import WeekCard from "./WeekCard";
import Loading from "../Loading/Loading";

export default function Weeks({setLoadingLessons, userRole}) {
  const [weeks, setWeeks] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/weeks/${params.moduleId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        let dummyArr = []
        let i = 0;

        async function renderWeeks(){
          if(i == data.length){
            return;
          }else{
            dummyArr.push(data[i])
            setWeeks([...dummyArr]);
            i++;
            setTimeout(() => renderWeeks(), 400)
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
    <div className="pt-5 pb-10 px-5  ">
      <div id="titleAndAddButton" className="flex items-center ">
        <p className="text-4xl p-4  font-bold border-2 rounded-xl text-fourth">
          WEEKS
        </p>

        {userRole == "ADMIN" ? 
        <Link to={`/home/module/${params.moduleId}/createWeek`}>
          <button className="h-10 w-10 rounded-full bg-fifth flex items-center justify-center text-xl mx-2">
            <i className="fa-solid fa-plus"></i>
          </button>
        </Link> : null }
      </div>

      {loading ?
        <div id="loading" className="w-full h-[10rem] flex items-center justify-center">
          <Loading />
        </div>

        :

        <div id="listOfWeek" className="flex items-center py-7  overflow-x-scroll custom-scrollbar" >
          {weeks && weeks.length > 0 ? (
            weeks.map((week, index) => (
              <WeekCard
                key={index}
                id={week.id}
                title={`Week ${week.number}`}
                subtitle={week.name}
                image={week.imgLink}
                setLoadingLessons={setLoadingLessons}
                userRole={userRole}
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
