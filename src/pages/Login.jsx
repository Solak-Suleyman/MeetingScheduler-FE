import React, { useState, useEffect } from "react"
import logo from './logo.png';
import "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { Register } from "./Register";
export const Login = (props) => {
    let navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [user_name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const gotoregister = () => {
        navigate('/register')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const get = () => {
        console.log("başlıyor")
        const loginpayload = {
            userName: user_name,
            password: password
        }

        axios.post('http://localhost:7162/authorization/token', loginpayload)
            .then(response => {
                const token = response.data.authorizationToken;
                localStorage.setItem('token', token);
                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                }
                navigate('/calendar')
                console.log(response.data)
                // setPosts(response.data);
                // console.log(response.data)
                // console.log(response)
                // if (response.status === 200) {
                //     navigate('/calendar');
                // }
            })
            .catch(error => {

                window.alert('Kullanıcı Adı Veya şifre Yanlıi')
                console.error(error);
            });



        /**
"{\"errors\":{\"title\":[\"The title field is required.\"]},\"type\":\"https://tools.ietf.org/html/rfc7231#section-6.5.1\",\"title\":\"One or more validation errors occurred.\",\"status\":400,\"traceId\":\"00-a1c4e93978cc7c6522d780f7347b29c7-09915add67e245ff-00\"}"
responseText
: 
"{\"errors\":{\"title\":[\"The title field is required.\"]},\"type\":\"https://tools.ietf.org/html/rfc7231#section-6.5.1\",\"title\":\"One or more validation errors occurred.\",\"status\":400,\"traceId\":\"00-a1c4e93978cc7c6522d780f7347b29c7-09915add67e245ff-00\"}"
responseType
: 
"" */
    }


    return (
        <div className="Main">
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.name}</li>
                ))}
            </ul>
            <div className="auth-form-container">
                <div>
                    <div>
                        <img alt="" src={logo} width={100} height={100} />
                    </div>
                    <label className="title" htmlFor="img">Meeting Scheduler</label>
                </div>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label className="auth-label" htmlFor="text">User Name</label>
                    <input value={user_name} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Your User Name" id="user_name" name="user_name" />
                    <label className="auth-label" htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Your Password" id="password" name="password" />
                    <button className="submit-btn" onClick={() => get()} type="submit">Login</button>
                </form>
                <button className="link-btn" onClick={gotoregister} >Dont Have An Account? Register</button>
            </div>
        </div>
    )

}