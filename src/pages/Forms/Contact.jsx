import { useEffect, useRef, useState } from "react";
import CostumInput from "../../components/ReusableComponents/CostumInput";
import emailjs from 'emailjs-com';
import SuccessError from "../../components/ReusableComponents/SuccessError";

const Contact = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);


  useEffect(() => {
    emailRef.current.type = "email"
  })

  const sendMail = () => {
    if (
      fullNameRef.current.value != "" &&
      emailRef.current.value != "" &&
      messageRef.current.value != ""
    ) {
      let params = {
        from_name: fullNameRef.current.value,
        email: emailRef.current.value,
        message: messageRef.current.value
      };

      emailjs.send("service_2e65612", "template_o50nwpl", params, "0xmgmieFKpePRO7xl").then(() => {
        setSuccess("Email sent!"); // afisare mesaj
        setTimeout(() => {
          setSuccess(null); 
          window.location.href = "/"
        }, 2000);
      }).catch((err) =>{
        setError("Something went wrong!");
        setTimeout(() => {
          setError(null); 
        }, 2000);
      })
    }else{
      setError("Must complete all the fields!"); 
        setTimeout(() => {
          setError(null); 
        }, 2000);
    }
  }

  return (
    <div id="wholePageHolder"
      className="flex justify-center items-center p-2 w-screen h-screen bg-center bg-cover" style={{ backgroundImage: "url(/images/backGrounds/online-programming-course-hero-section-bg.jpg)" }}>
      <div id="formLogin" className="relative w-[24rem] flex flex-col items-center px-8 py-5 h-fit rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <SuccessError success={success} error={error}/>
        <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/ghost.svg" />


        <div id="fullNameContainer" className="flex items-center mb-6 w-full">
          <CostumInput
            id={"fullName"}
            label={"Full Name"}
            inputRef={fullNameRef}
            costumInputClass=""
            color="gray"

          />
        </div>

        <div id="emailContainer" className="flex items-center mb-6 w-full">
          <CostumInput
            id={"userEmailId"}
            label={"Your Email"}
            inputRef={emailRef}
            costumInputClass=""
            color="gray"

          />
        </div>

        <div id="messageContainer" className="flex items-center mb-6 w-full">
          <CostumInput
            id={"messageInput"}
            label={"Message"}
            inputRef={messageRef}
            costumInputClass=""
            color="gray"

          />
        </div>

        <div className="flex flex-row w-full justify-center gap-14 mt-10">
          <a href="/" className="  bg-generalColors-dark-blue text-white rounded-full py-4 px-7 " >Back</a>
          <button onClick={sendMail} className=" bg-generalColors-dark-blue text-white rounded-full py-4 px-7" >Send</button>
        </div>

      </div>
    </div>
  );
};
export default Contact;
