import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { startLink } from "../../constants/Constants";
import CostumInput from "../../components/ReusableComponents/CostumInput";
import { Checkbox } from "@material-tailwind/react";

export default function ModuleCreateAndEdit() {
  let moduleName = useRef(null);
  let moduleNumber = useRef(null);
  let navigate = useNavigate();

  const [error, setError] = useState(null);

  const [moduleById, setModuleById] = useState({
    name: "",
    number: "",
  });

  const params = useParams();

  useEffect(() => {
    if (params.moduleId !== undefined) {
      fetch(`${startLink}/modules/${params.moduleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setModuleById(data);
        })
        .catch(() => {
          navigate("/login")
        })
    }
  }, [params.moduleId]);

  const editModule = (e) => {

    fetch(`${startLink}/modules/${params.moduleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
      body: JSON.stringify({
        name: moduleName.current.value,
        number: moduleNumber.current.value,
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`Failed to update module: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/home");
      })
      .catch(() => {
        navigate("/login")
      })
  };

  const saveModule = () => {
    if (
      moduleName.current.value === "" ||
      moduleNumber.current.value === ""
    ) {
      setError("Please fill in the required fields");
      return;
    }

    fetch(`${startLink}/modules`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
      body: JSON.stringify({
        name: moduleName.current.value,
        number: moduleNumber.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/home");
      })
      .catch(() => {
        navigate("/login")
      })
  };

  return (
    <div id="wholePageHolderModule"
      className="flex justify-center items-center p-2 w-screen h-screen bg-center bg-cover" style={{ backgroundImage: "url(/images/backGrounds/online-programming-course-hero-section-bg.jpg)" }}>
      <div id="formLogin" className="relative w-[24rem] flex flex-col items-center px-8 py-5 h-fit rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">

        {/* <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/colorLogo.svg" /> */}
        <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/ghost.svg" />
        <p className="text-2xl font-bold text-generalColors-dark-blue my-5"> {params.moduleId !== undefined ? "Edit your Module" : "Create new module"}</p>

        <div id="usernameContainer" className="flex items-center mb-6 w-full">
          <CostumInput
            id={"moduleName"}
            label={"Module Name"}
            inputRef={moduleName}
            defaultValue={moduleById.name}
            costumInputClass=""
            color="gray"
          />
        </div>

        <div id="passwordContainer" className="flex items-center mb-6 w-full">
          <CostumInput
            id={"passwordId"}
            label={"Module Number"}
            inputRef={moduleNumber}
            defaultValue={moduleById.number}
            costumInputClass=""
            color="gray"
          />
        </div>

        <div className=" font-semibold flex items-center justify-center pt-3 pb-5">
          <button
            onClick={params.moduleId !== undefined ? editModule : saveModule}
            className="bg-generalColors-dark-blue text-white rounded-lg py-4 my-2 xs:my-0 px-8  bg-fifth  text-sixth mr-4 shadow-md shadow-fourth"
          >
            {params.moduleId !== undefined ? "Save" : "Create"}
          </button>
          <a href="/home">
            <button className=" my-2 xs:my-0 px-8 py-5 rounded-lg text-generalColors-dark-blue mr-4 shadow-md shadow-fourth">
              Cancel
            </button>
          </a>
        </div>

        


        {error && (
          <div className="text-red-500 flex justify-center">{error}</div>
        )}

      </div>
    </div>
  );
}
