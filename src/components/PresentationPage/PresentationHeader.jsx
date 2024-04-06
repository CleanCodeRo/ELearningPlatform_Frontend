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
      className="bg-gray-250 px-[6rem] font-inter relative"
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
            className=" bg-black font-inter shadow-2xl"
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
