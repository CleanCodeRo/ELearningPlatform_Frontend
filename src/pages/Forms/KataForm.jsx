import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SuccessError from "../../components/SuccessError";
import DropdownFilter from "../../components/SpecialKatas/DropdownFilter";
import { kataCategories } from "../../components/SpecialKatas/FilterObjects";

export default function KataForm() {
    const [savedCategory, setSavedCategory] = useState([]);
    const [kataById, setKataById] = useState({
        title: "",
        kataLink: "",
        level: "",
        kataCategories: savedCategory,
    });
    const [error, setError] = useState(null);
    const [errorConflict, setErrorConflict] = useState(null);
    const [success, setSuccess] = useState(null);

    const kataTitle = useRef(null);
    const kataLevel = useRef(null);
    const kataLink = useRef(null);
    const navigate = useNavigate();
    const params = useParams();
    const previousURL = document.referrer;
    // console.log(previousURL.split('/').slice(3).join("/"))

    useEffect(() => {
        if (params.kataId !== undefined) {
            fetch(`http://localhost:8080/katas/${params.kataId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    setKataById(data);
                    setSavedCategory(data.category)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [params.kataId]);

    const editKata = (e) => {
        if(!checkIfAllFieldsCompleted()){
            return
        }

        fetch(`http://localhost:8080/katas/${params.kataId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
            },
            body: JSON.stringify({
                id: params.kataId,
                title: kataTitle.current.value.trim(),
                kataLink: kataLink.current.value,
                level: kataLevel.current.value,
                category: savedCategory,
            }),
        })
            .then((response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error(`Failed to update kata: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                setSuccess("Kata edited successfully!"); // afisare mesaj
                setTimeout(() => {
                    setSuccess(null); // curatare eroare
                    window.history.back() // Redirect after 2 seconds
                }, 2000);
               
            })
            .catch((error) => {
                setErrorConflict(error.message + " already exists");
                setTimeout(() => {
                    setErrorConflict(null); // curatare eroare
                }, 3000);
            })
    };

    const saveKata = () => {
        if(!checkIfAllFieldsCompleted()){
            return
        }

        fetch("http://localhost:8080/katas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
            },
            body: JSON.stringify({
                title: kataTitle.current.value.trim(),
                kataLink: kataLink.current.value,
                level: kataLevel.current.value,
                category: savedCategory,
            }),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else if (res.status === 409) {
                    throw new Error("Kata already exists!");
                } else {
                    throw new Error("Failed to create the kata");
                }
            })
            .then(() => {
                setSuccess("Kata created successfully!"); // afisare mesaj
                setTimeout(() => {
                    setSuccess(null); // curatare eroare
                    navigate(`/${previousURL.split('/').slice(3).join("/")}`) // Redirect after 2 seconds
                }, 2000);
            })
            .catch((error) => {
                setErrorConflict(error.message);
                setTimeout(() => {
                    setErrorConflict(null); // curatare eroare
                }, 3000);
            })
    };

    const checkIfAllFieldsCompleted = () =>{
        if (
            kataTitle.current.value === "" ||
            kataLevel.current.value === "" ||
            kataLink.current.value === "" ||
            savedCategory.length == 0
        ) {
            setError("Please fill in the required fields");
            return false;
        }else{
           return true
        }
    }

    function addCategory(categoryValue) {
        if (savedCategory.length < 5) {
            if (!savedCategory.includes(categoryValue)) {
                setSavedCategory([...savedCategory, categoryValue]);
            }
        } else {
            setErrorConflict("Can't add more than 5 categories");
            setTimeout(() => {
                setErrorConflict(null); // curatare eroare
            }, 3000);
        }
    }

    function deleteCategory(categoryValueToDelete) {
        const updatedCategories = savedCategory.filter(category => category !== categoryValueToDelete);
        setSavedCategory(updatedCategories);
    }

    return (
        <div className="flex justify-center items-center p-2 w-screen h-screen font-inter">
            <SuccessError success={success} error={errorConflict} />
            <div className="relative flex w-96 h-fit flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
                <img src="/images/CleanCode-removebg-preview.png" />
                <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
                    <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
                        {params.kataId !== undefined ? "Edit your kata" : "Create new kata"}{" "}
                    </h3>
                </div>
                <div className="flex flex-col gap-4 p-6">
                    <div id="TitleInput" className="relative h-11 w-full min-w-[200px]">
                        <input
                            ref={kataTitle}
                            defaultValue={kataById.title}
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Title
                        </label>
                    </div>
                    <div id="KyuInput" className="relative h-11 w-full min-w-[200px]">
                        <input
                            ref={kataLevel}
                            defaultValue={kataById.level}
                            type="number"
                            max={8}
                            min={1}
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Kyu
                        </label>
                    </div>
                    <div id='LinkInput' className="relative h-11 w-full min-w-[200px]">
                        <input
                            ref={kataLink}
                            defaultValue={kataById.kataLink}
                            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        />
                        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                            Link
                        </label>
                    </div>
                    <div id="categoryContainer" className="flex flex-wrap gap-1">
                        {savedCategory.map((category, index) => (
                            <div key={index} className="w-fit bg-gray-500 h-7 text-white flex items-center px-2 rounded-lg">
                                {category}
                                <i className="fa-solid fa-x text-red-500 text-xs ml-2 cursor-pointer" onClick={() => deleteCategory(category)}></i>
                            </div>
                        ))}
                    </div>
                    <DropdownFilter onChangeEvent={addCategory} options={kataCategories.slice(1)} label="Category" />
                </div>
                {error && (
                    <div className="text-red-500 flex justify-center font-inter">
                        {error}
                    </div>
                )}
                <div className="font-semibold flex items-center justify-center pt-3 pb-5">
                    <button
                        onClick={params.kataId !== undefined ? editKata : saveKata}
                        className=" my-2 xs:my-0 px-8 py-5 bg-fifth rounded-lg text-sixth mr-4 shadow-md shadow-fourth"
                    >
                        {params.kataId !== undefined ? "Save" : "Create"}
                    </button>

                    <button className=" my-2 xs:my-0 px-8 py-5 bg-sixth rounded-lg text-fifth mr-4 shadow-md shadow-fourth" onClick={() => window.history.back()}>
                        Cancel
                    </button>

                </div>
            </div>
        </div>
    );
}
