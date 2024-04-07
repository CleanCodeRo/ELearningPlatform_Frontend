import React from 'react'

export default function ProgressBar({progressBarLength}) {
    return (
        <div id="progressBar" className="flex items-center bg-third justify-center h-3 w-full  rounded-lg relative">

            <div className='flex items-center w-full h-full bg-red-500 absolute right-0 transition-all duration-[1s] ease-out rounded-lg' style={{ width: `${100 - progressBarLength}%` }}>
              {progressBarLength == null || progressBarLength == 0 || progressBarLength >= 100 ? null : 
                <div className='flex items-center justify-center -ml-4 bg-generalColors-light-gray w-7 h-5 border-2 rounded-xl text-generalColors-dark-grey text-[8.2px] font-bold'>
                    {progressBarLength}%
                </div>}
            </div>

            <div className={`w-full h-full rounded-lg left-0 top-0 transition-all duration-[1s] ease-out ${progressBarLength >= 100 ? "bg-secondaryColors-dark-green" : "bg-gradient-to-r from-secondaryColors-dark-green to-generalColors-medium-yellow"} `}></div>
        </div>
    )
}
