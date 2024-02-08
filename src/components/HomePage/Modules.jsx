import { useEffect, useState } from "react";
import ModuleCard from "./ModuleCard";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Modules() {
  const [modules, setModules] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/modules", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setModules(data);
      })
      .catch((err) => {
        console.error("Error fetching modules:", err);
        navigate("/login");
      });
  }, []);

  return (
    <div className="p-5" >
      <div id="titleAndAddButton" className="flex items-center">
        <h1 className="4xs:text-2xl mx-5 text-quaternary font-semibold">
          Modules
        </h1>
        <Link
          to="/createModule"
          className="h-10 w-10 rounded-full bg-gray-500 flex items-center justify-center text-xl mx-2 hover:bg-accent"
        >
          <i className="fa-solid fa-plus text-white hover:text-black text-center"></i>
        </Link>
      </div>

      <div className="flex py-7 overflow-x-scroll w-[95%] custom-scrollbar">
      {modules?.map((module, index) => (
          <ModuleCard
            key={index}
            id={module.id}
            title={`Module ${module.number}`}
            subtitle={module.name}
            image={module.imgLink}
          />
        ))} 
      
        
      </div>
    </div>
  );
}


  

        // <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
        // <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
        // <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
        // <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
