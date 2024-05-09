import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startLink } from "../../constants/Constants";
import CostumInput from "../../components/ReusableComponents/CostumInput";
import { Checkbox } from "@material-tailwind/react";

let rememberMe = false

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const rememberMeRef = useRef(null)

  const [checkBoxSelected, setCheckBoxSelected] = useState(0);
  const [seePass, setSeePass] = useState(0);

  const rememberEvent = () => {
    setCheckBoxSelected(checkBoxSelected + 1)
    rememberMe = rememberMe ? false : true;
  }

  useEffect(() => {
    passwordRef.current.type = seePass % 2 != 0 ? "text" : "password"
   // passwordRef.current.value = 1234
    emailRef.current.type = "email"
   // emailRef.current.value = "student@"
    localStorage.setItem("ELearningToken", "Bearer");
  })

  async function login(e) {
    e.preventDefault();
    e.target.disabled = true

    if (emailRef.current.value == "" || passwordRef.current.value == "") {
      setError("Email and password are required");
      e.target.disabled = false
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
            rememberMe : rememberMeRef.current.checked,
          }),
        }
      );

      if (!response.ok) {
        console.log(response);
        setError("Incorrect email or password");
        e.target.disabled = false
      } else {
        setError(null);
        const data = await response.json();
        const token = data.response;

        localStorage.setItem("ELearningToken", token);
        navigate("/home");
        window.location.reload();

      }
    } catch (error) {
      console.error("Login error:", error);
      e.target.disabled = false
    }
  }

  const seePassEvent = () =>{
    setSeePass(seePass + 1);
  }

  return (
    <div id="wholePageHolder"
      className="flex justify-center items-center p-2 w-screen h-screen bg-center bg-cover" style={{ backgroundImage: "url(/images/backGrounds/online-programming-course-hero-section-bg.jpg)" }}>
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
               { seePass % 2 == 0 ?
                <i className ="fa-solid fa-eye"></i>
                :
                <i className ="fa-solid fa-eye-slash"></i>}
              </div>
            }
          />
        </div>

        <button className=" bg-generalColors-dark-blue text-white rounded-full py-4 w-full" onClick={login}>LOGIN</button>

        <div id="rememberAndForget" className="w-full flex flex-row items-center justify-between text-generalColors-dark-blue mb-20">
          <div id="checkbox" className="flex items-center w-fit">
            <Checkbox 
                style={{ backgroundColor: `${checkBoxSelected % 2 == 0 ? "#ffffff" : "#174072"}` }} 
                onChange={rememberEvent} className={`border-2 `} 
                inputRef={rememberMeRef}/>
            <label className="text-sm ">Remember Me</label>
          </div>

          <i className="text-sm">Forgot Password?</i>
        </div>

        <div className=" h-6 w-full relative text-white ">
          <i className="fa-solid fa-question bg-generalColors-dark-blue absolute right-0 rounded-full w-6 h-6 flex items-center justify-center text-xs"></i>
        </div>


        {error && (
          <div className="text-red-500 flex justify-center">{error}</div>
        )}

      </div>
    </div>
  );
};
export default Login;
