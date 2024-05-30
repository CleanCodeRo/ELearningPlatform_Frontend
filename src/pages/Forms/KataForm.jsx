import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SuccessError from "../../components/ReusableComponents/SuccessError";
import DropdownFilter from "../../components/SpecialKatas/DropdownFilter";
import { kataCategories } from "../../components/SpecialKatas/FilterObjects";
import { startLink } from "../../constants/Constants";
import CostumInput from "../../components/ReusableComponents/CostumInput";
import { checkIfUserAdmin, handleEnter
 } from "../../components/ReusableComponents/Atom";

export default function KataForm() {
    const [savedCategory, setSavedCategory] = useState([]);
    const [kataById, setKataById] = useState({
        title: "",
        kataLink: "",
        level: "",
        kataCategories: savedCategory,
    });
    const [[message, messageColor] , setMessage] = useState([null, null])
    const kataTitle = useRef(null);
    const kataLevel = useRef(null);
    const kataLink = useRef(null);
    const params = useParams();

    useEffect(() => {
        checkIfUserAdmin();
        document.addEventListener('keydown', (e) => handleEnter(e, params.kataId  ? editKata : saveKata)); // press enter to save
        kataLevel.current.type = "number"
        
        if (params.kataId !== undefined) {
            fetch(`${startLink}/katas/${params.kataId}`, {
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

    const editKata = () => {
        if (!checkIfAllFieldsCompleted()) {
            return
        }

        fetch(`${startLink}/katas/${params.kataId}`, {
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
            .then(() => {
                setMessage(["Kata edited successfully!", "bg-green-500"]); // afisare mesaj
                setTimeout(() => {window.history.back() }, 2000); // Redirect after 2 seconds

            })
            .catch((error) => {
                console.log(error)
                setMessage(["Kata already exists", "bg-red-500"]);
            })
    };

    const saveKata = () => {
        if (!checkIfAllFieldsCompleted()) {
            return
        }
        if (kataLevel.current.value > 8) kataLevel.current.value = 8;

        fetch(`${startLink}/katas`, {
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
                setMessage(["Kata created successfully!", "bg-green-500"]); // afisare mesaj
                setTimeout(() => {window.history.back() }, 2000); // Redirect after 2 seconds
            })
            .catch((error) => {
                console.log(error)
                setMessage(["Kata already exists or someting went wrong", "bg-red-500"]);
            })
    };

    const checkIfAllFieldsCompleted = () => {
        if (kataLevel.current.value > 8){
            kataLevel.current.value = 8;
        }else if(kataLevel.current.value <= 0){
            kataLevel.current.value = 1;
        }
        if (
            kataTitle.current.value === "" ||
            kataLevel.current.value === "" ||
            kataLink.current.value === "" ||
            savedCategory.length == 0
        ) {
            setMessage(["Please fill in the required fields", "bg-red-500"]);
            return false;
        } else {
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
            
        }
    }

    function deleteCategory(categoryValueToDelete) {
        const updatedCategories = savedCategory.filter(category => category !== categoryValueToDelete);
        setSavedCategory(updatedCategories);
    }

    // function handleEnter(e, functionHandler) {
    //     if(e.keyCode === 13){
    //       functionHandler()
    //     }
    //   }

    return (
        <div id="wholePageHolderKata"
            className="flex justify-center items-center p-2 w-screen h-screen bg-center bg-cover" style={{ backgroundImage: "url(/images/backGrounds/online-programming-course-hero-section-bg.jpg)" }}>
            <div id="formKata" className="relative w-[24rem] flex flex-col items-center px-8 py-5 h-fit rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
            <SuccessError setMessage={setMessage} message={message} color={messageColor} />

                {/* <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/colorLogo.svg" /> */}
                <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/ghost.svg" />
                <p className="text-2xl font-bold text-generalColors-dark-blue my-5"> {params.kataId !== undefined ? "Edit your Kata" : "Create new Kata"}</p>


                <div id="passwordContainer" className="flex flex-col items-center mb-6 w-full gap-8 pt-3 ">
                    <CostumInput
                        id={"kataTitle"}
                        label={"Kata Title"}
                        inputRef={kataTitle}
                        defaultValue={kataById.title}
                        costumInputClass=""
                        color="gray"
                    />
                    <CostumInput
                        id={"kataKyu"}
                        label={"Kata Kyu"}
                        inputRef={kataLevel}
                        defaultValue={kataById.level}
                        costumInputClass=""
                        color="gray"
                    />
                    <CostumInput
                        id={"kataLink"}
                        label={"Kata Link"}
                        inputRef={kataLink}
                        defaultValue={kataById.kataLink}
                        costumInputClass=""
                        color="gray"
                    />

                    <DropdownFilter onChangeEvent={addCategory} options={kataCategories.slice(1)} label="Category" />
                    
                    <div id="categoryContainerWeek" className="flex flex-wrap gap-1">
                        {savedCategory.map((category, index) => (
                            <div key={index} className="w-fit bg-generalColors-dark-blue h-7 text-white flex items-center px-2 rounded-lg">
                                {category}
                                <i className="fa-solid fa-x w-4 h-4 rounded-full text-red-500 bg-white flex items-center justify-center text-[8px] ml-2 cursor-pointer" onClick={() => deleteCategory(category)}></i>
                            </div>
                        ))}
                    </div>
                </div>



                <div className=" font-semibold flex items-center justify-center pt-3 pb-5">
                    <button
                        onClick={params.kataId !== undefined ? editKata : saveKata}
                        className="bg-generalColors-dark-blue text-white rounded-lg py-4 my-2 xs:my-0 px-8  bg-fifth  text-sixth mr-4 shadow-md shadow-fourth"
                    >
                        {params.kataId !== undefined ? "Save" : "Create"}
                    </button>

                    <button onClick={() => window.history.back()} className=" my-2 xs:my-0 px-8 py-5 rounded-lg text-generalColors-dark-blue mr-4 shadow-md shadow-fourth">
                        Cancel
                    </button>

                </div>

            </div>
        </div>
    );
}
