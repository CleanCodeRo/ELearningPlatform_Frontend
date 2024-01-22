import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './pages/HomePage';
import Header from './components/Header';
import PresentationPage from './pages/PresentationPage';




export default function App() {
  return (
    <BrowserRouter>
      {window.location.pathname != "/" ? <Header/> : null}
      <Routes>
        <Route path="/" element={<PresentationPage />} />
        <Route path="/home" element={<HomePage />}> </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
