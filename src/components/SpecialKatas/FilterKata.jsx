import React, { useEffect, useState } from "react";
import DropdownFilter from "./DropdownFilter";
import { kataCategories, kataDifficulty, kataProgress } from "./FilterObjects";
import { useParams } from "react-router-dom";

const numberOfItems = 4;

export default function FilterKata({userId}) {
    const [filterResultTest, setFilterResultTest] = useState({
        category: "ALL",
        progress: "ALL",
        difficulty: "ALL"
    });
    const [refresh, setRefresh] = useState(0);
    const { pageNumber } = useParams();

    useEffect(() =>{
        const queryParams = new URLSearchParams();
        queryParams.append("category", filterResultTest.category);
        queryParams.append("status", filterResultTest.progress);
        queryParams.append("difficulty", filterResultTest.difficulty);
        queryParams.append("userId", userId);
        queryParams.append("pageNumber", pageNumber);
        queryParams.append("numberOfItems", numberOfItems);
    
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
    }, [pageNumber,refresh])


    const handleCategoryChange = (value) => {
        console.log(value)
        setFilterResultTest(prevState => ({ ...prevState, category : value }));
    };

    const handleProgressChange = (value) => {
        console.log(value)
        setFilterResultTest(prevState => ({ ...prevState, progress : value}));
    };

    const handleDifficultyChange = (value) => {
        console.log(value)
        if (value != "ALL") {
            // If value is not null, split and convert to integer
            const difficulty = value.split(' ')[0];
            setFilterResultTest(prevState => ({ ...prevState, difficulty: difficulty*1 }));
        } else {
            // If value is null, set difficulty to null
            setFilterResultTest(prevState => ({ ...prevState, difficulty: "ALL" }));
        }
    };

    return (
        <div className="flex flex-row w-full">
            <p className="text-3xl mr-6 font-bold rounded-lg text-fourth">Filters</p>
            <div id="CATEGORY" className="w-full gap-8 flex flex-row justify-around items-center">
                <DropdownFilter onChangeEvent={handleCategoryChange} options={kataCategories} label="Category"/>
                <DropdownFilter onChangeEvent={handleProgressChange} options={kataProgress} label="Status"/>
                <DropdownFilter onChangeEvent={handleDifficultyChange} options={kataDifficulty} label="Difficulty"/>
                <button onClick={() => setRefresh(refresh + 1)} className="bg-black w-fit h-10 px-3">Apply</button>
            </div>
        </div>
    );
}
