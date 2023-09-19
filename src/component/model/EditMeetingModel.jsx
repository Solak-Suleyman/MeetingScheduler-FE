import React, { useEffect, useState } from 'react'
import axios from "axios";
//import './EditMeeting.css';
import './Model.css';
import MultiSelect from 'react-multiple-select-dropdown-lite';
import Select from "react-dropdown-select";
import JobDone from './JobDone';
const EditMeeting = (props) => {
    const [mInfo, setMInfo] = useState([]);
    const meeting = props.meeting

    const [title, setTitle] = useState('');
    const [posts, setPosts] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [users, setUsers] = useState([]);
    const [roomId, setRoomId] = useState([]);
    const [usersIds, setUsersIds] = useState([]);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [jobPopup, setJobPopup] = useState(false);
    useEffect(() => {
        axios.get('http://localhost:7162/api/usermeeting/getByMeeting', {
            params: {
                startDate: new Date(startDate),
                endDate: new Date(endDate)
            }
        })
            .then(response => {
                console.log(response.data);
                setPosts(response.data);
                console.log(posts);
            })
            .catch(error => { console.error(error) })
    }, [startDate, endDate]);

    useEffect(() => {
        axios.get('http://localhost:7162/api/users')
            .then(
                response => {
                    console.log(response.data);
                    setPosts(response.data);
                }
            )
            .catch(error => { console.error(error) })
    }, [])
    useEffect(() => {
        axios.get('http://localhost:7162/api/meetings/GetMeetingById', { params: { id: meeting } })
            .then(response => {
                console.log(props.meeting)
                console.log(response);
                setMInfo(response.data);
                console.log(mInfo);
                setTitle(response.data.map(dat => dat.title))
                setStartDate(response.data.map(met => new Date(met.from_date).toISOString().slice(0, -8)));
                setEndDate((response.data.map(met => new Date(met.to_date).toISOString().slice(0, -8))))
                setSelectedRooms(response.data.map(room => ({ label: room.room.name, value: room.room.id })))
                setUsers(response.data.map(post => (post.userMeeting.map(users => ({ label: users.user.user_name, value: users.user.id }))))[0])
            })
            .catch(error => { console.error(error); })
        console.log(mInfo);

        //setRooms(Array(mInfo[0].room))
    }, [props, meeting])
    // useEffect(() => {
    //     if (mInfo == [[]]&&props!=null) {
    //         document.getElementById('fromdate').value = mInfo.map(met => new Date(met.from_date).toISOString().slice(0, -8));
    //         document.getElementById('todate').value = mInfo.map(met => new Date(met.to_date).toISOString().slice(0, -8));
    //         console.log('selam')
    //     }
    // }, [props,mInfo])
    useEffect(() => {
        axios.get('http://localhost:7162/api/rooms')
            .then(response => {
                setRooms(response.data)
            })

    }, [])
    const handleOnchange = val => {
        setUsersIds(val.split(",").map(Number))
        console.log(usersIds)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const dotheedit = () => {
        let editedmeeting = {
            id: meeting,
            title: document.getElementById('title').value,
            from_date: new Date(document.getElementById('fromdate').value),
            to_date: new Date(document.getElementById('todate').value),
            roomId: roomId[0].value,
            userIds: usersIds
        }

        axios.post('http://localhost:7162/api/meetings/editMeeting', editedmeeting)
            .then(response => { console.log(response) 
            if(response.status==200){
                setJobPopup(true);
            }})
            .catch(error => { console.error(error) })
    }
    return (props.trigger) ? (
        <div className="meeting-create">
            <JobDone trigger={jobPopup} setTrigger={setJobPopup} job={"Editted"} setUpperTrigger={props.setTrigger}  />

            <div className="popup">
                <div className="popup-inner">
                    <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>

                    <form className="meeting" onSubmit={handleSubmit} >
                        <label htmlFor="title" className="meeting-label" >Title</label>
                        <input type="text" name="title" id="title" /*placeholder={title}*/ value={title} required={true} onChange={(e) => setTitle(e.target.value)} />
                        <label htmlFor="fromdate" className="meeting-lable">Start Date</label>
                        <input type="datetime-local" name="fromdate" id="fromdate" min={new Date().toISOString().slice(0, -8)} onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                        <label htmlFor="todate" className="meeting-title">End Date</label>
                        <input type="datetime-local" name="todate" id="todate" min={startDate} onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                        <h1>{title}</h1>
                        <label htmlFor="text" className="meeting-label">Users</label>
                        <div className='multi-select'>
                            <MultiSelect id="users"
                                onChange={handleOnchange}
                                options={posts.map(post => ({ label: post.user_name, value: post.id }))}
                                defaultValue={users}
                            />
                        </div>
                        {/* <h1>{document.getElementById('fromdate').value}</h1> */}
                        {/* <h1>{console.log(mInfo.map(post => (post.userMeeting.map(users=>({ label: users.user.user_name , value:users.user.id})))))}</h1> */}
                        {/* <h1>{props.meeting}</h1> */}
                        <label htmlFor="text" >Rooms</label>
                        <Select
                            onChange={(value) => setRoomId(value)}
                            options={rooms.map(room => ({ label: room.name, value: room.id }))}
                            values={selectedRooms} />
                        <button className='submit-btn' onClick={() => dotheedit()}>Güncelle</button>
                    </form>

                </div>
            </div>
        </div>
    ) : "";
}
export default EditMeeting