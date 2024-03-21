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
import Redirect from "./components/Redirect";
import KataCardV3 from "./components/SpecialKatas/KataCardV3";
import KataForm from "./pages/Forms/KataForm";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
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
              <ShowModule />
            ) : (
              <Redirect />
            )
          }
        />
        <Route
          path="/home/module/:moduleId/week/:weekId"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) ? (
              <ShowModule />
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
          path="/home/kataTest"
          element={
            !isExpired(localStorage.getItem("ELearningToken")) ? (
              <KataCardV3 />
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
