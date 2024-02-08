import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import WeekCard from "./WeekCard";

export default function Weeks() {
  const [weeks, setWeeks] = useState(null);
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
        setWeeks(data);
      })
      .catch((err) => {
        console.error("Error fetching weeks:", err);
        navigate("/login");
      });
  }, []);

  return (
    <div className="pt-5 pb-10 px-5  ">
      <div id="titleAndAddButton" className="flex items-center ">
        <p className="text-4xl p-4  font-bold border-2 rounded-xl text-fourth">
          WEEKS
        </p>
        <Link to={`/home/module/${params.moduleId}/createWeek`}>
          <button className="h-10 w-10 rounded-full bg-fifth flex items-center justify-center text-xl mx-2">
            <i className="fa-solid fa-plus"></i>
          </button>
        </Link>
      </div>
    
      <div className="flex items-center py-7  overflow-x-scroll custom-scrollbar" >
        {weeks && weeks.length > 0 ? (
          weeks.map((week, index) => (
            <WeekCard
              key={index}
              id={week.id}
              title={`Week ${week.number}`}
              subtitle={week.name}
              image={week.imgLink}
            />
          ))
        ) : (
          <div className="col-span-4 text-4xl text-center my-10">
            - Add a week -
          </div>
        )}
      </div>
    </div>
  );
}
