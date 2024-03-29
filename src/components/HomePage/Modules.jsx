import React, { useEffect, useState } from "react";
import ModuleCard from "./ModuleCard";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function Modules({userRole}) {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

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
        let dummyArr = []
        let i = 0;

        async function renderModules(){
          if(i == data.length){
            return;
          }else{
            dummyArr.push(data[i])
            setModules([...dummyArr]);
            i++;
            setTimeout(() => renderModules(), 400)
          }
        }

        renderModules();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err)
        navigate("/login");
      });
    
  }, []);

  

  return (
    <div className="pt-5 pb-10" >
      <div id="titleAndAddButton" className="flex items-center ">
        <p className="text-3xl sm:text-4xl p-4  font-bold  rounded-lg text-fourth">
          Modules
        </p>

        {userRole == "ADMIN" ?
        <Link
          to="/createModule"
          className="h-10 w-10 rounded-full bg-fourth flex items-center justify-center text-xl mx-2 hover:bg-[#2c8dfe]"
        >
          <i className="fa-solid fa-plus"></i>
        </Link> : null }
      </div>

      {loading ?
        <div id="loading" className="w-full h-[10rem] flex items-center justify-center">
          <Loading />
        </div>

        :

        <div id="listOfModules" className="flex items-center py-7 overflow-x-scroll w-full custom-scrollbar">
           {modules != [] &&  modules.map((module, index) => {
            return <ModuleCard
            key={index}
            id={module.id}
            title={`Module ${module.number}`}
            subtitle={module.name}
            image={module.imgLink}
            userRole={userRole}
          />
            
          })}
         
        </div>
      }


    </div>
  );
}




// <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
// <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
// <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
// <ModuleCard key={1} id={2} title={"Module test"} subtitle={"Subtitle Test"} image={"https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/crash_test_dummy.png"}/>
