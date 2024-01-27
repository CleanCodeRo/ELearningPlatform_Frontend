import React from "react";

export default function ModuleAndWeekCard({ title, subtitle, image }) {
    return (
        <div id="wholeCard" className=" flex flex-col relative min-w-40  max-w-80  bg-blue-700 rounded-2xl mx-3 p-1 ">
            {/* <div id="image" className=" h-32 w-full rounded-lg rounded-t-2xl bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div> */}
            <div id="image" className=" h-32 w-full rounded-lg rounded-t-2xl bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}></div>
            <div id="title" className=" bg-gray-800 w-fit p-2 rounded-xl my-0  top-0" style={{ margin: '-16px 0 0 7px' }}> {title} </div>

            <div id="deleteAndModify" className="absolute top-2 right-2 p-1 text-first bg-[rgba(60,60,60,0.3)] hover:bg-[rgba(255,255,255,0.8)] rounded-xl duration-300">
                <i className="fa-solid fa-pen mx-2"></i>
            </div>


            <div id="other info" className="flex flex-col p-2">
                <p id="subtitle" className="text-3xl">{subtitle}</p>

                <div id="three details" className="flex py-2 justify-between">
                    <div id="gourpDivForFlex" className="flex items-center">
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