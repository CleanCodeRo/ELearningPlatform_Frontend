import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isExpired } from "react-jwt";
import HomePage from "./pages/HomePage";

import PresentationPage from "./pages/PresentationPage";
import Dojo from "./pages/Dojo";
import Login from "./pages/Forms/Login";
import Contact from "./pages/Forms/Contact";
import ModuleCreateAndEdit from "./pages/Forms/ModuleCreateAndEdit";
import WeekCreateAndEdit from "./pages/Forms/WeekCreateAndEdit";
import LessonsCreateAndEdit from "./pages/Forms/LessonsCreateAndEdit";
import KataForm from "./pages/Forms/KataForm";
import Redirect from "./components/ReusableComponents/Redirect";
import ShowWeeks from "./pages/ShowWeeks";
import ShowLessons from "./pages/ShowLessons";
import LeaderBoard from "./pages/LeaderBoard";

import Permisions from "./pages/Permisions";
import { useAtom } from "jotai";
import state from "./components/ReusableComponents/Atom";
import Profile from "./pages/Profile";
import RequestPasswordReset from "./pages/Forms/RequestPasswordReset";
import PasswordReset from "./pages/Forms/PasswordReset";
import ManageAttendance from "./pages/Forms/ManageAttendance";

export default function App() {
  const [user, setUser] = useAtom(state.user)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<RequestPasswordReset />} />

        <Route path="/reset_CleanCode_password/:token/:userId" element={<PasswordReset />} />

        <Route path="/" element={<PresentationPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/myprofile"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) ? (
              <Profile />
            ) : (
              <Redirect />
            )
          }
        />

        <Route
          path="/home"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) ? (
              <HomePage />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/createModule"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) && user?.role == "ADMIN" ? (
              <ModuleCreateAndEdit />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/editModule/:moduleId"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) && user?.role == "ADMIN" ? (
              <ModuleCreateAndEdit />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/home/module/:moduleId"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) ? (
              <ShowWeeks />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/home/module/:moduleId/week/:weekId"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) ? (
              <ShowLessons />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/home/module/:moduleId/editWeek/:weekId"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) && user?.role == "ADMIN" ? (
              <WeekCreateAndEdit />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/home/module/:moduleId/createWeek"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) && user?.role == "ADMIN" ? (
              <WeekCreateAndEdit />
            ) : (
              <Redirect />
            )
          }
        />


        <Route
          path="/home/module/:moduleId/week/:weekId/createLesson"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) && user?.role == "ADMIN" ? (
              <LessonsCreateAndEdit />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/home/module/:moduleId/week/:weekId/editLesson/:lessonId"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) && user?.role == "ADMIN" ? (
              <LessonsCreateAndEdit />
            ) : (
              <Redirect />
            )}
        />

        <Route
          path="/dojo/:pageNumber?"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) ? (
              <Dojo />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/dojo/addKata"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) && user?.role == "ADMIN" ? (
              <KataForm />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/dojo/editKata/:kataId"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) && user?.role == "ADMIN" ? (
              <KataForm />
            ) : (
              <Redirect />
            )
          }
        />

        <Route
          path="/leaderboard"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) ? (
              <LeaderBoard />
            ) : (
              <Redirect />
            )
          }
        />

        <Route
          path="/permissions"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) && user?.role == "ADMIN" ? (
              <Permisions />
            ) : (
              <Redirect />
            )
          }
        />

        <Route
          path="/permissions/attendance"
          element={
            <ManageAttendance/>
          }
        />

      </Routes>


    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
