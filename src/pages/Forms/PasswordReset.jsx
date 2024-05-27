import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { startLink } from "../../constants/Constants";
import CostumInput from "../../components/ReusableComponents/CostumInput";
import { handleEnter } from "../../components/ReusableComponents/Atom";
import SuccessError from "../../components/ReusableComponents/SuccessError";
import { isExpired } from "react-jwt";

const PasswordReset = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [[message, messageColor], setMessage] = useState([null, null]);
  const [seePass, setSeePass] = useState(0);

  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);

  const sendNewPassword = useCallback(() => {
    if (passwordRef.current.value == repeatPasswordRef.current.value) {
      fetch(`${startLink}/users/reset_CleanCode_password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${params.token}`,
        },
        body: JSON.stringify({password : passwordRef.current.value})
      })
        .then((response) => {
          if (response.ok) {
            setMessage(["New password saved!", "bg-green-500"])
            setTimeout(() => navigate("/login"), 2000) ;
          } else {
            // Handle errors here if needed
            setMessage(["Failed to send reset email", "bg-red-500"])
            console.error("Failed to send reset email");
          }
        })
        .catch((error) => {
          console.error("Error sending reset email:", error);
        });
    }else{
      setMessage(["The passwords must match!", "bg-red-500"])
    }
  }, [navigate]);

  useEffect(() => {
    if(isExpired(params.token)){
      navigate("/")
    }

    passwordRef.current.type = seePass % 2 != 0 ? "text" : "password"
    repeatPasswordRef.current.type = seePass % 2 != 0 ? "text" : "password"
 
    const handleKeyDown = (e) => handleEnter(e, sendNewPassword);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  
  }, [sendNewPassword]);


  useEffect(() => {
    passwordRef.current.required = true
    repeatPasswordRef.current.required = true
    passwordRef.current.type = seePass % 2 != 0 ? "text" : "password"
    repeatPasswordRef.current.type = seePass % 2 != 0 ? "text" : "password"
  });

  
  const seePassEvent = () => {
    setSeePass(seePass + 1);
  }

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
          sendNewPassword()
        }}
      >
        <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/ghost.svg" />

        <div id="newPassContainer" className="flex items-center mb-6 w-full">
          <img alt="password" className="w-4 mr-3" src="/SVGs/password.svg" />
          <CostumInput
            id={"newPass"}
            label={"Password"}
            inputRef={passwordRef}
            costumInputClass=""
            color="gray"
            icon={
              <div className="" onClick={seePassEvent}>
                {seePass % 2 == 0 ?
                  <i className="fa-solid fa-eye"></i>
                  :
                  <i className="fa-solid fa-eye-slash"></i>}
              </div>
            }
          />
        </div>

        <div id="repeatNewPassContainer" className="flex items-center mb-6 w-full">
          <img alt="password" className="w-4 mr-3" src="/SVGs/password.svg" />
          <CostumInput
            id={"repeatNewPass"}
            label={"Repeat Password"}
            inputRef={repeatPasswordRef}
            costumInputClass=""
            color="gray"
            icon={
              <div className="" onClick={seePassEvent}>
                {seePass % 2 == 0 ?
                  <i className="fa-solid fa-eye"></i>
                  :
                  <i className="fa-solid fa-eye-slash"></i>}
              </div>
            }
          />
        </div>

        <button type="submit" id="submitReset" className="bg-generalColors-dark-blue text-white rounded-full py-4 w-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PasswordReset;
