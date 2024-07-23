import React, { useEffect, useState, useRef } from 'react';
import { startLink } from '../../constants/Constants';

export default function AttendanceMark({ users }) {
    const [attendance, setAttendance] = useState({});
    const [allUsers, setAllUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef(null);
    const currentDate = new Date().toISOString().split('T')[0];

    // Fetch attendance data for a user
    const fetchAttendanceForUser = (userId) => {
        fetch(`${startLink}/attendance/user?userId=${userId}&attendanceDate=${currentDate}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('ELearningToken')}`,
            },
        })
            .then(response => response.json())
            .then(data => {
                setAttendance(prev => ({ ...prev, [userId]: data }));
            })
            .catch(error => {
                console.error('Error fetching attendance data:', error);
            });
    };

    useEffect(() => {
        if (users && users.length) {
            setAllUsers(users);
            setFilteredUsers(users);
            users.forEach(user => fetchAttendanceForUser(user.id));
        }
    }, [users]);

    // Handle search functionality
    const handleSearch = () => {
        const searchValue = searchRef.current.value.toLowerCase();
        if (searchValue === '') {
            setFilteredUsers(allUsers);
            setSelectedUser(null);
        } else {
            const filtered = allUsers.filter(user =>
                user.firstName.toLowerCase().includes(searchValue) ||
                user.lastName.toLowerCase().includes(searchValue) ||
                user.email.toLowerCase().includes(searchValue)
            );
            setFilteredUsers(filtered);
        }
    };

    const selectUserEvent = (e) => {
        const index = parseInt(e.target.id.split('_')[0], 10);
        setSelectedUser(filteredUsers[index]);
        searchRef.current.value = '';
        setFilteredUsers(allUsers);
    };

    const resetSearch = () => {
        searchRef.current.value = '';
        setFilteredUsers(allUsers);
        setSelectedUser(null);
    };

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setTimeout(() => setIsFocused(false), 200);

    const getStatusForUser = (userId) => attendance[userId]?.status || 'Unmarked';
    const getHoursForUser = (userId) => attendance[userId]?.numberOfHours || 0;

    // Update attendance data on the backend
    const updateAttendance = (userId, status, numberOfHours, morning, evening) => {
        fetch(`${startLink}/attendance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('ELearningToken')}`,
            },
            body: JSON.stringify({
                attendanceDate: currentDate,
                userId,
                status,
                numberOfHours,
                morning,
                evening
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchAttendanceForUser(userId);
        })
        .catch(error => {
            console.error('Error updating attendance:', error);
        });
    };

    // Toggle checkbox state and update attendance
    const handleCheckboxChange = (userId, type) => {
        setAttendance(prev => {
            const currentHours = getHoursForUser(userId);
            const updated = { ...prev };
            const current = updated[userId] || {};

            if (type === 'morning') {
                const newMorningChecked = !(current.morning || false);
                const updatedHours = newMorningChecked ? currentHours + 8 : currentHours - 8;
                updated[userId] = {
                    ...current,
                    morning: newMorningChecked,
                    numberOfHours: updatedHours
                };
            } else if (type === 'evening') {
                const newEveningChecked = !(current.evening || false);
                const updatedHours = newEveningChecked ? currentHours + 4 : currentHours - 4;
                updated[userId] = {
                    ...current,
                    evening: newEveningChecked,
                    numberOfHours: updatedHours
                };
            }

            return updated;
        }, () => {
            // After state is updated, send data to backend
            updateAttendance(userId, getStatusForUser(userId), getHoursForUser(userId), attendance[userId]?.morning || false, attendance[userId]?.evening || false);
        });
    };

    const usersToDisplay = selectedUser ? [selectedUser] : filteredUsers;

    return (
        <div className="py-4">
            <h1 className="text-2xl font-bold text-generalColors-dark-blue mb-4">Attendance Marking</h1>
            <div id="SearchContainer" className="relative flex items-center mb-6 w-fit">
                <img alt="user" className="w-4 mr-3" src="/SVGs/user.svg" aria-label='user' />
                <input
                    ref={searchRef}
                    placeholder="Search User"
                    className="mr-3 p-2 border rounded"
                    onChange={handleSearch}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <button
                    onClick={resetSearch}
                    className="ml-2 p-2 bg-gray-300 rounded text-black"
                >
                    Reset
                </button>
            </div>

            {(isFocused || selectedUser) && filteredUsers.length > 0 && !selectedUser && (
                <div id="result users"
                    className="absolute h-fit w-fit rounded-sm bg-white z-10 cursor-pointer"
                    style={{ top: `${searchRef.current?.getBoundingClientRect().top + 50}px`, boxShadow: "1px 0px 5px 3px #BEBCBF", clipPath: "inset(-5px -10px -10px -10px)" }}>
                    { filteredUsers && filteredUsers.map((user, index) => (
                        <div key={index} onClick={selectUserEvent} id={`${index}_${user.firstName}`} className='p-1.5'>
                            {user.firstName} {user.lastName} ({user.email})
                        </div>
                    ))}
                </div>
            )}

            {selectedUser && (
                <div>
                    Selected User: {selectedUser.firstName} {selectedUser.lastName} ({selectedUser.email})
                </div>
            )}

            <div className="overflow-x-auto mt-6">
                <table className="min-w-full bg-white border">
                    <thead className="bg-generalColors-dark-blue text-white">
                        <tr>
                            <th className="py-2 px-4 border-b border-blue-700">Profile</th>
                            <th className="py-2 px-4 border-b border-blue-700">Name</th>
                            <th className="py-2 px-4 border-b border-blue-700">Morning</th>
                            <th className="py-2 px-4 border-b border-blue-700">Evening</th>
                            <th className="py-2 px-4 border-b border-blue-700">Hours</th>
                            <th className="py-2 px-4 border-b border-blue-700">Status</th>
                            <th className="py-2 px-4 border-b border-blue-700">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && usersToDisplay.map((user) => (
                            <tr key={user.id}>
                                <td className="py-2 px-4 border-b border-generalColors-dark-blue">
                                    <img alt="user" className="w-8 h-8 rounded-full" src={user.profilePicture || '/images/defaultProfile.png'} aria-label='profile' />
                                </td>
                                <td className="py-2 px-4 border-b border-generalColors-dark-blue">{user.firstName} {user.lastName}</td>
                                <td className="py-2 px-4 border-b border-generalColors-dark-blue">
                                    <input
                                        type='checkbox'
                                        checked={attendance[user.id]?.morning || false}
                                        onChange={() => handleCheckboxChange(user.id, 'morning')}
                                    />
                                </td>
                                <td className="py-2 px-4 border-b border-generalColors-dark-blue">
                                    <input
                                        type='checkbox'
                                        checked={attendance[user.id]?.evening || false}
                                        onChange={() => handleCheckboxChange(user.id, 'evening')}
                                    />
                                </td>
                                <td className="py-2 px-4 border-b border-generalColors-dark-blue">
                                    <input
                                        type='number'
                                        value={getHoursForUser(user.id)}
                                        onChange={(e) => {
                                            const updatedHours = parseInt(e.target.value, 10) || 0;
                                            setAttendance(prev => ({
                                                ...prev,
                                                [user.id]: {
                                                    ...prev[user.id],
                                                    numberOfHours: updatedHours,
                                                },
                                            }));
                                        }}
                                    />
                                </td>
                                <td className="py-2 px-4 border-b border-generalColors-dark-blue">
                                    <div className="flex justify-around">
                                        <button
                                            className={`px-2 py-1 rounded ${"Present" === getStatusForUser(user.id) ? 'bg-green-300' : 'bg-gray-300'}`}
                                            onClick={() => updateAttendance(user.id, "Present", getHoursForUser(user.id), attendance[user.id]?.morning || false, attendance[user.id]?.evening || false)}
                                        >
                                            Present
                                        </button>
                                        <button
                                            className={`px-2 py-1 rounded ${"Absent" === getStatusForUser(user.id) ? 'bg-red-300' : 'bg-gray-300'}`}
                                            onClick={() => updateAttendance(user.id, "Absent", getHoursForUser(user.id), attendance[user.id]?.morning || false, attendance[user.id]?.evening || false)}
                                        >
                                            Absent
                                        </button>
                                        <button
                                            className={`px-2 py-1 rounded ${"Excused" === getStatusForUser(user.id) ? 'bg-blue-300' : 'bg-gray-300'}`}
                                            onClick={() => updateAttendance(user.id, "Excused", getHoursForUser(user.id), attendance[user.id]?.morning || false, attendance[user.id]?.evening || false)}
                                        >
                                            Excused
                                        </button>
                                        <button
                                            className={`px-2 py-1 rounded ${"Unmarked" === getStatusForUser(user.id) ? 'bg-yellow-300' : 'bg-gray-300'}`}
                                            onClick={() => updateAttendance(user.id, "Unmarked", getHoursForUser(user.id), attendance[user.id]?.morning || false, attendance[user.id]?.evening || false)}
                                        >
                                            Unmarked
                                        </button>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b border-generalColors-dark-blue">History</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
