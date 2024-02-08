import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";

const PresentationHeader = () => {
  const navigate = useNavigate();

  const checkLogin = () => {    
    console.log("expiredToken " + isExpired(localStorage.getItem("ELearningToken")))
    if (isExpired(localStorage.getItem("ELearningToken"))) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  };

  return (
    <div
      id="PresentationHeader"
      className="bg-gray-250 shadow-md px-[6rem] font-inter relative"
    >
      <div className="flex justify-between items-center">
        <img
          draggable={false}
          className="w-28"
          src="/images/CleanCode-removebg-preview.png"
        />
        <div className="flex space-x-1.5">
          <Button
            id="loginButton"
            className="bg-secondary text-center hover:bg-accent transition-all duration-300 ease-in-out hover:text-quaternary"
            onClick={() => checkLogin()}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PresentationHeader;
