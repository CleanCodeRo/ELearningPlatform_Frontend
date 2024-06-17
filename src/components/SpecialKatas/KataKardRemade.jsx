
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

export default function KataCardRemade({ kata, deleteEvent, setRefreshKatas }) {
    const kataCardRef = useRef(null);
    const [user, setUser] = useAtom(state.user)
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [[message, messageColor], setMessage] = useState([null, null]);
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
                    setMessage(["Kata verification completed", "bg-green-500"]);
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            setLoading(false);
            if(!user.codeWarsUsername){
                setMessage(["Please complete codewars username in Profile", "bg-red-500"])
            }else{
                setMessage(["Kata not completed (or check the kataname and username)", "bg-red-500"])
            }
        }
    }

    const completeKataEvent = (e) => {
        setLoading(true)
        console.log(user.codeWarsUsername)
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

    let colors = [
        "bg-generalColors-medium-yellow",
        "bg-generalColors-light-gray",
        "bg-secondaryColors-medium-purple",
        "bg-secondaryColors-light-purple",
        "bg-generalColors-medium-blue",
        "bg-generalColors-light-blue",
        "bg-secondaryColors-regular-orange",
        "bg-secondaryColors-light-green"
    ];

    let maxPoints = 48;
    return (
        <div id="cardHolder" className=" w-64 mx-3 max-h-17 text-generalColors-dark-blue rounded-3xl" ref={kataCardRef}

        >
            {(loading) &&
                <div id="loadingContainer" className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center border-2 rounded-2xl z-20">
                    <Loading />
                </div>
            }

            <SuccessError setMessage={setMessage} message={message} color={messageColor} />

            <div id='card' className={` w-full h-80 ${colors[kata.level - 1]} rounded-3xl relative `}>
                <div id="penContainer" className="absolute w-full flex justify-end ">
                    <EditPen user={user} deleteEvent={(e) => deleteEvent(e, kata.id, setRefreshKatas)} editEvent={(e) => editEvent(e, navigate, kata.id)} />
                </div>
                {!isCompleted ?
                    <div id='locker' className=' w-[20%] h-[15%] bg-secondaryColors-light-orange rounded-se-3xl rounded-es-3xl flex justify-center items-center absolute bottom-0 left-0 z-10'>
                        <img draggable={false} src='/images/locker-closed.png' className=' w-[40%]' aria-label={`locker-${kata.id}`} ></img>
                    </div>
                    :
                    <div id='locker' className=' w-[20%] h-[15%] bg-secondaryColors-dark-green rounded-se-3xl rounded-es-3xl flex justify-center items-center absolute bottom-0 left-0 z-10'>
                        <img draggable={false} src='/images/done.png' className=' w-[40%]' aria-label={`done-${kata.id}`}></img>
                    </div>
                }
                
                <div id='titleAndButtonContainer' className='absolute w-full h-fit flex flex-col items-center justify-center  mt-16'>
                    <Tooltip className="bg-opacity-70 " content={kata.title}>
                        <p id='title' className='text-xl  font-bold text-center w-full px-5 line-clamp-1 '>{kata.title}</p>
                    </Tooltip>
                    <a href={kata.kataLink} target="_blank" id={`train-${kata.title}`} className=' w-fit px-5 h-8 text-white text-xl text-center justify-center items-center bg-generalColors-dark-blue rounded-2xl mt-3'>
                        {!isCompleted ? "Train" : "Train again"}
                    </a>
                </div>
                <div id='category' className='w-full h-1/2 rounded-3xl bg-white absolute bottom-0 border-2 border-generalColors-light-gray'>
                    <div id='categoryHolder' className='w-full px-4 mt-7 flex flex-wrap justify-evenly ' >


                        {kata.category?.map((category, index) => (
                            <p key={index} className={`w-fit mt-2 px-4 rounded-xl  bg-gray-300 ${getFontSizeClass(kata.category.length)}`}>
                                {category}
                            </p>
                        ))}
                    </div>

                </div>
                <div id='xp' className=' w-[30%] h-[15%] bg-generalColors-dark-blue text-white rounded-ss-3xl rounded-ee-3xl flex justify-center items-center absolute top-0 left-0 '>
                    + {(maxPoints - kata.level * 6) + 6}xp
                </div>
                {/* <div id='kyu' className={` w-[30%] h-[15%] ${colors[kata.level - 1]} text-white rounded-ss-3xl rounded-ee-3xl flex justify-center items-center absolute bottom-0 right-0 z-20`}>
                    {kata.level} kyu
                </div> */}
                <div id="completedHolder" className="w-full flex justify-center items-center absolute bottom-0 h-30">

                <button
                  id={`markedAsDone-${kata.title}`} 
                  className={`text-generalColors-dark-blue bg-gray-200 rounded-b-3xl w-full p-2 left-0  ${!isCompleted ? "cursor-pointer" : "cursor-default"}`} 
                  onClick={!isCompleted ? completeKataEvent : null}
                  >  
                    {!isCompleted ? "Submit" : "Completed"}
                </button>
                </div>

            </div>
           
        </div>
    );

}


{/* <img src="https://img.freepik.com/premium-photo/surprising-luxurious-background-design-with-golden-lotus-lotus-flowers-line-art-design-wallpaper-generative-ai_779468-4131.jpg" /> */ }

