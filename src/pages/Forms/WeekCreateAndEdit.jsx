import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import state, { checkIfUserAdmin, getCompletedStuff, handleEnter } from "../../components/ReusableComponents/Atom";
import { startLink } from "../../constants/Constants";
import DropdownFilter from "../../components/SpecialKatas/DropdownFilter";
import { kataCategories } from "../../components/SpecialKatas/FilterObjects";
import CostumInput from "../../components/ReusableComponents/CostumInput";
import SuccessError from "../../components/ReusableComponents/SuccessError";
import { Helmet } from "react-helmet";

export default function WeekCreateAndEdit() {
  const weekNumber = useRef(null);
  let navigate = useNavigate();

  const [completedLessons, setCompletedLessons] = useAtom(state.completedLessons);
  const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks);
  const [completedModules, setCompletedModules] = useAtom(state.completedModules);
  const [user, setUser] = useAtom(state.user);
  const [savedCategory, setSavedCategory] = useState([]);
  const [weekById, setWeekById] = useState({
    name: "",
    number: "",
    categories: savedCategory,
  });
  const [[message, messageColor], setMessage] = useState([null, null])
  const params = useParams();

  useEffect(() => {
    checkIfUserAdmin()
    console.log(params)
    // document.addEventListener('keydown', (e) => handleEnter(e, params.weekId  ? editWeek : saveWeek)); // press enter to save
    weekNumber.current.type = "number"

    if (params.weekId !== undefined) {
      fetch(`${startLink}/weeks?weekId=${params.weekId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("This is editing week ", data)
          setWeekById(data);
          setSavedCategory(data.categories)
        })
        .catch(() => {
          navigate("/login")
        })
    }
  }, [params.weekId]);


  function validateFields(weekNumber, savedCategory) {
    if (
      weekNumber.current.value === "" ||
      savedCategory.length == 0
    ) {
      setMessage(["Please fill in the required fields", "bg-red-500"]);
      return false;
    }
    return true
  }

  const editWeek = () => {
    if (!validateFields(weekNumber, savedCategory)) return

    fetch(`${startLink}/weeks/${params.weekId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
      body: JSON.stringify({
        number: weekNumber.current.value,
        categories: savedCategory
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`Failed to update week: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        setMessage(["Module edited successfully!", "bg-green-500"]); // afisare mesaj
        setTimeout(() => { window.history.back() }, 2000); // Redirect after 2 seconds
      })
      .catch(() => {
        setMessage(["Someting went wrong", "bg-red-500"]);
      })
  };

  const saveWeek = () => {
    if (!validateFields(weekNumber, savedCategory)) return

    fetch(`${startLink}/weeks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
      body: JSON.stringify({
        number: weekNumber.current.value,
        categories: savedCategory,
        module: {
          id: params.moduleId
        }
      }),
    })
      .then((res) => res.json())
      .then(() => {
        let userId = user.id;
        getCompletedStuff({ userId, setCompletedLessons, setCompletedWeeks, setCompletedModules })
        setMessage(["Module created successfully!", "bg-green-500"]); // afisare mesaj
        setTimeout(() => { window.history.back() }, 2000); // Redirect after 2 seconds
      })
      .catch(() => {
        setMessage(["Someting went wrong", "bg-red-500"]);
      })
  };

  function addCategory(categoryValue) {
    if (savedCategory.length < 5) {
      if (!savedCategory.includes(categoryValue)) {
        setSavedCategory([...savedCategory, categoryValue]);
      }
    } else {
      setMessage(["Can't add more than 5 categories", "bg-red-500"]);
    }
  }

  function deleteCategory(categoryValueToDelete) {
    const updatedCategories = savedCategory.filter(category => category !== categoryValueToDelete);
    setSavedCategory(updatedCategories);
  }

  return (
    <div id="wholePageHolderModule"
      className="flex justify-center items-center p-2 w-screen h-screen bg-center bg-cover" style={{ backgroundImage: "url(/images/backGrounds/online-programming-course-hero-section-bg.jpg)" }}>
      <Helmet>
        <meta charSet="utf8" />
        <title>  {params.weekId !== undefined ? "Save" : "Create"} Lesson - CleanCodeQuest</title>
      </Helmet>

      <SuccessError setMessage={setMessage} message={message} color={messageColor} />

      <div id="formWeek" className="relative w-[24rem] flex flex-col items-center px-8 py-5 h-fit rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">

        {/* <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/colorLogo.svg" /> */}
        <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/ghost.svg" />
        <p className="text-2xl font-bold text-generalColors-dark-blue my-5"> {params.weekId !== undefined ? "Edit your week" : "Create new week"}</p>

        <div id="passwordContainer" className="flex flex-col items-center mb-6 w-full  gap-8 pt-3">
          <CostumInput
            id={"weekNumberInput"}
            label={"Week Number"}
            inputRef={weekNumber}
            defaultValue={weekById.number}
            costumInputClass=""
            color="gray"
          />


          <DropdownFilter onChangeEvent={addCategory} options={kataCategories.slice(1)} label="Category" />
        </div>

        <div id="categoryContainer" className="flex flex-wrap gap-1 my-5">
          {savedCategory.map((category, index) => (
            <div key={index} className="w-fit bg-generalColors-dark-blue h-7 text-white h flex items-center px-2 rounded-lg">
              {category}
              <i className="fa-solid fa-x  w-4 h-4 rounded-full text-red-500 bg-white flex items-center justify-center text-[8px] ml-2 cursor-pointer" onClick={() => deleteCategory(category)}></i>
            </div>
          ))}
        </div>

        <div className=" font-semibold flex items-center justify-center pt-3 pb-5 ">
          <button
            onClick={params.weekId !== undefined ? editWeek : saveWeek}
            className="bg-generalColors-dark-blue text-white rounded-lg py-4 my-2 xs:my-0 px-8  bg-fifth  text-sixth mr-4 shadow-md shadow-fourth"
          >
            {params.weekId !== undefined ? "Save" : "Create"}
          </button>
          <button onClick={() => window.history.back()} className=" my-2 xs:my-0 px-8 py-5 rounded-lg text-generalColors-dark-blue mr-4 shadow-md shadow-fourth">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
