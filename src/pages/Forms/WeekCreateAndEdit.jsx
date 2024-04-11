import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import state, { getCompletedStuff } from "../../components/ReusableComponents/Atom";
import { startLink } from "../../constants/Constants";
import DropdownFilter from "../../components/SpecialKatas/DropdownFilter";
import { kataCategories } from "../../components/SpecialKatas/FilterObjects";
import CostumInput from "../../components/ReusableComponents/CostumInput";

export default function WeekCreateAndEdit() {
  let weekNumber = useRef(null);
  let navigate = useNavigate();

  const [error, setError] = useState(null);
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

  const params = useParams();

  useEffect(() => {
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


  function validateFields() {
    if (
      weekNumber.current.value === "" ||
      savedCategory.length == 0
    ) {
      setError("Please fill in the required fields");
      return false;
    } else if (/[a-zA-Z]/.test(weekNumber.current.value)) {
      setError("Week number is text type");
      return false;
    }
    return true
  }

  const editWeek = () => {
    if(!validateFields()) return

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
        window.history.back()
      })
      .catch(() => {
        navigate("/login")
      })
  };

  const saveWeek = () => {
    if(!validateFields()) return

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
        window.history.back()
      })
      .catch(() => {
        navigate("/login")
      })
  };

  function addCategory(categoryValue) {
    if (savedCategory.length < 5) {
      if (!savedCategory.includes(categoryValue)) {
        setSavedCategory([...savedCategory, categoryValue]);
      }
    } else {
      setError("Can't add more than 5 categories");
    }
  }

  function deleteCategory(categoryValueToDelete) {
    const updatedCategories = savedCategory.filter(category => category !== categoryValueToDelete);
    setSavedCategory(updatedCategories);
  }

  return (
    <div id="wholePageHolderModule"
      className="flex justify-center items-center p-2 w-screen h-screen bg-center bg-cover" style={{ backgroundImage: "url(/images/backGrounds/online-programming-course-hero-section-bg.jpg)" }}>
      <div id="formLogin" className="relative w-[24rem] flex flex-col items-center px-8 py-5 h-fit rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">

        {/* <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/colorLogo.svg" /> */}
        <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/ghost.svg" />
        <p className="text-2xl font-bold text-generalColors-dark-blue my-5"> {params.weekId !== undefined ? "Edit your week" : "Create new week"}</p>

        <div id="weekNumberContainer" className="flex items-center mb-6 w-full">
          <CostumInput
            id={"weekNumberInput"}
            label={"Week Number"}
            inputRef={weekNumber}
            defaultValue={weekById.number}
            costumInputClass=""
            color="gray"
          />
        </div>

        <DropdownFilter onChangeEvent={addCategory} options={kataCategories.slice(1)} label="Category" />

        <div id="categoryContainer" className="flex flex-wrap gap-1 my-5">
          {savedCategory.map((category, index) => (
            <div key={index} className="w-fit bg-gray-500 h-7 text-white flex items-center px-2 rounded-lg">
              {category}
              <i className="fa-solid fa-x text-red-500 text-xs ml-2 cursor-pointer" onClick={() => deleteCategory(category)}></i>
            </div>
          ))}
        </div>

        {error && (
          <div className="text-red-500 flex justify-center">{error}</div>
        )}

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
