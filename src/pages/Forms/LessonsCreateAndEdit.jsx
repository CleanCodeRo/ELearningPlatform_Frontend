import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

const LessonsCreateAndEdit = () => {
 
  const [error, setError] = useState(null);

  const lessonName = useRef(null);
  const lessonDescription = useRef(null);
  const lessonGitHubLink = useRef(null);

  const params = useParams();

  const [lessonById, setLessonById] = useState({
    name: "",
    description: "",
    gitHubLink: "",
  });

  useEffect(() => {
    if (params.lessonId !== undefined) {
      fetch(`http://localhost:8080/lessons/findById/  ${params.lessonId}`, {
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
        });
    }
  }, [params.lessonId]);

  async function updateLesson(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/lessons/${params.lessonId}`,
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
          }),
        }
      );
      if (response.ok) {
        console.log(response);
        await response.json();
        window.history.back();
      } else {
        console.log("Failed to update the lesson. ");
      }
    } catch (error) {
      console.error("An unexpected error occured.Please try again.", error);
    }
  }

  async function postLesson(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/lessons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
        },
        body: JSON.stringify({
          name: lessonName.current.value,
          description: lessonDescription.current.value,
          gitHubLink: lessonGitHubLink.current.value,
          week: {
            id: params.weekId,
          },
        }),
      });
      if (response.ok) {
        await response.json();
        window.history.back();
        console.log("Lesson succesfully created!");
      } else {
        setError("Failed to create the lesson.");
      }
    } catch (error) {
      console.error("Failed to post the lesson.", error);
      setError("An unexpected error occured.Please try again.");
    }
  }

  return (
    <div className="flex justify-center items-center p-2 w-screen h-screen font-inter">
      <div className="relative flex w-96 h-fit flex-col rounded-xl bg-gray-300 bg-clip-border text-gray-700 shadow-md">
        <div className="flex justify-center">
          <img src="/images/CleanCode-removebg-preview.png" />
        </div>

        <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-cyan-600 to-cyan-400 bg-clip-border text-white shadow-lg shadow-cyan-500/40">
          <h3 className="block  text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
            {params.lessonId !== undefined
              ? "Edit your lesson"
              : "Add a new lesson"}
          </h3>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              type="text"
              ref={lessonName}
              defaultValue={lessonById.name}
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Name
            </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              type="text"
              ref={lessonDescription}
              defaultValue={lessonById.description}
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Description
            </label>
          </div>
          <div className="relative h-11 w-full min-w-[200px]">
            <input
              type="text"
              ref={lessonGitHubLink}
              defaultValue={lessonById.gitHubLink}
              className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-cyan-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-cyan-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-cyan-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-cyan-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              GitHub Link
            </label>
          </div>
        </div>
        {error && (
          <div className="text-red-500 flex justify-center font-inter">
            {error}
          </div>
        )}

        <div className="p-6 pt-0 ">
          <button
            data-ripple-light="true"
            type="button"
            onClick={params.lessonId === undefined ? postLesson : updateLesson}
            className="block w-full select-none rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center align-middle  text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            {params.lessonId !== undefined ? "Save" : "Create"}
          </button>
          <button
            data-ripple-light="true"
            type="button"
            onClick={() => window.history.back()}
            className="block w-full select-none mt-1 rounded-lg bg-gradient-to-tr from-cyan-600 to-cyan-400 py-3 px-6 text-center align-middle  text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
export default LessonsCreateAndEdit;
