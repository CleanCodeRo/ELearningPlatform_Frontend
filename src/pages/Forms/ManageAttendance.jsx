import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import SideHeader from "../../components/SideHeader";
import CostumInput from "../../components/ReusableComponents/CostumInput";
import { startLink } from "../../constants/Constants";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Avatar,
    Select,
    Option,

} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import AttendanceButtons from "../../components/Attendance/AttendanceButtons";
import ReactPaginate from "react-paginate";

const TABLE_HEAD = ["Id", "Student", "Date", "Actions"];

//     {
//         img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
//         name: "John Michael",
//         email: "john@creative-tim.com",
//         job: "Manager",
//         org: "Organization",
//         online: true,
//         date: "23/04/18",
//     },
//     {
//         img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
//         name: "Alexa Liras",
//         email: "alexa@creative-tim.com",
//         job: "Programator",
//         org: "Developer",
//         online: false,
//         date: "23/04/18",
//     },
//     {
//         img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
//         name: "Laurent Perrier",
//         email: "laurent@creative-tim.com",
//         job: "Executive",
//         org: "Projects",
//         online: false,
//         date: "19/09/17",
//     },
//     {
//         img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
//         name: "Michael Levi",
//         email: "michael@creative-tim.com",
//         job: "Programator",
//         org: "Developer",
//         online: true,
//         date: "24/12/08",
//     },
//     {
//         img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
//         name: "Richard Gran",
//         email: "richard@creative-tim.com",
//         job: "Manager",
//         org: "Executive",
//         online: false,
//         date: "04/10/21",
//     },
// ];

