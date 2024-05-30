import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startLink } from "../../constants/Constants";
import CostumInput from "../../components/ReusableComponents/CostumInput";
import { Checkbox } from "@material-tailwind/react";
import { handleEnter } from "../../components/ReusableComponents/Atom";
import SuccessError from "../../components/ReusableComponents/SuccessError";
import { Helmet } from "react-helmet";

let rememberMe = false

const Login = () => {
  const navigate = useNavigate();
  const [[message, messageColor], setMessage] = useState([null, null])
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const loginButtonRef = useRef(null)
  const rememberMeRef = useRef(null)

  const [checkBoxSelected, setCheckBoxSelected] = useState(0);
  const [seePass, setSeePass] = useState(0);

  const rememberEvent = () => {
    setCheckBoxSelected(checkBoxSelected + 1)
    rememberMe = rememberMe ? false : true;
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => handleEnter(e, login));
    passwordRef.current.type = seePass % 2 != 0 ? "text" : "password"
    emailRef.current.type = "email"
    localStorage.setItem("ELearningToken", "Bearer"); // this is for the routes to not give null in function check
  })

  async function login() {
    if (emailRef.current.value == "" || passwordRef.current.value == "") {
      setMessage(["Email and password are required", "bg-red-500"]);
      return;
    }

    try {
      const response = await fetch(
        `${startLink}/users/auth/authenticate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailRef.current.value.trim(),
            password: passwordRef.current.value,
            rememberMe: rememberMeRef.current.checked,
          }),
        }
      );

      if (!response.ok) {
        console.log(response)
        setMessage(["Incorrect email or password", "bg-red-500"]);
      } else {
        const data = await response.json();
        const token = data.response;
        localStorage.setItem("ELearningToken", token);

        setMessage(["Login successfully!", "bg-green-500"]); // afisare mesaj
          navigate("/home");
          window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage(["Incorrect email or password", "bg-red-500"]);
    }
  }

  const seePassEvent = () => {
    setSeePass(seePass + 1);
  }

  return (
    <div id="wholePageHolder"
      className="flex justify-center items-center p-2 w-screen h-screen bg-center bg-cover" style={{ backgroundImage: "url(/images/backGrounds/online-programming-course-hero-section-bg.jpg)" }}>
      <Helmet>
        <meta charSet="utf8"/>
        <title>Login - CleanCodeQuest</title>
      </Helmet>
      
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

        <div id="passwordContainer" className="flex items-center mb-6 w-full">
          <img alt="password" className="w-4 mr-3" src="/SVGs/password.svg" />
          <CostumInput
            id={"passwordId"}
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

        <button ref={loginButtonRef} id="loginButton" className=" bg-generalColors-dark-blue text-white rounded-full py-4 w-full" onClick={login}>LOGIN</button>

        <div id="rememberAndForget" className="w-full flex flex-row items-center justify-between text-generalColors-dark-blue mb-20">
          <div id="checkbox" className="flex items-center w-fit">
            <Checkbox
              style={{ backgroundColor: `${checkBoxSelected % 2 == 0 ? "#ffffff" : "#174072"}` }}
              onChange={rememberEvent} className={`border-2 `}
              inputRef={rememberMeRef} />
            <label className="text-sm ">Remember Me</label>
          </div>

          <button onClick={() => navigate("/forgotPassword")} className="text-sm">Forgot Password?</button>
        </div>

        <div className=" h-6 w-full relative text-white ">
          <i className="fa-solid fa-question bg-generalColors-dark-blue absolute right-0 rounded-full w-6 h-6 flex items-center justify-center text-xs"></i>
        </div>
      </div>
    </div>
  );
};
export default Login;
