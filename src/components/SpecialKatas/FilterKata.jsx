import React, { useEffect, useRef, useState } from "react";
import DropdownFilter from "./DropdownFilter";
import { kataCategories, kataDifficulty, kataProgress } from "./FilterObjects";
import { useNavigate, useParams } from "react-router-dom";
import CostumInput from "../ReusableComponents/CostumInput";
import { startLink } from "../../constants/Constants";

const numberOfItems = 12;

export default function FilterKata({ userId, setKatas, setNumberOfPages, setLoadingKatas, refreshKatas, setRefreshKatas }) {
    const [filterResultTest, setFilterResultTest] = useState({
        category: "ALL",
        status: "ALL",
        level: "ALL"
    });
    const { pageNumber } = useParams();
    const navigate = useNavigate();
    const inputRef = useRef(null);

    useEffect(() => {
        if (pageNumber){
            setKatas([]);
            const queryParams = new URLSearchParams();
            queryParams.append("category", filterResultTest.category);
            queryParams.append("status", filterResultTest.status);
            queryParams.append("level", filterResultTest.level.split(" ")[0]);
            queryParams.append("userId", userId);
            queryParams.append("pageNumber", pageNumber);
            queryParams.append("numberOfItems", numberOfItems);
            queryParams.append("searchByName", inputRef.current.value);

            fetch(`${startLink}/katas/filtered?${queryParams.toString()}`, {
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
                    setKatas(data.katas);
                    setLoadingKatas(false);
                    setNumberOfPages(data.numberOfKatas / numberOfItems)
                    if (data.katas.length == 0 && pageNumber >= 0) {
                        navigate(`/dojo/${pageNumber - 1}`)
                    }
                     console.log(data);
                })
                .catch(error => {
                    // Handle any errors that occur during the fetch request
                    console.error("Error fetching data:", error);
                    setNumberOfPages(0)
                });
        }
        // setLoadingKatas(false);
    }, [pageNumber, refreshKatas])


    const handleCategoryChange = (value) => {
        setFilterResultTest(prevState => ({ ...prevState, category: value }));
    };

    const handleProgressChange = (value) => {
        setFilterResultTest(prevState => ({ ...prevState, status: value }));
    };

    const handleDifficultyChange = (value) => {
        if (value != "ALL") {
            // If value is not null, split and convert to integer
            const level = value.split(' ')[0];
            setFilterResultTest(prevState => ({ ...prevState, level: `${level} KYU` }));
        } else {
            // If value is null, set level to null
            setFilterResultTest(prevState => ({ ...prevState, level: "ALL" }));
        }
    };

    const emptyAllFilters = () =>{
        setFilterResultTest({
            category: "ALL",
            status: "ALL",
            level: "ALL"
        });
        inputRef.current.value = "";
        setRefreshKatas(refreshKatas + 1)
    }

    return (
        <div id='allFilterInputs' className="flex flex-col w-full gap-4">
            <div className="flex flex-row gap-4">
                <p className="text-3xl  text-generalColors-dark-blue mr-4 font-bold rounded-lg ">Filters</p>
                <button onClick={() => setRefreshKatas(refreshKatas + 1)} className=" bg-generalColors-dark-blue w-fit h-10 px-3 rounded-lg text-white">Apply</button>
                <button onClick={emptyAllFilters} className="bg-generalColors-dark-blue w-fit h-10 px-3 rounded-lg text-white">Empty filters</button>
            </div>

            <div id="CATEGORY" className="w-full gap-8 flex flex-row justify-around items-center">
                <CostumInput id={"searchKata"} inputRef={inputRef} label={"Search by name"} icon={<i className="fa-solid fa-magnifying-glass text-gray-600" />} />
                <DropdownFilter onChangeEvent={handleCategoryChange} options={kataCategories} label="Category" value={filterResultTest.category}/>
                <DropdownFilter onChangeEvent={handleProgressChange} options={kataProgress} label="Status" value={filterResultTest.status}/>
                <DropdownFilter onChangeEvent={handleDifficultyChange} options={kataDifficulty} label="Difficulty" value={filterResultTest.level}/>
            </div>
        </div>
    );
}
