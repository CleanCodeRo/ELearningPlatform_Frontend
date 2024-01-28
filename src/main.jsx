import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import PresentationPage from "./pages/PresentationPage";
import Login from "./pages/Forms/Login";
import Contact from "./pages/Forms/Contact";
import CreateAndEditModule from "./pages/Forms/CreateAndEditModule";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<PresentationPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/createModule" element={<CreateAndEditModule />} />
        <Route path="/editModule/:id" element={<CreateAndEditModule />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
