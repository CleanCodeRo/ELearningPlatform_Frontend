import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialHandler,
  Tooltip,
} from "@material-tailwind/react";
import state, { getUserWithToken } from "./ReusableComponents/Atom";
import { useAtom } from "jotai";

let animateTooltip = {
  mount: { scale: 1, x: 5 },
  unmount: { scale: 0, x: 80 },
};

let classNameTooltip = "text-lg bg-opacity-80 font-bold ";

export default function SideHeader() {
  const navigate = useNavigate();
  const [user, setUser] = useAtom(state.user);
  const [completedLessons, setCompletedLessons] = useAtom(
    state.completedLessons
  );
  const [completedWeeks, setCompletedWeeks] = useAtom(state.completedWeeks);
  const [completedModules, setCompletedModules] = useAtom(state.completedModules);

  let classNameTooltip = "text-lg bg-opacity-80 font-bold "
  let iconClassName = `flex items-center justify-center rounded-full w-[40px] h-[40px] sm:w-[50px] sm:h-[50px]  mb-4 mt-7  cursor-pointer fill-white hover:fill-generalColors-medium-blue`

  useEffect(() => {
    if (!user) {
      getUserWithToken(localStorage.getItem("ELearningToken"), setUser, setCompletedLessons, setCompletedWeeks, setCompletedModules)
      console.log("user recived use effect")
    }
  }, []);

  const MenuIcon = ({ pathChildren, iconEvent, toolTipContent }) => {
    return (
      <Tooltip className={classNameTooltip} content={toolTipContent} placement={"right"}
        animate={animateTooltip}>
        <div
          onClick={iconEvent}
          id={toolTipContent}
          className={`${iconClassName} `}
        >
          {pathChildren}
        </div>
      </Tooltip>
    )
  }

  return (


    <div id="SideHeaderHolder"
      className={`flex md:flex-col justify-between md:min-w-[5rem] md:h-screen  md:sticky md:top-0 border-r-[1px] border-generalColors-light-gray bg-generalColors-dark-blue 
                    h-[4rem] bottom-0 w-screen fixed items-center  z-50 overflow-visible `}
      style={{ boxShadow: "1px 0px 5px 3px #BEBCBF", clipPath: "inset(0px -9px 0px 0px)" }}
    >


      <div id="logoAndHamburgerMenu" className=" ml-7 md:ml-0 mt-0 md:mt-7 flex items-center z-20">
        {/* <div className="bg-transparent" ><i className="fa-solid fa-bars flex sm:hidden text-black text-2xl mr-2 "></i></div> */}
        <div className="relative h-80 w-full">
      <div className="absolute bottom-0 right-0">
        <SpeedDial>
          <SpeedDialHandler>
            <IconButton size="lg" className="rounded-full">
              <i className="fa-solid fa-bars flex sm:hidden text-black text-2xl mr-2 " />
            </IconButton>
          </SpeedDialHandler>
          <SpeedDialContent>
            <SpeedDialAction>
            <i className="fa-solid fa-bars flex sm:hidden text-black text-2xl mr-2 "/>
            </SpeedDialAction>
            <SpeedDialAction>
            <i className="fa-solid fa-bars flex sm:hidden text-black text-2xl mr-2 "/>
            </SpeedDialAction>
            <SpeedDialAction>
            <i className="fa-solid fa-bars flex sm:hidden text-black text-2xl mr-2 "/>
            </SpeedDialAction>
          </SpeedDialContent>
        </SpeedDial>
        </div>
    </div>
        <img draggable={false} onClick={() => navigate("/home")} id="CleanCodeLogo" alt="CleanCodeLogo" className=" w-[3rem]" src="/SVGs/colorLogo.svg"></img>
      </div>

      <div id="iconsHolder" className="hidden sm:flex flex-row md:flex-col  gap-3 xs:gap-5 md:!gap-0 z-10">
        <MenuIcon pathChildren={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
          >
            <g fillRule="nonzero">
              <g transform="scale(4,4)">
                <path d="M21,13c-4.98,0-8.40906,1.93839-10.28906,3.40039c-1.085,0.844-1.71094,2.14258-1.71094,3.51758v29.1543c0,1.104 0.90858,1.90234 1.89258,1.90234c0.32,0 0.64612,-0.08453 0.95313,-0.26953c2.141,-1.292 5.3533,-2.70508 9.1543,-2.70508c2.973,0 5.40375,0.90245 7.21875,1.93945c1.173,0.671 2.47725,1.00586 3.78125,1.00586c1.304,0 2.60825,-0.33486 3.78125,-1.00586c1.815,-1.037 4.24575,-1.93945 7.21875,-1.93945c3.801,0 7.0133,1.41213 9.1543,2.70313c0.307,0.185 0.63412,0.26953 0.95313,0.26953c0.984,0 1.89258,-0.79639 1.89258,-1.90039v-29.1543c0,-1.375-0.62594,-2.67358-1.71094,-3.51758c-1.88,-1.462-5.30906,-3.40039-10.28906,-3.40039c-8,0-11,4-11,4c0,0-3,-4-11,-4zM21,17c4.10959,0 7.1588,2.04695 9,3.73633v25.23047c-1.83626,-0.89025-4.8779,-1.9668-9,-1.9668c-3.061,0-5.785,0.73139-8,1.65039v-25.92773c0,0 3.028,-2.72266 8,-2.72266zM43,17c4.991,0 8,2.69141 8,2.69141v25.95899c-2.215,-0.919-4.939,-1.65039-8,-1.65039c-4.11464,0-7.1609,1.07812-9,1.96875v-25.23437c1.84032,-1.68904 4.88834,-3.73437 9,-3.73437z"></path>
              </g>
            </g>
          </svg>
        }
          toolTipContent={"Courses"}
          iconEvent={() => navigate("/home")}>
        </MenuIcon>

        <MenuIcon pathChildren={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 256 256"
          >
            <g fillRule="nonzero">
              <g transform="scale(4,4)">
                <path d="M41.148,14h-18.296c-0.47,0-0.852,0.382-0.852,0.852v32.36c0,0.297 0.357,0.448 0.57,0.241l8.557,-8.303c0.487,-0.472 1.26,-0.472 1.747,0l8.557,8.303c0.212,0.207 0.569,0.056 0.569,-0.24v-32.36c0,-0.471-0.382,-0.853-0.852,-0.853zM41.148,10c2.679,0 4.852,2.173 4.852,4.852v37.46c0,1.925-2.314,2.903-3.695,1.563l-10.305,-9.998l-10.305,9.999c-1.381,1.34-3.695,0.361-3.695,-1.563v-37.46c0,-2.68 2.173,-4.853 4.852,-4.853z"></path>
              </g>
            </g>
          </svg>
        }
          toolTipContent={"LeaderBoard"}
          iconEvent={() => navigate("/leaderboard")}>
        </MenuIcon>

        <MenuIcon pathChildren={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="-50 -20 512 512"
            xmlSpace="preserve"
            stroke="#ffffff"
          >
            <g>
              <g transform="scale(0.8,0.8)">
                <path d="M327.102,273.972l25.935-25.935l11.851,11.851c3.272,3.272,7.562,4.909,11.85,4.909s8.578-1.636,11.85-4.909 c6.545-6.545,6.545-17.156,0-23.7l-11.851-11.851L507.091,93.982c6.545-6.545,6.545-17.156,0-23.7L459.69,22.881 c-6.544-6.545-17.156-6.545-23.7,0c-6.628,6.628-123.568,123.568-130.354,130.354l-11.851-11.851 c-6.544-6.545-17.156-6.545-23.7,0s-6.545,17.156,0,23.7l11.851,11.851c-6.544,6.546-6.544,17.157,0,23.702 c-6.544,6.545-17.156,6.545-23.7,0l-11.851-11.851C199.579,146.449,82.639,29.509,76.011,22.88 c-6.544-6.545-17.156-6.545-23.7,0L4.909,70.282c-6.545,6.545-6.545,17.156,0,23.7l130.354,130.354l-11.851,11.851 c-6.545,6.545-6.545,17.156,0,23.7c6.544,6.545,17.156,6.546,23.7,0l11.851-11.851l25.936,25.936L4.909,453.961 c-7.908,7.907-5.982,21.2,3.809,26.554c16.34,8.937,34.263,13.513,52.575,13.513c28.21,0,56.36-10.606,77.995-32.241 l116.713-116.713l116.713,116.713c21.655,21.655,49.814,32.241,77.995,32.241c18.311,0,36.236-4.577,52.575-13.513 c9.81-5.364,11.701-18.662,3.809-26.554L327.102,273.972z M447.841,58.431l23.701,23.7l-23.701,23.7l-23.7-23.7L447.841,58.431z M400.44,105.833l23.7,23.7l-23.702,23.702l-23.7-23.7L400.44,105.833z M353.038,153.234l23.7,23.7l-23.7,23.7l-23.7-23.7 L353.038,153.234z M40.46,82.132l23.7-23.7l23.7,23.7l-23.7,23.7L40.46,82.132z M111.562,153.234l-23.702-23.702l23.7-23.7 l23.702,23.702L111.562,153.234z M158.963,200.635l-23.7-23.7l23.7-23.7l23.7,23.7L158.963,200.635z M182.665,224.335l23.7-23.7 l25.936,25.935L208.6,250.271L182.665,224.335z M115.586,438.086c-18.122,18.123-44.025,25.567-68.403,21.001l258.453-258.452 l23.701,23.7L115.586,438.086z M396.414,438.087L279.701,321.373l23.702-23.702l161.415,161.417 C440.439,463.657,414.537,456.208,396.414,438.087z"></path>
              </g>
            </g>
          </svg>
        }
          toolTipContent={"Dojo"}
          iconEvent={() => navigate("/dojo/0")}>

        </MenuIcon>

        {user?.role == "ADMIN" &&
          <MenuIcon pathChildren={
            <img draggable={false} className="w-[2rem]" src="/SVGs/statusSVGs/closed.svg"></img>
          }
            toolTipContent={"Permisions"}
            iconEvent={() => navigate("/permissions")}
          >

          </MenuIcon>
        }
      </div>

      <Avatar
        onClick={() => navigate("/myprofile")}
        variant="circular"
        alt="tania andrew"
        className="cursor-pointer mr-7 md:mr-0 mb-0 md:mb-7"
        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
      />
    </div>
  );
}
