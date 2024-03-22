import React, { useState } from "react";
import DropdownFilter from "./DropdownFilter";

import { kataCategories, kataDifficulty, kataProgress } from "./FilterObjects";
import { useAtom } from "jotai";
import state from "../Atom";

export default function FilterKata() {
    const [user, setUser] = useAtom(state.user)

    const [filterResultTest, setFilterResultTest] = useState({
        cat: null,
        prog: null,
        dif: null
    });

    const handleCategoryChange = (value) => {
        setFilterResultTest(prevState => ({ ...prevState, cat: value }));
    };

    const handleProgressChange = (value) => {
        setFilterResultTest(prevState => ({ ...prevState, prog: value }));
    };

    const handleDifficultyChange = (value) => {
        if (value) {
            // If value is not null, split and convert to integer
            const difficulty = value.split(' ')[0];
            setFilterResultTest(prevState => ({ ...prevState, dif: difficulty*1 }));
            console.log(filterResultTest.dif)
        } else {
            // If value is null, set dif to null
            setFilterResultTest(prevState => ({ ...prevState, dif: null }));
            console.log(filterResultTest.dif)
        }
    };
    const handleSearch = () => {
        const queryParams = new URLSearchParams();
        queryParams.append("category", filterResultTest.cat);
        queryParams.append("status", filterResultTest.prog);
        queryParams.append("difficulty", filterResultTest.dif);
        queryParams.append("userId", user.id);
        console.log(filterResultTest)
    
        fetch(`http://localhost:8080/katas/filtered?${queryParams.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then(data => {
            // Handle the response data here
            console.log(data);
        })
        .catch(error => {
            // Handle any errors that occur during the fetch request
            console.error("Error fetching data:", error);
        });
    };
    

    return (
        <div className="flex flex-row w-full">
            <p className="text-3xl mr-6 font-bold rounded-lg text-fourth">Filters</p>
            <div id="CATEGORY" className="w-full gap-8 flex flex-row justify-around items-center">
                <DropdownFilter onChangeEvent={handleCategoryChange} options={kataCategories} label="Category"/>
                <DropdownFilter onChangeEvent={handleProgressChange} options={kataProgress} label="Status"/>
                <DropdownFilter onChangeEvent={handleDifficultyChange} options={kataDifficulty} label="Difficulty"/>
                <button onClick={handleSearch} className="bg-black w-fit h-10 px-3">Apply</button>
            </div>
        </div>
    );
}
