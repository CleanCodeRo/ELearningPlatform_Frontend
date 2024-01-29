import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import LessonCard from './LessonCard';

export default function Lessons() {
    const [lessons, setLessons] = useState(null);
    const params = useParams();

    useEffect(() => {
        if (params.weekId) {
            fetch(`http://localhost:8080/lessons/${params.weekId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setLessons(data)
                })
        }
    }, [params.weekId])


    return (
        <div className="pt-5 pb-10 px-5 font-inter">
            <div className=' flex items-center'>
                <p className="text-4xl p-4 font-bold">Lessons</p>
                <Link to={`#`}>
                    <button
                        className="h-10 w-10 rounded-full bg-fifth flex items-center justify-center text-xl mx-2"
                    >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </Link>

                {/* <p className="text-2xl p-4  font-bold">Week {params.weekId}</p> */}
            </div>


            <div className='grid grid-cols-3 '>
                {lessons != null ? lessons.map((lesson, index) => <LessonCard key={index} id={lesson.id} name={lesson.name} description={lesson.description} gitHubLink={lesson.gitHubLink} />)
                    :
                    <div className='col-span-4 text-4xl text-center my-10'>
                       - No week selected -
                    </div>}
            </div>

        </div>
    )
}
