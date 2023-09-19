import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CalendarPage } from './pages/CalendarPage';
import { HomePage } from './pages/Homepage';
import ImageSlider from './component/model/ImageSlider';
import EditMeeting from "./component/model/EditMeetingModel"
import JobDone from './component/model/JobDone';
export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/slide' element={<ImageSlider/>}/>
        <Route path='/' element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/job' element={<JobDone/>} />


      </Routes>
    </BrowserRouter>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
