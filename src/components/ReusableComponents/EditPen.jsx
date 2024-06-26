import { Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react';
import React from 'react'

export default function EditPen({user, deleteEvent, editEvent}) {
    return (
        user && user.role == "ADMIN" ?
            <Menu>
                <MenuHandler>
                    <i onClick={(e) => e.stopPropagation()} className="fa-solid fa-pen p-2 text-first bg-white hover:bg-generalColors-light-gray rounded-xl duration-300 cursor-pointer mx-1 " ></i>
                </MenuHandler>
                <MenuList className=" bg-first bg-opacity-40 backdrop-blur-md border-0 text-sixth ">
                    <MenuItem
                        onClick={deleteEvent}
                        className="bg-first bg-opacity-80 mb-1"
                    >
                        <i className="fa-solid fa-trash-can mr-1" /> Delete
                    </MenuItem>
                    <MenuItem
                        onClick={editEvent}
                        className="bg-first bg-opacity-80"
                    >
                        <i className="fa-solid fa-pen-to-square mr-1" /> Edit
                    </MenuItem>
                </MenuList>
            </Menu> : null
    );
  
}
