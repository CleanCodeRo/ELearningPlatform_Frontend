import React from 'react'

export default function LessonCard({id, name, description, gitHubLink}) {
  return (
    <div name="principleHolder" id={id} className="flex flex-col">
        <p id="lessonTitle" className='text-2xl'>{name}</p>
        <p id="description">{description}</p>
        <div id="redirectButtonAndStatus" className='flex justify-between items-center px-4'>
            <a href={gitHubLink} target='_blank' className=" my-2 xs:my-0 px-6 py-4 bg-fourth rounded-lg text-light-green-50 mr-4 shadow-sm shadow-[#20B486] text-xl">
                Learn
            </a>
            <div id="status" className='py-2 px-3 rounded-xl bg-purple-600'>
                DONE
            </div>
            
        </div>
    </div>

  )
}
