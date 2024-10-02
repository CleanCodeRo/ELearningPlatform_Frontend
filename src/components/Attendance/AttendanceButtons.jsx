'use client'
import React, { useState } from "react";
import { startLink } from "../../constants/Constants";

export default function AttendanceButtons({ attendanceId, attendanceStats, defaultAttandanceValue }) {
    const [userAttendance, setUserAttendance] = useState(defaultAttandanceValue)

    const changeAttandance = (e) => {
        fetch(`${startLink}/attendance/changeStatus?attendanceId=${attendanceId}&attendanceStatus=${e.target.textContent}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setUserAttendance(e.target.textContent)
            })
            .catch((err) => {
                console.log("Eroare attendace values ", err)
                // navigate("/login");
            });
    }

    return (
        <>
            {attendanceStats?.map((stat, index) =>
                <button onClick={changeAttandance} className={` text-white font-bold border-[2px] border-transparent  py-1 px-3 rounded-lg text-[13px] hover:scale-110 ${userAttendance == stat[0] ? "!bg-white !text-black" : ""} transition-all duration-300 `}
                    key={index}
                    style={{ backgroundColor: stat[1], borderColor: stat[1] }}>
                    {stat[0]}
                </button>)}
        </>
    )
}