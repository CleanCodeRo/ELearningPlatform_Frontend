import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import React, { useRef } from 'react'

export default function LessonCard({ id, name, description, gitHubLink }) {
    const lessonCard = useRef(null);

    const deleteLesson = () => {
        fetch(`http://localhost:8080/lessons?lessonId=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
          },
        }).then(() => {
            lessonCard.current.remove();
        });
      };



    const EditPen = () => {
        return (
            <Menu>
                <MenuHandler>
                    <i className="fa-solid fa-pen p-2 text-first bg-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,1)] rounded-xl duration-300 cursor-pointer mx-3"></i>
                </MenuHandler>
                <MenuList className=" bg-first bg-opacity-40 backdrop-blur-md border-0 text-sixth ">
                    <MenuItem
                        onClick={deleteLesson}
                        className="bg-first bg-opacity-80 mb-1"
                    >
                        <i className="fa-solid fa-trash-can mr-1" /> Delete
                    </MenuItem>
                    <MenuItem
                        onClick={() => console.log("todo")}
                        className="bg-first bg-opacity-80"
                    >
                        <i className="fa-solid fa-pen-to-square mr-1" /> Edit
                    </MenuItem>
                </MenuList>
            </Menu>
        )
    }




    return (
        <div  name="principleHolder" id={id} ref={lessonCard} className="flex flex-col justify-between bg-second p-3 m-3 rounded-xl">

            <div id="topPart" className='flex flex-col'>
                <div id="lessonTitle" className='flex items-center'>
                        <p className='my-3 text-3xl  line-clamp-2 w-full   font-bold'>{name}</p>
                    <EditPen />
                </div>
                <p id="description" className='my-3 line-clamp-5'>{description}</p>
            </div>


            <div name="bottomPart" id="redirectButtonAndStatus" className='flex justify-between items-center px-4 mt-6'>
                <a href={gitHubLink} target='_blank' className="cursor-pointer my-2 xs:my-0 px-6 py-4 bg-fourth rounded-lg text-light-green-50 mr-4 shadow-sm shadow-fifth text-xl">
                    Learn
                </a>
                <div id="status" className='py-2 px-3 rounded-xl bg-orange-800'>
                    DONE
                </div>

            </div>
        </div>

    )
}
