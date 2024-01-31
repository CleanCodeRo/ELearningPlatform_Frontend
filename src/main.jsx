import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import PresentationPage from "./pages/PresentationPage";
import Login from "./pages/Forms/Login";
import Contact from "./pages/Forms/Contact";
import ShowModule from "./pages/ShowModule";
import ModuleCreateAndEdit from "./pages/Forms/ModuleCreateAndEdit";
import WeekCreateAndEdit from "./pages/Forms/WeekCreateAndEdit";
import LessonsCreateAndEdit from "./pages/Forms/LessonsCreateAndEdit";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<PresentationPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/createModule" element={<ModuleCreateAndEdit />} />
        <Route path="/editModule/:moduleId" element={<ModuleCreateAndEdit />} />
        <Route path="/home/module/:moduleId" element={<ShowModule />} />
        <Route path="/home/module/:moduleId/week/:weekId" element={<ShowModule />} />
        <Route path="/home/module/:moduleId/editWeek/:weekId" element={<WeekCreateAndEdit />} />
        <Route path="/home/module/:moduleId/createWeek" element={<WeekCreateAndEdit />} />
        <Route path="/home/module/:moduleId/week/:weekId/createLesson" element={<LessonsCreateAndEdit />} />
        <Route path="/home/module/:moduleId/week/:weekId/editLesson/:lessonId" element={<LessonsCreateAndEdit />} />

        
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
