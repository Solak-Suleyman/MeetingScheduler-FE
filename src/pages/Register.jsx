import React, { useEffect, useState } from "react"
import logo from './logo.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const Register = (props) => {
    let navigate = useNavigate();
    const goto = () => {
        navigate("/login")
    }
    const [user_name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user_name);
    }
    const create = () => {
        console.log("başlıyor");
        const data = {
            id: 0,
            user_name: user_name,
            name: name,
            surname: surname,
            password: password,
            status: 'A'
        };
        console.log(data);
        axios.post('http://localhost:7162/api/register', data)
        .then(response=>{
            if (response.status===200) {
                goto()
            }
        })
        .catch(error => { console.error(error); });

    }
    // useEffect(()=>{
    //     const 
    // },[]);
    return (

        <div className="Main">
            <header>
                <title>Register</title>
            </header>
            <div className="auth-form-container">
                <div>
                    <div>
                        <img src={logo} width={100} height={100} />
                    </div>
                    <label className="title" htmlFor="img">Meeting Scheduler</label>

                </div>
                <form className="register-form" onSubmit={handleSubmit}>

                    <label className="auth-label" htmlFor="text">User Name</label>
                    <input value={user_name} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Your User Name" id="user_name" name="user_name" />

                    <label className="auth-label" htmlFor="text">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Your Name" id="name" name="name" />

                    <label className="auth-label" htmlFor="text">Surname</label>
                    <input value={surname} onChange={(e) => setSurName(e.target.value)} type="text" placeholder="Your Surname" id="surname" name="surname" />

                    <label className="auth-label" htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Your Password" id="password" name="password" />

                    <button className="submit-btn" onClick={create} type="submit">Register</button>

                </form>
                <button className="link-btn" onClick={goto}>Already Have An Account? Login</button>
            </div>
        </div>
    )
}