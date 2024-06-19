import { useEffect, useRef, useState } from "react";
import CostumInput from "../../components/ReusableComponents/CostumInput";
import emailjs from 'emailjs-com';
import SuccessError from "../../components/ReusableComponents/SuccessError";
import { handleEnter } from "../../components/ReusableComponents/Atom";
import { Helmet } from "react-helmet";

const Contact = () => {
  const [[message, messageColor], setMessage] = useState([null,null])

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const sendButtonRef = useRef(null);


  useEffect(() => {
    document.addEventListener('keydown', (e) => handleEnter(e, sendMail)); // press enter to save
    emailRef.current.type = "email"
  })


  const sendMail = () => {
    sendButtonRef.current.disabled = true;

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
        setMessage(["Email sent!", "bg-green-500"]); // afisare mesaj
        setTimeout(() => {
          window.location.href = "/"
        }, 2000);
      }).catch((err) =>{
        setMessage(["Something went wrong!", "bg-red-500"]); // afisare mesaj
        console.error("Logged error Oli : " , err)
      })
    }else{
      setMessage(["Must complete all the fields!", "bg-red-500"]); // afisare mesaj
    }
  }

  return (
    <div id="wholePageHolder"
      className="flex justify-center items-center p-2 w-screen h-screen bg-center bg-cover" style={{ backgroundImage: "url(/images/backGrounds/online-programming-course-hero-section-bg.jpg)" }}>
      <div id="formLogin" className="relative w-[24rem] flex flex-col items-center px-8 py-5 h-fit rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
      <Helmet>
        <meta charSet="utf8"/>
        <title>Let's talk - CleanCodeQuest</title>
      </Helmet>
        
        <SuccessError message={message} color={messageColor} setMessage={setMessage}/>
        <img id="ghostImage" alt="ghost" className="w-[7rem] my-9" src="/SVGs/ghost.svg" />
        <p className="text-3xl text-center text-generalColors-dark-blue font-bold mb-6">Let's talk !</p>

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
          <a href="/" className="  bg-generalColors-dark-blue text-white rounded-xl py-4 px-7 " >Back</a>
          <button ref={sendButtonRef} onClick={sendMail} className=" bg-generalColors-dark-blue text-white rounded-xl py-4 px-7 disabled:opacity-80" >Send</button>
        </div>

      </div>
    </div>
  );
};
export default Contact;
