import React from "react";
import Button1 from "./Button1";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";

const PopoverElement = ({ text, path }) => {
  return (
    <a href="#">
      <button className="hover:bg-gray-300 text-lg font-bold text-black py-4 pl-4 w-full text-left">
        {text}
      </button>
    </a>
  );
};

export default function Header() {
  return (
    <div className="w-full bg-gray-200 shadow-lg flex items-center justify-between px-40">
      <div className="flex items-center">
        <img
          className="h-20 mx-1"
          src="/images/CleanCode-removebg-preview.png"
        />
        <Button1 text="Learn" event={() => {}} />
        <Button1 text="Review" event={() => {}} />
        <Button1 text="Feedback" event={() => {}} />
      </div>

      <Popover>
        <PopoverHandler>
          <Button
            variant="text"
            className="rounded-lg mx-1 text-base capitalize"
          >
            My Account
            <i className="fa-solid fa-chevron-down ml-2"></i>
          </Button>
        </PopoverHandler>
        <PopoverContent className="p-0 rounded-none">
          <div className="flex flex-col w-[18rem]">
            <PopoverElement text={"Profile"} path={"#"} />
            <PopoverElement text={"Modules"} path={"#"} />
            <PopoverElement text={"My Groups"} path={"#"} />
            <PopoverElement text={"Attendance"} path={"#"} />
            <PopoverElement text={"Self Assessment "} path={"#"} />
            <PopoverElement text={"Logout"} path={"/"} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
