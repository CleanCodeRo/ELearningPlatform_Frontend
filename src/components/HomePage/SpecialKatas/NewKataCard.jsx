import { Navigate } from "react-router";
import Stars from "./Stars";
import {
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
  } from "@material-tailwind/react";

export default function NewKataCard({ kata , userRole}) {

    const EditPen = () => {
        return (
          userRole.role == "ADMIN" ?
            <Menu>
              <MenuHandler>
                <i className="fa-solid fa-pen p-2 text-first bg-[rgba(167,166,166,0.7)] hover:bg-[rgba(255,255,255,1)] rounded-xl duration-300 cursor-pointer mx-3"></i>
              </MenuHandler>
              <MenuList className=" bg-first bg-opacity-40 backdrop-blur-md border-0 text-sixth ">
                <MenuItem
                  onClick={(e) => {  }}
                  className="bg-first bg-opacity-80 mb-1"
                >
                  <i className="fa-solid fa-trash-can mr-1" /> Delete
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    Navigate(
                      `/home`
                    );
                  }}
                  className="bg-first bg-opacity-80"
                >
                  <i className="fa-solid fa-pen-to-square mr-1" /> Edit
                </MenuItem>
              </MenuList>
            </Menu> : null
        );
      };

    let maxPoints = 48;
    return (
        <div id="cardHolder" className=" w-64 h-fit bg-[#fceeca] flex flex-col items-center border-2 border-[#aa6b48] rounded-2xl " >
            <div className="grid grid-cols-2">
            <p id="title" className="text-[#0b0f1b] mt-2 font-ninja">{kata.title}</p>
            <div id="editPenInsideKata" className="">
            <EditPen  />
            </div>
            </div>
            
            <div id="theme" className="w-48 h-32 mt-2 rounded-xl flex items-center justify-center  border-2 shadow-md border-[#aa6b48]" style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/surprising-luxurious-background-design-with-golden-lotus-lotus-flowers-line-art-design-wallpaper-generative-ai_779468-4131.jpg')`, backgroundPosition: 'center' }}>
                <img src="/public/images/Swords.png" className=" w-48 absolute z-2 pb-3"></img>

            </div>


            <div id="stars" className="text-[#0b0f1b] mt-2 flex flex-row z-10">
                {[...Array(8)].map((_, index) => (
                    <Stars key={index} color={index < kata.level ? '#e98735' : '#806A5F'} />
                ))}
            </div>

            <p className="text-[#0b0f1b] text-start relative flex items">Training details</p>
            <div id="Details" className="text-[#0b0f1b] flex !flex-row">
                <div id="leftDetails" className="mr-1 border-2 rounded-xl border-[#aa6b48] min-w-32">
                    {/* <p id="tags" className="ml-1">Fndamentals</p>
                    <p id="tags" className="ml-1">Mathematics</p>
                    <p id="tags" className="ml-1">Algorithm</p> */}

                    {kata.category?.map((category, index) => (
                    <p id="tags" key={index} className="ml-1">{category}</p>
                ))}

                </div>
                <div id="rightDetails" className=" border-2 rounded-xl border-[#aa6b48] min-w-24">
                    <p id="pointsPerCompetion" className="ml-1 mt-1">Rank: {maxPoints/8 * kata.level}</p>
                    <p id="status" className="ml-1">Status</p>
                </div>


            </div>
            <div id="buttonsContainer" className="grid grid-cols-2 mt-4 mb-4">
                <button id="markedAsDone" className="text-[#0b0f1b] border border-[#aa6b48] rounded-full w-2/5 font-ninja left-0">Done</button>
                <a id="beginTraining" className="text-[#0b0f1b]  border border-[#aa6b48] rounded-full w-24 font-ninja flex items-center justify-center" href={kata.kataLink} target="_blank">Train</a>
            </div>

        </div>
    );

}


{/* <img src="https://img.freepik.com/premium-photo/surprising-luxurious-background-design-with-golden-lotus-lotus-flowers-line-art-design-wallpaper-generative-ai_779468-4131.jpg" /> */ }