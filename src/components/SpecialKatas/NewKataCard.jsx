import { Navigate, useNavigate } from "react-router";
import Stars from "./Stars";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import state from "../Atom";
import Loading from "../Loading/Loading";
import SuccessError from "../SuccessError";

export default function NewKataCard({ kata, deleteEvent }) {
  const kataCardRef = useRef(null);
  const [completedKatas, setCompletedKatas] = useAtom(state.completedKatas)
  const [user, setUser] = useAtom(state.user)
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [renderError, setRenderError] = useState(false)

  useEffect(() => {
    setIsCompleted(completedKatas.includes(kata.id) ? true : false)
  }, [completedKatas])

  const completeKataEvent = (e) => {
    setLoading(true)
    setRenderError(true)

    fetch(`https://www.codewars.com/api/v1/users/${user.codeWarsUsername}/code-challenges/completed?page=0`, {
      method: "GET"
    }).then(res => res.json())
      .then(data => {
        let checkIfKataExists = data.data.filter(codeKata => codeKata.name.toLowerCase() == kata.title.toLowerCase());

        if (checkIfKataExists.length > 0) {
          e.target.disabled = true;
          fetch(` http://localhost:8080/users/addCompleteKata?userId=${user.id}&kataId=${kata.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`
            },
          })
            .then(res => res.json())
            .then(() => {
              setCompletedKatas([...completedKatas, kata.id])
              setIsCompleted(true);
              setLoading(false);
              setMessage("Kata verification completed");
              setTimeout(() => {
                setRenderError(false)
              }, 3000)

            })
            .catch(err => {
              console.log(err)
            })
        } else {
          setLoading(false);
          setError("Kata name not perfectly equal ?")
          setTimeout(() => {
            setRenderError(false)
          }, 3000)
        }

      })
      .catch(err => {
        console.log(err)
      })
  }

  const EditPen = () => {
    return (
      user && user.role == "ADMIN" ?
        <Menu>
          <MenuHandler>
            <i className="fa-solid fa-pen p-2 text-first bg-[rgba(167,166,166,0.7)] hover:bg-[rgba(255,255,255,1)] rounded-xl duration-300 cursor-pointer mx-1 " ></i>
          </MenuHandler>
          <MenuList className=" bg-first bg-opacity-40 backdrop-blur-md border-0 text-sixth ">
            <MenuItem
              onClick={(e) => deleteEvent(e, kata.id)}
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

  function getFontSizeClass(categoryLength) {
    if (categoryLength <= 3) {
      return "text-sm";
    } else if (categoryLength > 3) {
      return "text-xs"; // Extra small font size
    } else {
      return "text-xxs"; // Very small font size (adjust as needed)
    }
  }

  let maxPoints = 48;
  return (
    <div id="cardHolder" className="w-64 max-h-17 bg-[#fceeca] flex flex-col items-center border-2 border-[#aa6b48] rounded-2xl relative" ref={kataCardRef}>
      {loading &&
        <div id="loadingContainer" className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center border-2 rounded-2xl">
          <Loading />
        </div>
      }
      <p id="title" className="text-[#0b0f1b] mt-2 font-ninja">{kata.title}</p>
      <div id="theme" className="w-48 h-32 mt-2 rounded-xl flex items-center justify-center border-2 shadow-md border-[#aa6b48]" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/surprising-luxurious-background-design-with-golden-lotus-lotus-flowers-line-art-design-wallpaper-generative-ai_779468-4131.jpg')`, backgroundPosition: 'center' }}></div>
      <p className="text-[#0b0f1b] text-start mt-2 font-bold">Training details</p>

      <div id="Details" className="text-[#0b0f1b] flex flex-row mt-2">
        <div id="leftDetails" className="mr-2 border-2 rounded-xl border-[#aa6b48] min-w-[8rem]">
          {kata.category?.map((category, index) => (
            <p key={index} className={`ml-1 ${getFontSizeClass(kata.category.length)}`}>
              {category}
            </p>
          ))}
        </div>

        <div id="rightDetails" className="border-2 rounded-xl border-[#aa6b48] min-w-[6rem]">
          <p id="pointsPerCompetion" className="ml-1 mt-1">RP: +{(maxPoints - kata.level * 6) + 6}</p>
          <p id="status" className="ml-1">Status</p>
        </div>
      </div>

      <div id="buttonsContainer" className="flex flex-row justify-evenly w-full mt-6 mb-2">
        {!isCompleted ?
          (
            <button id="markedAsDone" className="text-[#0b0f1b] border border-[#aa6b48] rounded-full w-2/5 font-ninja left-0" onClick={completeKataEvent}>
              Done
            </button>
          ) :
          (
            <button id="markedAsDone" className="text-[#0b0f1b] border border-[#aa6b48] rounded-full w-2/5 font-ninja left-0 cursor-default">
              Completed
            </button>
          )
        }
        <a id="beginTraining" className="text-[#0b0f1b] border border-[#aa6b48] rounded-full w-24 font-ninja flex items-center justify-center" href={kata.kataLink} target="_blank">
          Train
        </a>
        <EditPen />
      </div>
      {renderError &&
        <div>
          <SuccessError success={message} error={error} />
        </div>
      }
    </div>

  );

}


{/* <img src="https://img.freepik.com/premium-photo/surprising-luxurious-background-design-with-golden-lotus-lotus-flowers-line-art-design-wallpaper-generative-ai_779468-4131.jpg" /> */ }

