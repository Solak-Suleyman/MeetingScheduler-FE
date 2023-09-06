import { useState, useEffect, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import axios from 'axios';
import moment from 'moment';
import '../App.css';
import Model from "../component/model/Model";
import EditMeeting from '../component/model/EditMeetingModel';
import {
  Nav,
  NavLink,

  NavMenu,
  NavBtn,
  NavBtnLink,
} from '../component/NavbarElements';


import 'react-big-calendar/lib/css/react-big-calendar.css';

export const CalendarPage = (props) => {
  const [myEvents, setEvents] = useState([]);
  const localizer = momentLocalizer(moment);
  const myEventsList = [
    { id:0 ,start: new Date(), end: new Date(), title: "special event" },
    { id:1000 ,start: new Date(), end: new Date(), title: "special event" },
    { id:500, start: new Date(), end: new Date(), title: "special event" }
  ];

  const handleSelectEvent = useCallback((event) => {setEditPopup(true);
      setMeetingId(event.id);  
  }
  );
  const [posts, setPosts] = useState([]);
  const [buttonPopUp, setButtonPopup] = useState(false);
  const [editPopup,setEditPopup]=useState(false);
  const [meetingId,setMeetingId]=useState(0);
  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      const title = window.prompt('New Event Name');
      if (title) {
        <Model></Model>
      }
    },
  )
  const [fromDate,setFromDate]=useState('2023-08-31T12:23:06.773Z');

  useEffect(() => {
    console.log("başlıyor")
    axios.get('https:/localhost:7162/api/meetings')
      .then(response => {
        console.log(response.status)
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  for (let i = 0; i < posts.length; i++) {
    //console.log(posts[i].title)
    myEventsList.push({ id:posts[i].id, start: new Date(posts[i].from_date), end: new Date(posts[i].to_date), title: posts[i].title }
    )
    //console.log(posts[i].from_date)
  }
  myEventsList.push()
  return (
    <div className='calendar-container'>
      <div className='nav-bar'>
        <Nav>
          <NavMenu className='nav-menu'>
            <NavBtn>
              <button onClick={() => setButtonPopup(true)}>Schedule A Meeting</button>
              <Model trigger={buttonPopUp} setTrigger={setButtonPopup} from_date={fromDate}></Model>
            </NavBtn>

            <NavLink to='/popup' >
              Events
            </NavLink>
            <NavLink to='/register' >
              Sign Up
            </NavLink>
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          </NavMenu>
          <NavBtn className={"sign-btn"}>
            <NavBtnLink  to='/login'>Sign In</NavBtnLink>
          </NavBtn>
        </Nav>
      </div>
      <div className='calendar'>
        <Calendar
          selectable={true}
          localizer={localizer}
          events={myEventsList}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          
          startAccessor="start"
          endAccessor="end"
          style={{ height: "87.5vh" }}
        />
        <EditMeeting trigger={editPopup} setTrigger={setEditPopup} meeting={meetingId} setMeeting={setMeetingId}></EditMeeting>
      </div>

    </div>
  );
}

