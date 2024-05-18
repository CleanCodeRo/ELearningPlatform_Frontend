import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react'
import state from '../components/ReusableComponents/Atom';
import { startLink } from '../constants/Constants';
import SideHeader from '../components/SideHeader';
import CostumInput from '../components/ReusableComponents/CostumInput';
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Spinner,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';
import Loading from '../components/ReusableComponents/Loading/Loading';
import SuccessError from '../components/ReusableComponents/SuccessError';

export default function Permisions() {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [addUserLoading, setAddUserLoading] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = React.useState(1);
    const searchRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const pwdRef = useRef(null);
    const navigate = useNavigate()
    let savedSeconds = new Date().getSeconds();
    const [[message, messageColor], setMessage] = useState([null, null])

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    useEffect(() => {
        console.log(searchRef.current.getBoundingClientRect().top)
        fetch(`${startLink}/modules`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)

                setModules(data)
                setLoading(false);
            })
            .catch((err) => {
                console.log(err)
                navigate("/login");
            });
    }, []);

    const searchUsersEvent = () => {
        var currentTime = new Date();

        if (Math.abs(currentTime.getSeconds() - savedSeconds) > 0.5) {
            savedSeconds = currentTime.getSeconds()

            fetch(`${startLink}/users/${searchRef.current.value}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
                },
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setSearchedUsers(data)
                })
                .catch(err => {
                    console.log(err);
                    setSearchedUsers([])
                });
        }
    }

    const selectUserEvent = (e) => {
        console.log(e.target.id.split("_")[0])
        setSelectedUser(searchedUsers[e.target.id.split("_")[0]])
        setSearchedUsers([])
        searchRef.current.value = ""
    }

    const modifyAccessWeek = (e) => {
        if (!selectedUser) {
            setMessage(["Please select a user first", "bg-red-500"]);
            return
        }

        setLoading(true);
        fetch(`${startLink}/weeks/permissions?weekId=${e.target.id}&userId=${selectedUser.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
            }
        })
            .then(res => res.json())
            .then(data => {
                setLoading(false);
                let updatedModules = modules.map(module => {
                    return {
                        ...module,
                        weeks: module.weeks.map(week => {
                            return week.id == e.target.id ? data : week
                        })
                    }
                })

                setModules([...updatedModules]);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setMessage(["Something went wrong", "bg-red-500"]);
            })
    }

    const registerAccount = () => {
        setAddUserLoading(true)
        const data = {
            firstName: nameRef.current.value,
            email: emailRef.current.value,
            password: pwdRef.current.value
        };

        fetch(`${startLink}/users/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then((data) => {
                if (data.response == "Email already exists!") {
                    setMessage(["User already exist", "bg-red-500"]);
                } else {
                    setMessage(["Saved User", "bg-green-500"]);
                }
                setAddUserLoading(false)
            })
            .catch(error => {
                console.error('Error:', error);
                setMessage(["Something went wrong", "bg-red-500"]);
                setAddUserLoading(false)
            });
    };




    return (
        <div className="h-screen flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar bg-white" >
            <SideHeader />
            <SuccessError setMessage={setMessage} message={message} color={messageColor} />

            <div id='permisionContainer' className=" relative flex flex-col px-7 text-generalColors-dark-blue" style={{ minWidth: "calc(100vw - 5rem)", maxWidth: "100%" }}>
                <p className="text-3xl sm:text-4xl p-4  font-bold  rounded-lg text-fourth">
                    Permissions & Admin Pannel
                </p>
                <div id="registerAccount" className="relative flex items-center mb-6 w-fit">
                    <img alt="user" className="w-16 mr-3" src="/SVGs/user.svg" />
                    <CostumInput
                        id={"nameRef"}
                        label={"Name"}
                        inputRef={nameRef}
                        costumInputClass=" mr-3"
                        color="gray"

                    />
                    <CostumInput
                        id={"emailRef"}
                        label={"Email"}
                        inputRef={emailRef}
                        costumInputClass="mr-3"
                        color="gray"

                    />
                    <CostumInput
                        id={"pwdRef"}
                        label={"Password"}
                        inputRef={pwdRef}
                        costumInputClass="mr-3"
                        color="gray"

                    />
                    
                    <div className='flex items-center justify-center'>
                    <button
                        className=' mx-5 border-[1px] p-3 rounded-xl text-generalColors-white bg-generalColors-dark-blue flex items-center justify-center
                    hover:text-generalColors-medium-blue 
                    hover:bg-generalColors-white animate-ease-linear-3'
                        onClick={registerAccount}
                    >
                        Create
                      
                    </button>
                    {addUserLoading &&  <Spinner  className='absolute w-full h-full '/>}
                    </div>
                </div>

                <div id="SearchContainer" className="relative flex items-center mb-6 w-fit">
                    <img alt="user" className="w-4 mr-3" src="/SVGs/user.svg" />
                    <CostumInput
                        id={"searchRef"}
                        label={"Search User"}
                        inputRef={searchRef}
                        costumInputClass=""
                        color="gray"
                        onChange={searchUsersEvent}
                    />


                </div>

                {searchedUsers.length != 0 &&
                    <div id="result users"
                        className={`absolute h-fit w-fit rounded-sm bg-white z-10 cursor-pointer`}
                        style={{ top: `${searchRef.current.getBoundingClientRect().top + 50}px`, boxShadow: "1px 0px 5px 3px #BEBCBF", clipPath: "inset(-5px -10px -10px -10px)" }}>
                        {searchedUsers.map((user, index) =>
                            <div key={index} onClick={selectUserEvent} id={index + "_" + user.firstName} className='p-1.5'>{user.firstName} {user.lastName} ({user.email})</div>
                        )}
                    </div>
                }

                <div>
                    Selected User : {selectedUser?.firstName} {selectedUser?.lastName} ({selectedUser?.email})
                </div>



                <div id="modulesHolder" className='relative'>
                    {loading &&
                        <div id="loading" className="w-full h-full z-20 bg-black bg-opacity-50 flex items-center justify-center absolute">
                            <Loading />
                        </div>
                    }

                    {modules && modules.map((module, index) =>
                        <Accordion key={index} open={open === index}>
                            <AccordionHeader className='text-generalColors-dark-blue' onClick={() => handleOpen(index)}>
                                {module.name}
                            </AccordionHeader>
                            <AccordionBody>


                                {module.weeks?.map((week, index) =>
                                    <div key={index} className='flex flex-row items-center justify-between  py-3 text-xl bg-white text-generalColors-dark-blue border-b border-generalColors-light-gray p-3 cursor-pointer'>
                                        <p>Week {week.number}  </p>

                                        <div className='flex items-center relative'>
                                            <p>{week.usersWithAccessWeek.includes(selectedUser?.id) ? "Unlocked" : "Locked"}</p>
                                            <img onClick={modifyAccessWeek}
                                                id={week.id}
                                                className={` rounded-lg z-10 mx-3 p-2.5 ${week.usersWithAccessWeek.includes(selectedUser?.id) ? "bg-green-500" : "bg-red-500"}`}
                                                src={`${week.usersWithAccessWeek.includes(selectedUser?.id) ? "/SVGs/statusSVGs/open.svg" : "/SVGs/statusSVGs/closed.svg"} `}
                                            />
                                        </div>


                                    </div>)}
                            </AccordionBody>
                        </Accordion>)}
                </div>

            </div>

        </div>
    )
}
