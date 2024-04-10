import React, { useState } from 'react'
import SideHeader from '../components/SideHeader'
import Lessons from '../components/ShowModule/Lessons'
import { useAtom } from 'jotai';
import state from '../components/ReusableComponents/Atom';
import BreadCrumbs from '../components/ReusableComponents/BreadCrumbs/BreadCrumbs';
import { useParams } from 'react-router-dom';

export default function ShowLessons() {
    const [user, setUser] = useAtom(state.user)
    const [weekNumber, setWeekNumber] = useState(null);
    const [[moduleNumber, moduleName], setModuleDetails] = useAtom(state.moduleNumberAndName)

    const params = useParams()
    
    return (
        <div className="h-screen flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar bg-generalColors-light-gray" >
            <SideHeader />

            <div id='weeksAndLessons' className="flex flex-col px-7 text-generalColors-dark-blue" style={{ minWidth: "calc(100vw - 5rem)", maxWidth: "100%" }}>
                <BreadCrumbs children={[
                    <a href={`/home/module/${params.moduleId}`}>Module {moduleNumber} : <b>{moduleName}</b></a>,
                    <b className='cursor-pointer'>Week {weekNumber}</b>,
                ]} 
                className=" justify-center"
                />
                {user && <Lessons userRole={user.role} setWeekNumber={setWeekNumber} />}
            </div>
        </div>
    )
}
