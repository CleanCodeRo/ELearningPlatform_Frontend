import React from 'react'
import SideHeader from '../components/SideHeader'
import Weeks from '../components/HomePage/Weeks'

export default function ShowModule() {
    return (
        <div className="font-inter select-none flex flex-row text-light-blue-50">
            <SideHeader />

            <div className="flex flex-col w-screen">
                <Weeks />
            </div>
        </div>
    )
}
