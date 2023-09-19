import React, { useEffect, useState } from 'react'
import './Model.css'
import ReactScrollableList from 'react-scrollable-list'
import axios from 'axios'
import MultiSelect from 'react-multiple-select-dropdown-lite'
import 'react-multiple-select-dropdown-lite/dist/index.css'
import Select from "react-dropdown-select";
import { TimeGrid } from 'react-big-calendar'
import JobDone from './JobDone';

const Model = (props) => {
  let listItems = [];
  for (let i = 0; i < 30; i++) {
    listItems.push({ id: i, content: i });
  }
  const options = [
    { label: 'Option 1', value: 'option_1' },
    { label: 'Option 2', value: 'option_2' },
    { label: 'Option 3', value: 'option_3' },
    { label: 'Option 4', value: 'option_4' },
  ]
  const [value, setValues] = useState('');
  const [title, setTitle] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [roomId, setRoomId] = useState('');
  const [usersIds, setUsersIds] = useState('');
  const [jobPopup, setJobPopup] = useState(false);

  const handleOnchange = val => {
    setUsersIds(val.split(",").map(Number))
    console.log(usersIds)
  }
  const [posts, setPosts] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [created, setCreated] = useState([]);
  const create = () => {

    let meeting = {
      id: 0,
      title: title,
      from_date: new Date(fromDate),
      to_date: new Date(toDate),
      roomId: roomId[0].value,
      userIds: usersIds
    }
    console.log(meeting);
    axios.post('http://localhost:7162/api/meetings/addmeeting', meeting)
      .then(response => {
        if (response.status==200) {
          setJobPopup(true);
        }
        setCreated(response.data);
        console.log(response.data);
        console.log(response.request);
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  useEffect(() => {
    console.log("başlıyor")

    axios.get('http://localhost:7162/api/rooms')
      .then(response => {
        setRooms(response.data)
      })
      .catch(error => console.error(error));
    console.log("sellll|||")


    console.log(props.trigger)

  }, []);
  useEffect(() => {
    axios.get('http://localhost:7162/api/usermeeting/getByMeeting', {
      params: {
        startDate: new Date(fromDate),
        endDate: new Date(toDate)
      }
    })
      .then(response => {
        console.log(response.data);
        setPosts(response.data);
        console.log(posts);
      })
      .catch(error => { console.error(error) })
  }, [fromDate, toDate]);
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (props.trigger) ? (
    <div className='popup'>
      <div className="popup-inner">
      <JobDone trigger={jobPopup} setTrigger={setJobPopup} job={"Created"} setUpperTrigger={props.setTrigger}  />
        <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
        <form className="meeting" onSubmit={handleSubmit}>
          <label htmlFor="text" className="meeting-label">Title</label>
          <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} id="title" placeholder='Title' value={title} />
          <label htmlFor="text" className="meeting-label">Starting Date</label>
          <input type="datetime-local" name="fromDate" onChange={(e) => setFromDate(e.target.value)}  dafaultValue={new Date().toISOString().slice(0, -8)} min={new Date().toISOString().slice(0, -8)} id="fromDate" />
          <label htmlFor="text" className="meeting-label">Ending Date</label>
          <input type="datetime-local" name="toDate" onChange={(e) => setToDate(e.target.value)} id="toDate" min={fromDate}  defaultValue={fromDate}/>
          <label htmlFor="text" className="meeting-label">Users</label>
          <div className='multi-select'>
            <MultiSelect
              onChange={handleOnchange}
              options={posts.map(post => ({ label: post.name, value: post.id }))}
            />
          </div>
          <label htmlFor="text" className="meeting-label">Room</label>
          <Select options={rooms.map(room => ({ label: room.name, value: room.id }))} onChange={(value) => setRoomId(value)} />
          <br />
          <button type='submit' onClick={create}>Oluştur</button>
        </form>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default Model
