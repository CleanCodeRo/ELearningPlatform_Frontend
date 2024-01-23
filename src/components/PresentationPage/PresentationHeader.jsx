import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PresentationHeader = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "/users/auth/authenticate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login successful:", data);

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  return (
    <div id="PresentationHeader" className="bg-gray-250 px-[6rem] font-inter">
      <div className="flex justify-between items-center">
        <img
          draggable={false}
          className="w-28"
          src="/images/CleanCode-removebg-preview.png"
        />
        <div className="flex space-x-1.5">
          <div className="w-64 ">
            <div className="relative h-10 min-w-[200px] ">
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Username"
                className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
          </div>
          <div className="w-64">
            <div className="relative h-10 min-w-[200px] ">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className="peer h-full w-full rounded-[7px]  !border  !border-gray-300 border-t-transparent bg-transparent bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700  shadow-lg shadow-gray-900/5 outline outline-0 ring-4 ring-transparent transition-all placeholder:text-gray-500 placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2  focus:!border-gray-900 focus:border-t-transparent focus:!border-t-gray-900 focus:outline-0 focus:ring-gray-900/10 disabled:border-0 disabled:bg-blue-gray-50"
              />
            </div>
          </div>

          <Button
            id="loginButton"
            className="bg-fourth font-inter shadow-2xl"
            onClick={(event) => login(event)}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};
export default PresentationHeader;
