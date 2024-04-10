import React, { useState } from 'react'
import SideHeader from '../components/SideHeader'

import { useAtom } from 'jotai';
import state from '../components/ReusableComponents/Atom';
import BreadCrumbs from '../components/ReusableComponents/BreadCrumbs/BreadCrumbs';

export default function ShowModule() {
    const [loadingLessons, setLoadingLessons] = useState(true);
    const [user, setUser] = useAtom(state.user)
    const [module, setModule] = useState(null)
    const [weekNumber, setWeekNumber] = useState(null);
   
    return (
        <div className="h-screen flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar bg-generalColors-dark-blue" >
            <SideHeader />

            <div id='weeks' className="flex flex-col px-7" style={{ minWidth: "calc(100vw - 5rem)",  maxWidth: "100%" }}>
                {module && 
                     <BreadCrumbs 
                     children={[
                        <p>Module {module.number} : <b>{module.name}</b></p>,
                        weekNumber && <p>Week {weekNumber}</p>,
                      ]}
                      className=" justify-center"
                      />}
                      
            </div>
        </div>
    )
}
