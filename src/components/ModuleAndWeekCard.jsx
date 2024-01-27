import React, { useRef } from "react";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
} from "@material-tailwind/react";

export default function ModuleAndWeekCard({id, title, subtitle, image }) {
    let moduleCard = useRef(null);

    const deleteModule = (e) =>{
        fetch(`http://localhost:8080/modules?moduleId=${id}`,{
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            'Authorization' : `Bearer ${localStorage.getItem("ELearningToken")}`
        },
      })
      .then(() => {
        moduleCard.current.remove();
      })
    }

    return (
        <div name="wholeCard" id={id} ref={moduleCard} className=" flex flex-col relative min-w-40  max-w-80  bg-fifth rounded-2xl mx-3 p-1 ">
            <div id="image" className=" h-32 w-full rounded-lg rounded-t-2xl bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
            <div id="title" className=" bg-first w-fit p-2 rounded-xl my-0  top-0" style={{ margin: '-16px 0 0 7px' }}> {title} </div>

            <div id="deleteAndModify" className="absolute top-2 right-2 p-1 text-first bg-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,1)] rounded-xl duration-300 cursor-pointer ">
                <Menu>
                    <MenuHandler>
                        <i className="fa-solid fa-pen p-1"></i>
                    </MenuHandler>
                    <MenuList className=" bg-first bg-opacity-40 backdrop-blur-md border-0 text-sixth ">
                        <MenuItem onClick={(e) => deleteModule(e)} className="bg-first bg-opacity-80 mb-1"><i className="fa-solid fa-trash-can mr-1" /> Delete</MenuItem>
                        <MenuItem className="bg-first bg-opacity-80"><i className="fa-solid fa-pen-to-square mr-1" /> Edit</MenuItem>
                    </MenuList>
                </Menu>
            </div>

            <div id="other info" className="flex flex-col p-2">
                <p id="subtitle" className="text-3xl">{subtitle}</p>

                <div id="three details" className="flex py-2 justify-between">
                    <div id="group Div For Flex" className="flex items-center">
                        <div id="time" className="flex items-center mr-4">
                            <i className="fa-solid fa-clock mr-1"></i>
                            <p>1h 53min</p>
                        </div>

                        <div id="rating" className="flex items-center mr-4">
                            <i className="fa-solid fa-star mr-1"></i>
                            <p>4.3/5</p>
                        </div>
                    </div>

                    <div id="price" className="flex items-center bg-black py-3 px-6 rounded-3xl">
                        <i className="fa-solid fa-dollar-sign "></i>
                        <p className="">18</p>
                    </div>
                </div>

            </div>
        </div>
    )
}