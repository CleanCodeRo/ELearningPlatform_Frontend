import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const PresentationHeader = () => {
  const navigate = useNavigate();

  const checkLogin = () => {
    if (localStorage.getItem("ELearningToken")) {
      navigate("/home");
    } else {
      navigate("/login");
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
            className="bg-fourth font-inter shadow-2xl"
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
