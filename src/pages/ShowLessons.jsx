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
    const [confirmNavigate, setConfirmNavigate] = useState(1);
    const [navigateLink, setNavigateLink] = useState("");

    const params = useParams()

    const ConfirmNavigate = (e) => {

        return (
            <div id="container" className="flex items-center justify-center absolute w-full h-full top-0 left-0 bg-black backdrop-blur-sm bg-opacity-50 z-10">
                <div id='question-container' className='bg-white p-10 min-w-1/4 rounded-lg flex flex-col items-center'>
                    <p className='text-2xl font-bold my-5'>Navigate to lesson ? </p>

                    <div className=" font-semibold flex items-center justify-center pt-3 pb-5">
                        <a onClick={() => setConfirmNavigate((value) => value + 1)} href={navigateLink} target="_blank" className="bg-generalColors-dark-blue text-white rounded-lg py-4 my-2 xs:my-0 px-8  bg-fifth  text-sixth mr-4 shadow-md shadow-fourth">
                            Travel
                        </a>

                        <button onClick={() => setConfirmNavigate(confirmNavigate + 1)} className=" my-2 xs:my-0 px-8 py-5 rounded-lg text-generalColors-dark-blue mr-4 shadow-md shadow-fourth">
                            Cancel
                        </button>

                    </div>
                </div>
            </div>
        )
    }



    return (
        <div className="h-screen flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar bg-generalColors-white" >
            <SideHeader />
            {confirmNavigate % 2 == 0 && <ConfirmNavigate />}

            <div id='weeksAndLessons' className="flex flex-col px-7 text-generalColors-dark-blue" style={{ minWidth: "calc(100vw - 5rem)", maxWidth: "100%" }}>
                <BreadCrumbs children={[
                    <a key={1} href={`/home/module/${params.moduleId}`}>Module {moduleNumber} : <b>{moduleName}</b></a>,
                    <b key={2} className='cursor-pointer'>Week {weekNumber}</b>,
                ]}
                    className=""
                />
                {user && <Lessons userRole={user.role} userId={user.id} setWeekNumber={setWeekNumber} setConfirmNavigate={setConfirmNavigate} setNavigateLink={setNavigateLink}/>}
            </div>
        </div>
    )
}
