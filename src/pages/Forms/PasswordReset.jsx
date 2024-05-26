import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { startLink } from "../../constants/Constants";
import CostumInput from "../../components/ReusableComponents/CostumInput";
import { handleEnter } from "../../components/ReusableComponents/Atom";
import SuccessError from "../../components/ReusableComponents/SuccessError";

const PasswordReset = () => {
  const navigate = useNavigate();
  const [[message, messageColor], setMessage] = useState([null, null]);
  const emailRef = useRef(null);

  const sendResetEmail = useCallback(() => {
    if (emailRef.current && emailRef.current.value !== "") {
      fetch(`${startLink}/users/auth/forgotPassword/${emailRef.current.value.trim()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            navigate("/login");
          } else {
            // Handle errors here if needed
            console.error("Failed to send reset email");
          }
        })
        .catch((error) => {
          console.error("Error sending reset email:", error);
        });
    }
  }, [navigate]);

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.required = true;
    }
    const handleKeyDown = (e) => handleEnter(e, sendResetEmail);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [sendResetEmail]);

  return (
    <div
      id="wholePageHolder"
      className="flex justify-center items-center p-2 w-screen h-screen bg-center bg-cover"
      style={{ backgroundImage: "url(/images/backGrounds/online-programming-course-hero-section-bg.jpg)" }}
    >
      <SuccessError setMessage={setMessage} message={message} color={messageColor} />

      <form
        id="formLogin"
        className="relative w-[24rem] flex flex-col items-center px-8 py-5 h-fit rounded-xl bg-white bg-clip-border text-gray-700 shadow-md"
        onSubmit={(e) => {
          e.preventDefault();
          sendResetEmail();
        }}
      >
        <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/ghost.svg" />

        <div id="emailContainer" className="flex items-center mb-6 w-full">
          <img alt="user" className="w-4 mr-3" src="/SVGs/user.svg" />
          <CostumInput
            id="emailId"
            label="Email"
            inputRef={emailRef}
            costumInputClass=""
            color="gray"
          />
        </div>

        <button type="submit" id="loginButton" className="bg-generalColors-dark-blue text-white rounded-full py-4 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
