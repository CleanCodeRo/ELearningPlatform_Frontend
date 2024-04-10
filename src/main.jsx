import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isExpired } from "react-jwt";
import HomePage from "./pages/HomePage";

import PresentationPage from "./pages/PresentationPage";
import Dojo from "./pages/Dojo";
import Login from "./pages/Forms/Login";
import Contact from "./pages/Forms/Contact";
import ShowModule from "./pages/ShowModule";
import ModuleCreateAndEdit from "./pages/Forms/ModuleCreateAndEdit";
import WeekCreateAndEdit from "./pages/Forms/WeekCreateAndEdit";
import LessonsCreateAndEdit from "./pages/Forms/LessonsCreateAndEdit";
import KataForm from "./pages/Forms/KataForm";
import Redirect from "./components/ReusableComponents/Redirect";
import ShowWeeks from "./pages/ShowWeeks";
import ShowLessons from "./pages/ShowLessons";
import LeaderBoard from "./pages/LeaderBoard";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<PresentationPage />} />
        <Route path="/contact" element={<Contact />} />

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
            !isExpired(localStorage.getItem("ELearningToken")) ? (
              <ModuleCreateAndEdit />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/editModule/:moduleId"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) ? (
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
            !isExpired(localStorage.getItem("ELearningToken")) ? (
              <WeekCreateAndEdit />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/home/module/:moduleId/createWeek"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) ? (
              <WeekCreateAndEdit />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/home/module/:moduleId/week/:weekId/createLesson"
          element={<LessonsCreateAndEdit />}
        />
        <Route
          path="/home/module/:moduleId/week/:weekId/editLesson/:lessonId"
          element={<LessonsCreateAndEdit />}
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
            !isExpired(localStorage.getItem("ELearningToken")) ? (
              <KataForm />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/dojo/editKata/:kataId"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) ? (
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
      </Routes>

      

    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
