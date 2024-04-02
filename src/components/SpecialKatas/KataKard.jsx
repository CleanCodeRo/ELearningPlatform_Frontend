
import {
    Tooltip,
} from "@material-tailwind/react";
import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import state from "../ReusableComponents/Atom";
import Loading from "../ReusableComponents/Loading/Loading";
import SuccessError from "../ReusableComponents/SuccessError";
import EditPen from "../ReusableComponents/EditPen";
import { useNavigate } from "react-router-dom";
import { startLink } from "../../constants/Constants";

export default function KataCard({ kata, deleteEvent, setRefreshKatas }) {
    const kataCardRef = useRef(null);
    const [user, setUser] = useAtom(state.user)
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const [renderError, setRenderError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setIsCompleted(kata.completedByUsers.includes(user.id) ? true : false)
    }, [isCompleted])

    const checkAndAddCompletedKata = (e, allCompletedKatas) => {
        let checkIfKataExists = allCompletedKatas.filter((codeKata) => codeKata.name != undefined && codeKata.name.toLowerCase() == kata.title.toLowerCase())

        if (checkIfKataExists.length > 0) {
            e.target.disabled = true;
            fetch(`${startLink}/katas/addUserToKata?userId=${user.id}&kataId=${kata.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`
                },
            })
                .then(res => res.json())
                .then(() => {
                    kata.completedByUsers.push(user.id)
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
    }

    const completeKataEvent = (e) => {
        setLoading(true)
        setRenderError(true)
        let numberOfCompletedKatasPages;
        let allCompletedKatas = []

        const searchInAllKataPages = (i) => {
            if (i == numberOfCompletedKatasPages) {
                return;
            }
            // "Blind4Basics"
            // user.codeWarsUsername
            fetch(`https://www.codewars.com/api/v1/users/${user.codeWarsUsername}/code-challenges/completed?page=${i}`, {
                method: "GET"
            }).then(res => res.json())
                .then(data => {
                     console.log(i, " / ", numberOfCompletedKatasPages)
                    allCompletedKatas = [...allCompletedKatas, ...data.data]
                    numberOfCompletedKatasPages = data.totalPages;

                    if (i + 1 == numberOfCompletedKatasPages) { // this means we got to the last page
                        checkAndAddCompletedKata(e, allCompletedKatas)
                        console.log("HERE IS THE LAST PAGE")
                    } else {
                        setTimeout(() => {
                            searchInAllKataPages(i + 1);
                        }, 100)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        }

        searchInAllKataPages(0);
    }

    function getFontSizeClass(categoryLength) {
        if (categoryLength <= 1) {
            return "text-sm";
        } else if (categoryLength > 1) {
            return "text-xs"; // Extra small font size
        }
    }

    const editEvent = (e, navigate, kataId) => {
        e.stopPropagation();
        navigate(
            `/dojo/editKata/${kataId}`
        );
    }

    let maxPoints = 48;
    return (
        <div id="cardHolder" className=" w-64 max-h-17 bg-[#eee0c3] flex flex-col items-center justify-between border-2 shadow-[#e6b57e] shadow-xl rounded-2xl relative bg-cover bg-center" ref={kataCardRef}
            style={{ backgroundImage: `url("/images/bgTextureJapanese.jpg")` }}
        >
            {loading &&
                <div id="loadingContainer" className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center border-2 rounded-2xl z-20">
                    <Loading />
                </div>
            }


            {/* i need this holderwithoutEndButtons to separate it from the button and apply a justify between so the buttons can be allways at the bottom of the card */}
            <div id="holderwithoutEndButtons" className="flex flex-col w-full items-center h-full">
                <div id="titleAndEditPen" className="text-[#0b0f1b] mt-2 relative w-full flex justify-center ">
                    <div id="penContainer" className="absolute w-full flex justify-end ">
                        <EditPen user={user} deleteEvent={(e) => deleteEvent(e, kata.id, setRefreshKatas)} editEvent={(e) => editEvent(e, navigate, kata.id)} />
                    </div>
                </div>

                <img id="KyuImage" className="w-[12rem] z-10 " src={`/kataIcons/kataIcons(${kata.level}).png`} style={{ margin: "-38px 0px -50px 0px" }}></img>

                <div id="Details" className="text-[#0b0f1b] flex flex-col w-11/12 pt-12 rounded-lg bg-[#e9b273] p-2 h-full backdrop-brightness-60 bg-opacity-[85%]">
                    <div name="spacingLine" className="w-full h-[2px] bg-[#f5d4b0] "></div>

                    <Tooltip className="bg-opacity-70 " content={kata.title}>
                        <p id="title" className="w-full text-center font-bold font-ninja text-[1.5rem] tracking-wider line-clamp-1 my-2 ">{kata.title}</p>
                    </Tooltip>

                    <div id="rightDetails" className=" rounded-xl text-2xl min-w-[6rem] flex justify-around my-1 font-ninja font-semibold">
                        <div className="flex flex-col items-center ">
                            <img className="w-[1.8rem]" src='/images/samurai.png' />
                            <p id="pointsPerCompetion" className="mt-0.5 tracking-widest" >+{(maxPoints - kata.level * 6) + 6}P</p>
                        </div>
                        <div className="flex flex-col items-center ">
                            <img className="w-[2rem]" src='/images/torii-gate.png' />
                            <p id="status" className="mt-0.5 tracking-widest">Kyu {kata.level}  </p>
                        </div>
                    </div>

                    <div name="spacingLine" className="w-full h-[2px] bg-[#f5d4b0]"></div>

                    <div id="leftDetails" className=" rounded-xl flex flex-wrap justify-center p-2 min-w-[8rem] my-1 gap-1 font-bold">
                        {kata.category?.map((category, index) => (
                            <p key={index} className={`py-1 px-2 bg-[#eee0c3] rounded-lg ${getFontSizeClass(kata.category.length)}`}>
                                {category}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            <div id="buttonsContainer" className="flex flex-row justify-evenly w-full my-3 font-bold">
                <button id="markedAsDone" className={`text-[#eba24f] bg-gray-200 rounded-xl w-2/5 p-2 left-0 ${!isCompleted ? "cursor-pointer" : "cursor-default"}`} onClick={!isCompleted ? completeKataEvent : null}>
                    {!isCompleted ? "Done" : "Completed"}
                </button>

                <a id="beginTraining" className="text-sixth bg-fifth rounded-lg h-fit p-2 w-24 text-center" href={kata.kataLink} target="_blank">
                    Train
                </a>
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

