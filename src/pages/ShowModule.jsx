import React from 'react'
import SideHeader from '../components/SideHeader'
import Weeks from '../components/ShowModule/Weeks'
import Lessons from '../components/ShowModule/Lessons'

export default function ShowModule() {
    return (
        <div className="font-inter select-none flex flex-row text-sixth">
            <SideHeader />

            <div className="flex flex-col w-screen">
                <Weeks />
                <Lessons/>
            </div>
        </div>
    )
}