export default function ManageAttendance() {
    const [refreshAttendances, setRefreshAttendance] = useState(0);
    const [attendanceStats, setAttendanceStats] = useState(null)
    const [filteredAttendance, setFilteredAttendance] = useState(null)
    const currentDate = new Date().toISOString().split('T')[0]
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [perPage, setPerPage] = useState(10)
    const navigate = useNavigate();
    const { pageNumber } = useParams();

    const usernameRef = useRef(null);
    const startDateRef = useRef(null);
    const endDateRef = useRef(null);

    useEffect(() => {
        fetch(`${startLink}/attendance/values`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("ELearningToken")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(Object.entries(data))
                setAttendanceStats(Object.entries(data))
            })
            .catch((err) => {
                console.log("Eroare attendace values ", err)
                // navigate("/login");
            });
    }, [])

    useEffect(() => {
        const queryParams = new URLSearchParams();
        queryParams.append("startDate", startDateRef.current.value);
        queryParams.append("endDate", endDateRef.current.value);
        queryParams.append("username", usernameRef.current.value);
        queryParams.append("page", pageNumber);
        queryParams.append("numberOfItems", perPage);
        setFilteredAttendance([]);

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
                if (data.data.length == 0 && pageNumber > 0) {
                    navigate(`/permissions/attendance/0`)
                    window.location.reload()
                }
                setFilteredAttendance(data.data)
                setNumberOfPages(data.totalPages)
            })
            .catch((err) => {
                console.log("Eroare attendance ", err)
            });
    }, [refreshAttendances, perPage])

    const handlePageClick = (e) => {
        navigate(`/permissions/attendance/${e.selected}`)
        setRefreshAttendance(prev => prev + 1)
    }

    return (
        <div className="h-screen flex flex-row text-sixth overflow-x-hidden overflow-y-scroll relative custom-scrollbar bg-generalColors-white text-generalColors-dark-blue">
            <Helmet>
                <meta charSet="utf8" />
                <title>Manage Attendance - CleanCodeQuest</title>
            </Helmet>

            <SideHeader />

            <div id="pageHolder" className="flex flex-col px-7 " style={{ minWidth: "calc(100vw - 5rem)" }}>
                <p id="pageTitle" className="text-3xl sm:text-4xl p-4 mb-8 font-bold rounded-lg ">
                    Manage Attendance
                </p>

                <Card className="h-[75%] w-full ">
                    <CardHeader floated={false} shadow={false} className="rounded-none min-h-20">

                        <div id="attendanceFilters" className="flex items-center justify-between gap-4 md:flex-row h-full ">

                            <CostumInput id="codeWarsUsername"
                                inputRef={usernameRef}
                                onChange={() => setRefreshAttendance(prev => prev + 1)}
                                placeholder={'Username'}
                                label={<p><i className="fa-solid fa-magnifying-glass text-[#b2bec5]" aria-label="searh-icon" /> Search</p>}
                                costumInputClass={"!w-fit"}
                            />

                            <div id="inputDatesHolder" className="flex items-center gap-10  ">
                                <div className="relative group">
                                    <p className="absolute bg-generalColors-white text-[13px]  font-normal rounded-full top-[-10px] left-3.5 px-1  group-focus-within:text-[14px] group-focus-within:top-[-14px] group-focus-within:px-[4px] transition-all duration-200">Start Date</p>
                                    <input defaultValue={currentDate} ref={startDateRef} type="date" onChange={() => setRefreshAttendance(refreshAttendances + 1)} className=" px-4 py-2 border-[1px] border-generalColors-light-gray custom-date-input rounded-lg " />
                                </div>

                                <div className="relative group">
                                    <p className="absolute bg-generalColors-white text-[13px]  font-normal rounded-full top-[-10px] left-3.5 px-1 group-focus-within:text-[14px] group-focus-within:top-[-14px] group-focus-within:px-[4px] transition-all duration-200">End Date</p>
                                    <input defaultValue={currentDate} ref={endDateRef} type="date" onChange={() => setRefreshAttendance(refreshAttendances + 1)} className=" px-4 py-2 border-[1px] border-generalColors-light-gray custom-date-input rounded-lg " />
                                </div>
                            </div>

                        </div>
                    </CardHeader>
                    <CardBody className="overflow-scroll scrollbar-hide p-0">
                        <table id="attendanceTable" className=" w-full min-w-max table-auto text-left relative">
                            <thead className=" sticky top-[-1px] z-10 bg-gray-500">
                                <tr className="">
                                    {TABLE_HEAD.map((head, index) => (
                                        <th
                                            key={head}
                                            className={`border-y border-blue-gray-100 bg-gray-300 p-4 ${index == TABLE_HEAD.length - 1 ? "text-center" : ""}`}
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAttendance?.map(
                                    ({ date, id, status, user, username }, index) => {
                                        const isLast = index === filteredAttendance.length - 1;
                                        const classes = isLast
                                            ? "py-1 px-4"
                                            : "py-1 px-4 border-b border-blue-gray-100";

                                        return (
                                            // onClick={() => navigate(`/profile/${id}`)}
                                            <tr key={index} className={`${classes} h-full relative`}>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {id}
                                                    </Typography>
                                                </td>

                                                <td className={`${classes} w-fit`}>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar src={"/images/CleanCode.jpg"} alt={username} size="sm" />
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {user.firstName} {user.lastName}
                                                            </Typography>

                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal opacity-70"
                                                            >
                                                                {user.username}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {date}
                                                    </Typography>
                                                </td>

                                                <td className={`h-[50px] flex justify-center items-center gap-x-2`}>
                                                    <AttendanceButtons attendanceId={id} attendanceStats={attendanceStats} defaultAttandanceValue={status} />
                                                </td>

                                            </tr>
                                        );
                                    },
                                )}
                            </tbody>
                        </table>
                    </CardBody>

                </Card>

                <div id="paginationAndPerPage" className="flex justify-center my-10">
                    <ReactPaginate
                        className=' w-full text-first flex justify-center items-center'
                        pageClassName=" mx-1 w-10 h-10 rounded-xl flex items-center justify-center hover:bg-gray-300 duration-200"
                        breakClassName=" p-1"
                        activeClassName=" bg-generalColors-dark-gray text-white shadow-sm shadow hover:text-first duration-200"
                        marginPagesDisplayed={3}
                        breakLabel=". . ."
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={4}
                        pageCount={numberOfPages}
                        forcePage={pageNumber * 1}
                        previousLabel={<Button aria-label='left-arrow' className='mx-1 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-300 bg-transparent text-second text-md duration-200'><i className="fa-solid fa-arrow-left"></i></Button>}
                        nextLabel={<Button aria-label='right-arrow' className='mx-1 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-300 bg-transparent text-second text-md duration-200'><i className="fa-solid fa-arrow-right"></i></Button>}
                        renderOnZeroPageCount={null}
                    />

                    <div className="w-fit self-end">
                        <Select onChange={(value) => setPerPage(value)} defaultValue={10} label="Per page">
                            <Option value={10}>10</Option>
                            <Option value={15}>15</Option>
                            <Option value={20}>20</Option>
                            <Option value={25}>25</Option>
                            <Option value={30}>30</Option>
                        </Select>
                    </div>

                </div>


            </div>
        </div>
    );
}