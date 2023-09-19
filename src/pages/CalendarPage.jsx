import { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import axios from 'axios';
import moment from 'moment';
import '../App.css';
import Model from "../component/model/Model";
import EditMeeting from '../component/model/EditMeetingModel';
import { useNavigate } from "react-router-dom";
import logo from './logo.png';
import {
  Nav,
  NavLink,

  NavMenu,
  NavBtn,
  NavBtnLink,
} from '../component/NavbarElements';

import LogOut from '../component/model/LogOut'
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const CalendarPage = (props) => {
  const [isRefreshing, setisRefreshing] = useState(false);
  const [state, setState] = useState('month')
  const [myEvents, setEvents] = useState([]);
  const localizer = momentLocalizer(moment);
  const myEventsList = [

  ];
  let navigate = useNavigate();
  const handleSelectEvent = useCallback((event) => {
    setEditPopup(true);
    setMeetingId(event.id);
  }
  );
  const [posts, setPosts] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [outPopup, setOutPopup] = useState(false)
  const [meetingId, setMeetingId] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event Name');
      if (title) {
        <Model></Model>
      }
    },
  )
  const [fromDate, setFromDate] = useState('2023-08-31T12:23:06.773Z');
  function logoutHandler() {

    return <LogOut></LogOut>
  }
  useEffect(() => {
    console.log("başlıyor")
    const token = localStorage.getItem('token');
    if (token) {
      console.log(token)
      axios.get('http://localhost:7162/api/meetings')
        .then(response => {
          console.log(response.status)
          setPosts(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    else {
      navigate('/login')
      console.log("Not Auth")
    }

  }, []);
  for (let i = 0; i < posts.length; i++) {
    //console.log(posts[i].title)
    myEventsList.push({ id: posts[i].id, start: new Date(posts[i].from_date), end: new Date(posts[i].to_date), title: posts[i].title }
    )
    //console.log(posts[i].from_date)
  }
  //myEventsList.push()

  // useEffect(() => {
  //   const handleTabClose = event => {
  //     event.preventDefault();


  //     console.log('beforeunload event triggered');
  //     if (!isRefreshing) {
  //       localStorage.removeItem('token');
  //     } else {

  //     }
  //     return (event.returnValue =
  //       'Are you sure you want to exit?');
  //   };

  //   window.addEventListener('onunload',function(){
  //     setisRefreshing(true);
  //   })
  //   window.addEventListener('beforeunload', handleTabClose);



  //   return () => {
  //     window.removeEventListener('beforeunload', handleTabClose);
  //   };
  // }, []);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='calendar-container'>
      <div className={`nav-bar ${menuOpen ? 'menu-open' : ''}`}>
        <div className="menu-toggle" onClick={toggleMenu}>
          <img alt="" src={logo} width={50} height={50} />
        </div>

        <nav className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <img alt="" src={logo} width={50} height={50} />

          <NavBtn>
            <button className='create-btn' onClick={() => setButtonPopup(true)}>Schedule A Meeting</button>
            <Model trigger={buttonPopup} setTrigger={setButtonPopup} from_date={fromDate}></Model>
          </NavBtn>

          <NavLink to='/'>
            Home
          </NavLink>

          <NavBtn>
            <button className={'create-btn'} onClick={() => setState('agenda')}>Events</button>
          </NavBtn>
        </nav>

        <NavBtn className={"sign-btn"} >
          <NavBtnLink  onClick={() => { setOutPopup(true) }}>Log Out</NavBtnLink>
          <LogOut trigger={outPopup} setTrigger={setOutPopup}></LogOut>
        </NavBtn>
      </div>
      <div className={`calendar ${menuOpen ? 'active':''}`}>
        <Calendar
          selectable={true}
          localizer={localizer}
          events={myEventsList}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          defaultView={state}
          view={state}
          onView={setState}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "87.5vh" }}
        />
        <EditMeeting trigger={editPopup} setTrigger={setEditPopup} meeting={meetingId} setMeeting={setMeetingId}></EditMeeting>
      </div>

    </div>
  );
}

