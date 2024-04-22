import React, { useEffect, useState } from 'react'
import { deleteKata } from '../../SpecialKatas/ListKata';
import KataCard from '../../SpecialKatas/KataKard';
import { startLink } from '../../../constants/Constants';
import KataCardRemade from '../../SpecialKatas/KataKardRemade';
let refreshHasBeenMade = false;

export default function KatasOfTheDay({ userRole }) {
    const [katas, setKatas] = useState(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        console.log(refreshHasBeenMade)
        setKatas([]);
        fetch(`${startLink}/katas/katasOfTheDay?requestRefresh=${refreshHasBeenMade}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
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
            <div id="titleAndAddButton" className="flex  items-center justify-start">
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

            <div id="centering container" className='w-full flex flex-wrap justify-center gap-4 py-[1.75rem]'>
             
                    {katas && katas.map((kata, index) => (
                        <KataCardRemade key={index} kata={kata} deleteEvent={(e) => {
                            deleteKata(e, kata.id, setRefresh);
                            refreshHasBeenMade = true
                        }} />
                    ))}
                
            </div>

        </div>


    )
}
