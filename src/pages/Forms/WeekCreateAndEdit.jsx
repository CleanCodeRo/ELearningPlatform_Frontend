import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import state, { getCompletedStuff } from "../../components/ReusableComponents/Atom";
import { startLink } from "../../constants/Constants";

export default function WeekCreateAndEdit() {
  let weekName = useRef(null);
  let weekNumber = useRef(null);
  let imageLink = useRef(null);
  let navigate = useNavigate();

  const [error, setError] = useState(null);
  const [completedLessons, setCompletedLessons] = useAtom(state.completedLessons);
  const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks);
  const [completedModules, setCompletedModules] = useAtom(state.completedModules);
  const [user, setUser] = useAtom(state.user);

  const [weekById, setWeekById] = useState({
    name: "",
    number: "",
    imgLink: "",
  });

  const params = useParams();

  useEffect(() => {
    if (params.weekId !== undefined) {
      fetch(`${startLink}/weeks?weekId=${params.weekId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setWeekById(data);
        })
        .catch(() =>{
          navigate("/login")
         })
    }
  }, [params.weekId]);

  const editWeek = () => {
    if( imageLink.current.value.length > 5000){
      setError("Can't put links larger than 5k chars");
      return
    }

    fetch(`${startLink}/weeks/${params.weekId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
      body: JSON.stringify({
        name: weekName.current.value,
        number: weekNumber.current.value,
        imgLink: imageLink.current.value,
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`Failed to update week: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        window.history.back()
      })
      .catch(() =>{
        navigate("/login")
       })
  };

  const saveWeek = () => {
    if (
      weekName.current.value === "" ||
      weekNumber.current.value === "" ||
      imageLink.current.value === ""
    ) {
      setError("Please fill in the required fields");
      return;
    } else  if( imageLink.current.value.length > 5000){
      setError("Can't put links larger than 5k chars");
      return
    }

    fetch(`${startLink}/weeks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
      body: JSON.stringify({
        name: weekName.current.value,
        number: weekNumber.current.value,
        imgLink: imageLink.current.value,
        module:{
            id: params.moduleId
        }
      }),
    })
      .then((res) => res.json())
      .then(() => {
        let userId = user.id;
        getCompletedStuff({userId, setCompletedLessons,setCompletedWeeks, setCompletedModules})
        window.history.back()
      })
      .catch(() =>{
        navigate("/login")
       })
  };

  return (
    <div className="flex justify-center items-center p-2 w-screen h-screen font-inter">
      <div className="relative flex w-96 h-fit flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <img src="/images/CleanCode-removebg-preview.png" />
        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
          <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            {params.weekId !== undefined ? "Edit your Week" : "Create new Week"}{" "}
          </h3>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              ref={weekName}
              defaultValue={weekById.name}
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Week Name
            </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              ref={weekNumber}
              defaultValue={weekById.number}
              type="number"
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Week Number
            </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              ref={imageLink}
              defaultValue={weekById.imgLink}
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              ImageLink
            </label>
          </div>
        </div>
        {error && (
          <div className="text-red-500 flex justify-center font-inter">
            {error}
          </div>
        )}
        <div className="font-semibold flex items-center justify-center pt-3 pb-5">
          <button
            onClick={params.weekId !== undefined ? editWeek : saveWeek}
            className=" my-2 xs:my-0 px-8 py-5 bg-fifth rounded-lg text-sixth mr-4 shadow-md shadow-fourth"
          >
            {params.weekId !== undefined ? "Save" : "Create"}
          </button>
         
            <button onClick={() => window.history.back()} className=" my-2 xs:my-0 px-8 py-5 bg-sixth rounded-lg text-fifth mr-4 shadow-md shadow-fourth">
              Cancel
            </button>
          
        </div>
      </div>
    </div>
  );
}
