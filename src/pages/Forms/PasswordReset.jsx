import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startLink } from "../../constants/Constants";
import CostumInput from "../../components/ReusableComponents/CostumInput";
import { Checkbox } from "@material-tailwind/react";
import { handleEnter } from "../../components/ReusableComponents/Atom";
import SuccessError from "../../components/ReusableComponents/SuccessError";

let rememberMe = false

const PasswordReset = () => {
  const navigate = useNavigate();
  const [[message, messageColor], setMessage] = useState([null, null])
  const emailRef = useRef(null)
  
  useEffect(() => {
     document.addEventListener('keydown', (e) => handleEnter(e, login));
    // passwordRef.current.type = seePass % 2 != 0 ? "text" : "password"
    // emailRef.current.type = "email"
    // localStorage.setItem("ELearningToken", "Bearer"); // this is for the routes to not give null in function check
  })

  const login =() => {
    fetch(
      `${startLink}/users/auth/forgotPassword/${emailRef.current.value}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        
      }
    ).then(data => console.log(data));

  }


  return (
    <div id="wholePageHolder"
      className="flex justify-center items-center p-2 w-screen h-screen bg-center bg-cover" style={{ backgroundImage: "url(/images/backGrounds/online-programming-course-hero-section-bg.jpg)" }}>
      <SuccessError setMessage={setMessage} message={message} color={messageColor} />

      <div id="formLogin" className="relative w-[24rem] flex flex-col items-center px-8 py-5 h-fit rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">

        <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/ghost.svg" />

        <div id="emailContainer" className="flex items-center mb-6 w-full">
          <img alt="user" className="w-4 mr-3" src="/SVGs/user.svg" />
          <CostumInput
            id={"emailId"}
            label={"Email"}
            inputRef={emailRef}
            costumInputClass=""
            color="gray"

          />
        </div>

        <button id="loginButton" className=" bg-generalColors-dark-blue text-white rounded-full py-4 w-full" onClick={login}>Subbmit</button>
        
      </div>
    </div>
  );
};
export default PasswordReset;
