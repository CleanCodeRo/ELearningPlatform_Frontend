import { Navigate } from "react-router";
import Stars from "./Stars";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useRef, useState } from "react";
import { useAtom } from "jotai";
import state, { getCompletedStuff } from "../../Atom";
import Loading from "../../Loading/Loading";

export default function NewKataCard({ kata }) {
  const kataCardRef = useRef(null);
  const [completedLessons, setCompletedLessons] = useAtom(state.completedLessons);
  const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks);
  const [completedModules, setCompletedModules] = useAtom(state.completedModules);
  const [completedKatas, setCompletedKatas] = useAtom(state.completedKatas)
  const [user, setUser] = useAtom(state.user)
  const [isCompleted, setIsCompleted] = useState(completedKatas.includes(kata.id) ? true : false);
  const [loading, setLoading] = useState(false);

  // let isCompleted = true;




  const completeKataEvent = (e) => {
    e.target.disabled = true;
    setLoading(true)
    fetch(` http://localhost:8080/users/addCompleteKata?userId=${user.id}&kataId=${kata.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`
      },

    })
      .then(res => res.json())
      .then(data => {
        getCompletedStuff(user.id, setCompletedLessons, setCompletedWeeks, setCompletedModules, setCompletedKatas)
        //console.log(data);
        setIsCompleted(true);
        setLoading(false);

      })
      .catch(err => {
        console.log(err)
      })

  }

  const deleteKata = (e) => {
    e.stopPropagation();


    fetch(`http://localhost:8080/katas/${kata.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },

    }).then(res => res.json())
      .then(data => {
        kataCardRef.current.remove();
      })

  };


  const EditPen = () => {
    return (
      user && user.role == "ADMIN" ?
        <Menu>
          <MenuHandler>
            <i className="fa-solid fa-pen p-2 text-first bg-[rgba(167,166,166,0.7)] hover:bg-[rgba(255,255,255,1)] rounded-xl duration-300 cursor-pointer mx-1 " ></i>
          </MenuHandler>
          <MenuList className=" bg-first bg-opacity-40 backdrop-blur-md border-0 text-sixth ">
            <MenuItem
              onClick={deleteKata}
              className="bg-first bg-opacity-80 mb-1"
            >
              <i className="fa-solid fa-trash-can mr-1" /> Delete
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                Navigate(
                  `/home`
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

  let maxPoints = 48;
  return (
    <div id="cardHolder" className=" w-64 h-fit bg-[#fceeca] flex flex-col items-center border-2 border-[#aa6b48] rounded-2xl relative " ref={kataCardRef} >
     {loading && 
      <div id="loadingContainer" className="absolute w-full h-full bg-black bg-opacity-70  items-center justify-center flex  border-2 rounded-2xl">
      <Loading /> 
      </div>
      }
      <p id="title" className="text-[#0b0f1b] mt-2 font-ninja">{kata.title}</p>
      <div id="theme" className="w-48 h-32 mt-2 rounded-xl flex items-center justify-center  border-2 shadow-md border-[#aa6b48]" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/surprising-luxurious-background-design-with-golden-lotus-lotus-flowers-line-art-design-wallpaper-generative-ai_779468-4131.jpg')`, backgroundPosition: 'center' }}></div>
      <p className="text-[#0b0f1b] text-start relative flex items my-2">Training details</p>

      <div id="Details" className="text-[#0b0f1b] flex !flex-row">
        <div id="leftDetails" className="mr-1 border-2 rounded-xl border-[#aa6b48] min-w-32">
          {kata.category?.map((category, index) => (
            <p id="tags" key={index} className="ml-1">{category}</p>
          ))}
        </div>

        <div id="rightDetails" className=" border-2 rounded-xl border-[#aa6b48] min-w-24">
          <p id="pointsPerCompetion" className="ml-1 mt-1">Kyu: {kata.level}</p>
          <p id="status" className="ml-1">Status</p>
        </div>
      </div>

      <div id="buttonsContainer" className="flex flex-row justify-evenly w-full mt-4 mb-4">

        {!isCompleted ?
          (<button id="markedAsDone" className="text-[#0b0f1b] border border-[#aa6b48] rounded-full w-2/5 font-ninja left-0"
            onClick={completeKataEvent}
          >Done</button>) :
          (
            <button id="markedAsDone" className="text-[#0b0f1b] border border-[#aa6b48] rounded-full w-2/5 font-ninja left-0 cursor-default"
            >Completed</button>
          )}

        <a id="beginTraining" className="text-[#0b0f1b]  border border-[#aa6b48] rounded-full w-24 font-ninja flex items-center justify-center" href={kata.kataLink} target="_blank">Train</a>
        <EditPen />
      </div>

    </div>
  );

}


{/* <img src="https://img.freepik.com/premium-photo/surprising-luxurious-background-design-with-golden-lotus-lotus-flowers-line-art-design-wallpaper-generative-ai_779468-4131.jpg" /> */ }