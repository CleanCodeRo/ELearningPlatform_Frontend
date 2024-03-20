import React, { useEffect, useState } from 'react'
import { deleteKata } from '../../SpecialKatas/ListKata';
import KataCard from '../../SpecialKatas/KataKard';
let refreshHasBeenMade = false;

export default function KatasOfTheDay({ userRole }) {
    const [katas, setKatas] = useState(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        console.log(refreshHasBeenMade)
        setKatas([]);
        fetch(`http://localhost:8080/katas/katasOfTheDay?requestRefresh=${refreshHasBeenMade}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setKatas(data)
                refreshHasBeenMade = false
            })
            .catch((err) => {
                console.error(err)
            });
    }, [refresh])

    const refreshKataOfTheDay = () => {
        setRefresh(refresh + 1);
        refreshHasBeenMade = true;
    }

    return (
        <div id="container" className='pt-5 pb-10'>
            <div id="titleAndAddButton" className="flex items-center justify-center">
                <p className="text-3xl sm:text-4xl p-4  font-bold  rounded-lg text-fourth ">
                    Katas of the day
                </p>

                {userRole == "ADMIN" ?
                    <button
                        onClick={refreshKataOfTheDay}
                        className="h-10 w-10 rounded-full bg-fourth flex items-center justify-center text-xl mx-2 hover:bg-[#2c8dfe] hover:rotate-180 duration-300"
                    >
                        <i className="fa-solid fa-arrows-rotate "></i>
                    </button> : null}
            </div>

            <div id='kataHolder' className='grid grid-cols-3 xl:grid-cols-4 px1400:grid-cols-5 px1669:grid-cols-6 w-full relative py-7 '>
                {katas && katas.map((kata, index) => (
                    <KataCard key={index} kata={kata} deleteEvent={(e) =>{
                        deleteKata(e, kata.id, setRefresh);
                        refreshHasBeenMade = true
                    }} />
                ))}
            </div>
        </div>


    )
}
