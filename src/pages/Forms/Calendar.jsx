import React, { useState, useEffect } from 'react';
import { format, parse, isValid, startOfMonth, endOfMonth, addMonths, subMonths, eachDayOfInterval } from 'date-fns';

const Calendar = ({ userId }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [inputValue, setInputValue] = useState('');
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchAttendanceData();
  }, [currentMonth]);

  const fetchAttendanceData = async () => {
    const startDate = startOfMonth(currentMonth).toISOString().split('T')[0];
    const endDate = endOfMonth(currentMonth).toISOString().split('T')[0];
    
    try {
      const response = await fetch(`http://localhost:8080/attendance/overall?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('ELearningToken')}`,
        },
      });
      
      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Check if response is empty
      if (response.headers.get('content-length') === '0') {
        console.warn('No data returned from the server');
        setAttendanceData([]);
        return;
      }
  
      // Parse JSON data
      const data = await response.json();
  
      // Filter data for the current month
      const filteredData = data.filter(item =>
        item.attendanceDate >= startDate && item.attendanceDate <= endDate
      );
      
      setAttendanceData(filteredData);
  
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setAttendanceData([]);
    }
  };
  

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-2">
        <button onClick={prevMonth} className="bg-gray-300 p-2 rounded">Previous</button>
        <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth} className="bg-gray-300 p-2 rounded">Next</button>
        <input
          type="text"
          placeholder="MM/yyyy"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="ml-4 p-2 border rounded"
        />
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfMonth(currentMonth);
    const endDate = endOfMonth(currentMonth);
    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    daysInMonth.forEach(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const attendance = attendanceData.find(att => att.attendanceDate === dayStr);
      const color = getColorForStatus(attendance?.status);

      days.push(
        <div key={day} className={`w-10 h-10 border border-gray-300 ${color} flex items-center justify-center`}>
          {format(day, 'd')}
        </div>
      );
    });

    return <div className="grid grid-cols-7 gap-1">{days}</div>;
  };

  const getColorForStatus = (status) => {
    switch (status) {
      case 'Present':
        return 'bg-green-500';
      case 'Absent':
        return 'bg-red-500';
      case 'Excused':
        return 'bg-blue-500';
      case 'Unmarked':
        return 'bg-gray-500';
      default:
        return 'bg-gray-200'; // Default color if status is not found
    }
  };

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const parsedDate = parse(e.target.value, 'MM/yyyy', new Date());
      if (isValid(parsedDate)) {
        setCurrentMonth(parsedDate);
        setInputValue('');
      } else {
        alert('Invalid date format. Please use MM/yyyy.');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      {renderHeader()}
      {renderDays()}
    </div>
  );
};

export default Calendar;
