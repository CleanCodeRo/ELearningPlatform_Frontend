import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
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
        <div className="pt-5 pb-10 font-inter">
            <div>
            <p className="text-4xl p-4  font-bold">Lessons</p>

            {/* <p className="text-2xl p-4  font-bold">Week {params.weekId}</p> */}
            </div>
            
           
            <div className='grid grid-cols-4 '>
                {lessons != null ? lessons.map(lesson => <LessonCard id={lesson.id} name={lesson.name} description={lesson.description} gitHubLink={lesson.gitHubLink} />)
                    :
                    <div className='col-span-4'>
                        No week selected
                    </div>}
            </div>

        </div>
    )
}
