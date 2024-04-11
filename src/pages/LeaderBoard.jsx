import React, { useEffect, useState } from 'react';
import SideHeader from '../components/SideHeader';
import { useAtom } from 'jotai';
import state from '../components/ReusableComponents/Atom';
import { startLink } from '../constants/Constants';

export default function LeaderBoard() {
    const [user, setUser] = useAtom(state.user);
    const [people, setPeople] = useState([]);

    useEffect(() => {
        fetch(`${startLink}/users/leaderboard`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`
            },
        })
        .then(res => res.json())
        .then(data => {
            setPeople(data);
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []); 

    function Person({ rank ,name ,xp}) {

        if (rank == 1) {
            return (
                <div id='titles' className='w-full h-12 mt-1  flex flex-row px-7 text-[#5f5f5d]'>
                    <div className=' w-20 text-xl flex items-center justify-center'>
                        <img src='/images/quest-leaderboard-1st-place.png' className=' scale-50'></img>
                    </div>
                    <div className="w-2/6 flex items-center justify-center ">
                    <p className=' text-xl '>{name}</p>
                    </div>
                    <div className="w-1/3 flex items-center justify-center ">
                        <p className=' text-xl'>Module 2</p>
                    </div>
                    <div className="w-1/3 flex items-center justify-center ">
                        <p className=' text-xl'>{xp? xp : 0 }xp</p>
                    </div>
                </div>

            );
        } else if (rank == 2) {
            return (
                <div id='titles' className='w-full h-12 mt-1  flex flex-row px-7 text-[#5f5f5d]'>
                    <div className=' w-20 text-xl flex items-center justify-center'>
                        <img src='/images/quest-leaderboard-2nd-place.png' className=' scale-50'></img>
                    </div>
                    <div className="w-2/6 flex items-center justify-center ">
                    <p className=' text-xl '>{name}</p>
                    </div>
                    <div className="w-1/3 flex items-center justify-center ">
                        <p className=' text-xl'>Module 2</p>
                    </div>
                    <div className="w-1/3 flex items-center justify-center ">
                        <p className=' text-xl'>{xp? xp : 0  }xp</p>
                    </div>
                </div>

            );
        } else if (rank == 3) {
            return (
                <div id='titles' className='w-full h-12 mt-1  flex flex-row px-7 text-[#5f5f5d]'>
                    <div className=' w-20 text-xl flex items-center justify-center'>
                        <img src='/images/quest-leaderboard-3rd-place.png' className=' scale-50'></img>
                    </div>
                    <div className="w-2/6 flex items-center justify-center ">
                        <p className=' text-xl '>{name}</p>
                    </div>
                    <div className="w-1/3 flex items-center justify-center ">
                        <p className=' text-xl'>Module 2</p>
                    </div>
                    <div className="w-1/3 flex items-center justify-center ">
                        <p className=' text-xl'>{xp? xp : 0 }xp</p>
                    </div>
                </div>

            );
        } else {
            return (
                <div id='titles' className='w-full h-12 mt-1  flex flex-row px-7 text-[#5f5f5d]'>
                    <p className=' w-20 text-xl flex items-center justify-center'>{rank}</p>
                    <div className="w-2/6 flex items-center justify-center ">
                        <p className=' text-xl '>{name}</p>
                    </div>
                    <div className="w-1/3 flex items-center justify-center ">
                        <p className=' text-xl'>Module 2</p>
                    </div>
                    <div className="w-1/3 flex items-center justify-center ">
                        <p className=' text-xl'>{xp? xp : 0  }xp</p>
                    </div>
                </div>

            );
        }

    }
    return (
        <div className="h-screen flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar bg-generalColors-dark-blue text-gray-100">
            <SideHeader />
            <div id="moduleAndKataHolder" className="px-7" style={{ minWidth: "calc(100vw - 5rem)" }}>
                {user && 
                    <div id='container' className='w-full px-9 h-full justify-center flex flex-col'>
                        <p id='title' className='text-5xl justify-center flex text-white mb-16'>Leaderboard</p>
                        <div id='buttonContainer' className='flex justify'>
                            <button id='allTime' className='bg-[#4ec49d] text-[#fefefe] text-2xl px-9 rounded-full'>All time</button>
                            <button id='thisWeek' className='text-white text-2xl px-9 rounded-full border-2 border-white ml-3'>This Week</button>
                        </div>
                        <div id='leaderboardContainer' className='w-full h-2/3 rounded-3xl bg-[#ffffff] mt-3 border-2 px-2 overflow-y-scroll'>
                            <div id='titles' className='w-full h-12 mt-4 border-b-2 flex flex-row bg-white sticky top-0 z-20 '>
                                <p className='text-[#244476] w-20 text-xl flex items-center justify-center  pl-14'>Rank</p>
                                <div className="w-2/6 flex items-center justify-center ">
                                    <p className='text-[#244476] text-xl pl-6'>User</p>
                                </div>
                                <div className="w-1/3 flex items-center justify-center ">
                                    <p className='text-[#244476] text-xl pr-7'>Module</p>
                                </div>
                                <div className="w-1/3 flex items-center justify-center ">
                                    <p className='text-[#244476] text-xl pr-10'>Honor</p>
                                </div>
                            </div>
                            {people.map((person, index) => (
                                <Person
                                    key={index}
                                    rank={index + 1}
                                    name={`${person.firstName} ${person.lastName}`}
                                    xp={person.rankPoints}
                                />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}
