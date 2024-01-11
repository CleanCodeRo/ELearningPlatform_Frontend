import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from './HomePage';
import Header from './components/Header';


export default function App() {
  return (
    <BrowserRouter>
     <Header/>
      <Routes>
        <Route path="/home" element={<HomePage/>}> </Route>
       
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
