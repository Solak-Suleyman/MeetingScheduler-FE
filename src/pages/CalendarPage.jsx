import { useState,useEffect } from 'react';
import {Calendar,momentLocalizer } from 'react-big-calendar';
import axios from 'axios';
import moment from 'moment';
import '../App.css';
import {
  Nav,
  NavLink,

  NavMenu,
  NavBtn,
  NavBtnLink,
} from '../component/NavbarElements';


import 'react-big-calendar/lib/css/react-big-calendar.css';

export const CalendarPage=(props) =>{
  const localizer = momentLocalizer(moment);
  const myEventsList = [
    { start: new Date(), end: new Date(), title: "special event" }
    
  ];
  const [posts, setPosts] = useState([]);

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
  return (
    <div>
      <div className='nav-bar'>
      <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
      <Nav>
        <NavMenu >
          <NavLink className="nav-link" to='/about' activeStyle>
            Schedule A Meeting
          </NavLink>
          <NavLink to='/events' activeStyle>
            Events
          </NavLink>
          <NavLink to='/register' activeStyle>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
      </div>  
      <div>
        <Calendar className='calendar'
        selectable={true}
        localizer={localizer}
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      </div>
    
  </div>
  );
}

