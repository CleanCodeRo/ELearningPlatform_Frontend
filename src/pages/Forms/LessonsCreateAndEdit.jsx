import { useAtom } from "jotai";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import state, { checkIfUserAdmin, getCompletedStuff, handleEnter } from "../../components/ReusableComponents/Atom";
import { startLink } from "../../constants/Constants";
import CostumInput from "../../components/ReusableComponents/CostumInput";
import CosutmCheckBox from "../../components/ReusableComponents/CheckBox/CosutmCheckBox";
import { Checkbox } from "@material-tailwind/react";
import SuccessError from "../../components/ReusableComponents/SuccessError";
import { Helmet } from "react-helmet";

const LessonsCreateAndEdit = () => {
  const [lessonById, setLessonById] = useState({
    name: "",
    description: "",
    gitHubLink: "",
  });
  const [[message, messageColor], setMessage] = useState([null, null])
  const [user, setUser] = useAtom(state.user);
  const [completedLessons, setCompletedLessons] = useAtom(state.completedLessons);
  const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks);
  const [completedModules, setCompletedModules] = useAtom(state.completedModules);
  const [checkBoxSelected, setCheckBoxSelected] = useState(0);

  const lessonName = useRef(null);
  const lessonDescription = useRef(null);
  const lessonGitHubLink = useRef(null);
  const optionalRef = useRef(null);

  const params = useParams();

  useEffect(() => {
    checkIfUserAdmin();
    document.addEventListener('keydown', (e) => handleEnter(e, params.lessonId ? editLesson : saveLesson)); // press enter to save
    if (params.lessonId !== undefined) {
      fetch(`${startLink}/lessons/findById/${params.lessonId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setLessonById(data);
          if (data.optional) {
            optionalRef.current.querySelector('input[type="checkbox"]').checked = true
            setCheckBoxSelected(checkBoxSelected + 1)
          }
        });
    }
  }, [params.lessonId]);

  function validateFields() {
    if (
      lessonName.current.value == "" ||
      lessonDescription.current.value == "" ||
      lessonGitHubLink.current.value == ""
    ) {
      setMessage(["Please fill in the required fields", "bg-red-500"]);
      return false;
    }
    return true
  }


  async function editLesson() {
    if(!validateFields()) return 

    try {
      const response = await fetch(
        `${startLink}/lessons/${params.lessonId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
          },
          body: JSON.stringify({
            name: lessonName.current.value,
            description: lessonDescription.current.value,
            gitHubLink: lessonGitHubLink.current.value,
            optional: optionalRef.current.querySelector('input[type="checkbox"]').checked,
          }),
        }
      );
      if (response.ok) {
        setMessage(["Lesson edited successfully!", "bg-green-500"]); // afisare mesaj
        setTimeout(() => { window.history.back() }, 2000); // Redirect after 2 seconds
      } else {
        console.log("Failed to update the lesson. ");
        setMessage(["Failed to update the lesson.", "bg-red-500"]);
      }
    } catch (error) {
      console.error("An unexpected error occured.Please try again.", error);
      setMessage(["Kata already exists or someting went wrong", "bg-red-500"]);
    }
  }

  async function saveLesson() {
    if(!validateFields()) return 
    try {
      const response = await fetch(`${startLink}/lessons`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
        },
        body: JSON.stringify({
          name: lessonName.current.value,
          description: lessonDescription.current.value,
          gitHubLink: lessonGitHubLink.current.value,
          optional: optionalRef.current.querySelector('input[type="checkbox"]').checked,
          week: {
            id: params.weekId,
            module: {
              id: params.moduleId,
            }
          },
        }),
      });
      if (response.ok) {
        let userId = user.id;
        getCompletedStuff({ userId, setCompletedLessons, setCompletedWeeks, setCompletedModules })
        setMessage(["Lesson created successfully!", "bg-green-500"]); // afisare mesaj
        setTimeout(() => { window.history.back() }, 2000); // Redirect after 2 seconds
      } else {
        setMessage(["Failed to create the lesson.", "bg-red-500"]);
      }
    } catch (error) {
      console.error("Failed to post the lesson.", error);
      setMessage(["An unexpected error occured.", "bg-red-500"]);
    }
  }

  return (
    <div id="wholePageHolderModule"
      className="flex justify-center items-center p-2 w-screen h-screen bg-center bg-cover" style={{ backgroundImage: "url(/images/backGrounds/online-programming-course-hero-section-bg.jpg)" }}>
      <Helmet>
        <meta charSet="utf8"/>
        <title> {params.lessonId !== undefined ? "Save" : "Create"} Lesson - CleanCodeQuest</title>
      </Helmet>
      <SuccessError setMessage={setMessage} message={message} color={messageColor} />

      <div id="formLesson" className="relative w-[24rem] flex flex-col items-center px-8 py-5 h-fit rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">

        {/* <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/colorLogo.svg" /> */}
        <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/ghost.svg" />
        <p className="text-2xl font-bold text-generalColors-dark-blue my-5"> {params.lessonId !== undefined ? "Edit your Lesson" : "Create new lesson"}</p>

        <div id="usernameContainer" className="flex items-center mb-6 w-full">
          <CostumInput
            id={"lessonName"}
            label={"Lesson Name"}
            inputRef={lessonName}
            defaultValue={lessonById.name}
            costumInputClass=""
            color="gray"
          />
        </div>

        <div id="passwordContainer" className="flex items-center mb-6 w-full">
          <CostumInput
            id={"lessonDescription"}
            label={"Lesson Description"}
            inputRef={lessonDescription}
            defaultValue={lessonById.description}
            costumInputClass=""
            color="gray"
          />
        </div>

        <div id="passwordContainer" className="flex items-center mb-6 w-full">
          <CostumInput
            id={"gitHubLink"}
            label={"Git Hub Link"}
            inputRef={lessonGitHubLink}
            defaultValue={lessonById.gitHubLink}
            costumInputClass=""
            color="gray"
          />
        </div>

        <div id="isOptionalInput" className="relative my-3  w-full min-w-[200px] flex items-center justify-end gap-2 rounded-lg font-bold text-generalColors-dark-blue">
          <label className="text-xl">
            Is lesson optional ?
          </label>
          {/* <CosutmCheckBox idNumber={1} defaultChecked={lessonById.optional} checkBoxRef={optional}/> */}
          <Checkbox
            style={{ backgroundColor: `${checkBoxSelected % 2 == 0 ? "#ffffff" : "#174072"}` }}
            onChange={() => setCheckBoxSelected(checkBoxSelected + 1)}
            className={`border-2 `}
            ref={optionalRef}
          />
        </div>

        <div className=" font-semibold flex items-center justify-center pt-3 pb-5">
          <button
            onClick={params.lessonId !== undefined ? editLesson : saveLesson}
            className="bg-generalColors-dark-blue text-white rounded-lg py-4 my-2 xs:my-0 px-8  bg-fifth  text-sixth mr-4 shadow-md shadow-fourth"
          >
            {params.lessonId !== undefined ? "Save" : "Create"}
          </button>
          <button onClick={() => window.history.back()} className=" my-2 xs:my-0 px-8 py-5 rounded-lg text-generalColors-dark-blue mr-4 shadow-md shadow-fourth">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default LessonsCreateAndEdit;
