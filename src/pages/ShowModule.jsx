import React from 'react'
import SideHeader from '../components/SideHeader'
import Weeks from '../components/ShowModule/Weeks'
import Lessons from '../components/ShowModule/Lessons'

export default function ShowModule() {
    return (
        <div className="h-screen select-none flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar" >
            <SideHeader />

            <div className="flex flex-col px-5" style={{width : "calc(100vw - 5rem)"}}>
                <Weeks />
                <Lessons/>
            </div>
        </div>
    )
}
