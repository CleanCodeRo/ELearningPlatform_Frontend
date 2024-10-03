import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './Chalendar.css';
import { startLink } from '../../../constants/Constants';
import { useParams } from 'react-router-dom';

export default function MyChalendar() {
  const [value, setValue] = useState(new Date());
  const [curentMonthDate, setCurrentMonthDate] = useState(new Date())
  const [randomDays] = useState([1, 4, 15, 22, 29]);
  const [attendance, setAttendance] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    const { firstDay, lastDay } = getFirstAndLastDaysOfMonth(curentMonthDate)

    const queryParams = new URLSearchParams();
    queryParams.append("startDate", firstDay);
    queryParams.append("endDate", lastDay);
    queryParams.append("userId", userId);
    queryParams.append("page", 0);
    queryParams.append("numberOfItems", 40);
    setAttendance([]);

    fetch(`${startLink}/attendance/filterBy?${queryParams.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setAttendance(data.data)
      })
      .catch((err) => {
        console.log("Eroare attendance ", err)
      });
  }, [curentMonthDate])


  const getFirstAndLastDaysOfMonth = (date) => {
    if (!(date instanceof Date)) {
      throw new Error("Invalid date. Please provide a Date object.");
    }
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = formatDay(new Date(year, month, 1));
    const lastDay = formatDay(new Date(year, month + 1, 0));

    return { firstDay, lastDay };
  };

  const formatDay = (day) => {
    const year = day.getFullYear();
    const month = String(day.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(day.getDate()).padStart(2, '0');
    return `${year}-${month}-${dayOfMonth}`;
  };

  const onChange = (date) => {
    setValue(formatDay(date))
  };

  const onActiveDateChange = ({ activeStartDate }) => {
    const year = activeStartDate.getFullYear();
    const month = String(activeStartDate.getMonth() + 1).padStart(2, '0');
    console.log(`Active Month Changed: ${year}-${month}`); // Log the active month
    setCurrentMonthDate(new Date(`${year}-${month}-01`))
  };

  const tileClassName = ({ date }) => {
    const day = formatDay(date)

    if (attendance) {
      let attendanceDay = attendance.filter(i => i.date == day)[0]

      switch (attendanceDay?.status) {
        case 'PRESENT':
          return `bg-[#4ec49d] text-white`;
        case 'LATE':
          return `bg-[#efbf04] text-white`;
        case 'ABSENT':
          return `bg-[#ff4500] text-white`;
        case 'EXCUSED':
          return `bg-[#1e90ff] text-white`;
        default:
          "";
      }
    }
    return ''

  };

  return (
    <div className="flex justify-center w-full px-7 ">
      <Calendar
        onChange={onChange}
        onActiveStartDateChange={onActiveDateChange} // Capture active date changes
        value={value}
        className="bg-white w-1/2 rounded-xl"
        tileClassName={tileClassName}
      />
    </div>
  );
}
