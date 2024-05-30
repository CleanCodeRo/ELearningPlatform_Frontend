import React, { useState } from 'react'
import SideHeader from '../components/SideHeader'
import Weeks from '../components/ShowModule/Weeks'
import { useAtom } from 'jotai';
import state from '../components/ReusableComponents/Atom';
import BreadCrumbs from '../components/ReusableComponents/BreadCrumbs/BreadCrumbs';
import { Helmet } from 'react-helmet';

export default function ShowWeeks() {
    const [user, setUser] = useAtom(state.user)
    const [module, setModule] = useState(null)
   
    return (
        <div className="h-screen flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar bg-generalColors-dark-blue" >
            <Helmet>
                <meta charSet="utf8" />
                <title>{`${module ? module.name : "Module ..."}`} - CleanCodeQuest</title>
            </Helmet>

            <SideHeader />

            <div id='weeksAndLessons' className="flex flex-col px-7" style={{ minWidth: "calc(100vw - 5rem)",  maxWidth: "100%" }}>
                {module && 
                     <BreadCrumbs key={0} children={[
                        <p key={0}>Module {module.number} : <b>{module.name}</b></p>
                      ]}
                      className="text-white"
                      />}

                {user && <Weeks key={1}  userRole={user.role} setModule={setModule} />}
            </div>
        </div>
    )
}
