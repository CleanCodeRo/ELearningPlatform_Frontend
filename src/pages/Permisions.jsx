import React, { useEffect, useRef, useState } from 'react'
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
import { Helmet } from 'react-helmet';
import CostumCheckBox1 from '../components/ReusableComponents/CheckBox/CostumCheckBox1';

export default function Permisions() {
    const [modules, setModules] = useState([]);
    const [users, setUsers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [addUserLoading, setAddUserLoading] = useState(false);
    const [searchedUsers, setSearchedUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null);
    const [open, setOpen] = React.useState(1);
    const searchRef = useRef(null);
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const pwdRef = useRef(null);
    const isAdminRef = useRef(null);
    const navigate = useNavigate()
    let savedSeconds = new Date().getSeconds();
    const [[message, messageColor], setMessage] = useState([null, null])

    const handleOpen = (value) => setOpen(open === value ? 0 : value);

    useEffect(() => {
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

        //temporaty using this endpoint
        fetch(`${startLink}/users/leaderboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`
            },
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
            })
            .catch(err => {
                console.error("Error fetching leaderboard:", err);
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
        console.log(isAdminRef.current.checked)
        setAddUserLoading(true)
        const data = {
            firstName: nameRef.current.value,
            lastName: "",
            email: emailRef.current.value,
            password: pwdRef.current.value,
            admin: isAdminRef.current.checked
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


    const renderValue = (value) => (value === null || value === undefined || value === '') ? '...' : value;

    return (
        <div className="h-screen flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar bg-white" >
            <Helmet>
                <meta charSet="utf8" />
                <title>Permissions - CleanCodeQuest</title>
            </Helmet>

            <SideHeader />
            <SuccessError setMessage={setMessage} message={message} color={messageColor} />

            <div id='permisionContainer' className=" relative flex flex-col px-7 text-generalColors-dark-blue" style={{ minWidth: "calc(100vw - 5rem)", maxWidth: "100%" }}>
                <p className="text-3xl sm:text-4xl p-4  font-bold  rounded-lg text-fourth">
                    Permissions & Admin Pannel
                </p>
                <div id="registerAccount" className="relative flex items-center mb-6 w-fit">
                    <img alt="user" className="w-16 mr-3" src="/SVGs/user.svg" aria-label='user' />
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

                    <label className='ml-5 font-bold text-lg'>ADMIN</label>
                    <CostumCheckBox1 checkBoxEvent={() => console.log("heh")} defaultChecked={false} checkBoxRef={isAdminRef} />

                    <div className='flex items-center justify-center'>
                        <button
                            className=' mx-5 border-[1px] p-3 rounded-xl text-generalColors-white bg-generalColors-dark-blue flex items-center justify-center
                    hover:text-generalColors-medium-blue 
                    hover:bg-generalColors-white animate-ease-linear-3'
                            onClick={registerAccount}
                        >
                            Create

                        </button>
                        {addUserLoading && <Spinner className='absolute w-full h-full ' />}
                    </div>
                </div>

                <div id="SearchContainer" className="relative flex items-center mb-6 w-fit">
                    <img alt="user" className="w-4 mr-3" src="/SVGs/user.svg" aria-label='user-1' />
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



                <div id="modulesHolder" className='relative mb-10'>
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
                                                alt={`week-${week.id}`}
                                                aria-label={`week-${week.id}`}
                                                id={week.id}
                                                className={` rounded-lg z-10 mx-3 p-2.5 ${week.usersWithAccessWeek.includes(selectedUser?.id) ? "bg-green-500" : "bg-red-500"}`}
                                                src={`${week.usersWithAccessWeek.includes(selectedUser?.id) ? "/SVGs/statusSVGs/open.svg" : "/SVGs/statusSVGs/closed.svg"} `}
                                            />
                                        </div>


                                    </div>)}
                            </AccordionBody>
                        </Accordion>)}
                </div>

                                   
                <div className=" py-4">
                    <h1 className="text-2xl font-bold text-generalColors-dark-blue mb-4">Users</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border ">
                            <thead className="bg-generalColors-dark-blue text-white">
                                <tr>
                                    <th className="py-2 px-4 border-b border-blue-700">ID</th>
                                    <th className="py-2 px-4 border-b border-blue-700 w-fit">First Name</th>
                                    <th className="py-2 px-4 border-b border-blue-700">Last Name</th>
                                    <th className="py-2 px-4 border-b border-blue-700">Email</th>
                                    <th className="py-2 px-4 border-b border-blue-700">Role</th>
                                    <th className="py-2 px-4 border-b border-blue-700">Profile Image</th>
                                    <th className="py-2 px-4 border-b border-blue-700">Birthday</th>
                                    <th className="py-2 px-4 border-b border-blue-700">Location</th>
                                    <th className="py-2 px-4 border-b border-blue-700">Address</th>
                                    <th className="py-2 px-4 border-b border-blue-700">Phone Number</th>
                                    <th className="py-2 px-4 border-b border-blue-700">GitHub Username</th>
                                    <th className="py-2 px-4 border-b border-blue-700">CodeWars Username</th>
                                    <th className="py-2 px-4 border-b border-blue-700">Discord Username</th>
                                    <th className="py-2 px-4 border-b border-blue-700">LinkedIn Username</th>
                                    <th className="py-2 px-4 border-b border-blue-700">Instagram Username</th>
                                    <th className="py-2 px-4 border-b border-blue-700">Facebook Username</th>
                                    <th className="py-2 px-4 border-b border-blue-700">Rank Points</th>
                                    <th className="py-2 px-4 border-b border-blue-700">Weekly Rank Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users?.map(user => (
                                    <tr key={user.id} className="hover:bg-blue-100">
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.id)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.firstName)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.lastName)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.email)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.role)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">
                                            {user.profileImageUrl ? (
                                                <img src={user.profileImageUrl} alt="Profile" className="w-12 h-12 rounded-full" />
                                            ) : (
                                                '...'
                                            )}
                                        </td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.birthday)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.location)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.address)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.phoneNumber)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.githubUsername)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.codeWarsUsername)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.discordUsername)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.linkedInUsername)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.instagramUsername)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.facebookUsername)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.rankPoints)}</td>
                                        <td className="py-2 px-4 border-b border-generalColors-dark-blue">{renderValue(user.weeklyRankPoints)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                

            </div>

        </div>
    )
}
