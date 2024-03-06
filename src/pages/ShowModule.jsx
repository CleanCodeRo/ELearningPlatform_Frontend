import React, { useState } from 'react'
import SideHeader from '../components/SideHeader'
import Weeks from '../components/ShowModule/Weeks'
import Lessons from '../components/ShowModule/Lessons'
import { useAtom } from 'jotai';
import state from '../components/Atom';

export default function ShowModule() {
    const [loadingLessons, setLoadingLessons] = useState(true);
    const [user, setUser] = useAtom(state.user)

    return (
        <div className="h-screen select-none flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar" >
            <SideHeader />

            <div id='weeksAndLessons' className="flex flex-col px-5" style={{ minWidth: "calc(100vw - 5rem)",  maxWidth: "100%" }}>
                {user && <Weeks setLoadingLessons={setLoadingLessons} userRole={user.role} />}
                {user && <Lessons loadingLessons={loadingLessons} setLoadingLessons={setLoadingLessons} userRole={user.role} />}
            </div>
        </div>
    )
}
