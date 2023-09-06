import React,{useState,useEffect} from "react"
import logo from './logo.png';
import "../App";
import { useNavigate} from "react-router-dom";
import axios from "axios";
// import { Register } from "./Register";
export const Login=(props)=>{
    let navigate = useNavigate();
    
    const [posts, setPosts] = useState([]);
    const [user_name,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const gotoregister=()=>{
        navigate('/register')
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault();  
    }
    const  get= ()=> {
        console.log("başlıyor")

        axios.post('https://localhost:7162/api/login',null, { params: {
            user_name,
            password
          }})
          .then(response => {
            setPosts(response.data);
            console.log(response.data)
            console.log(response)
            if (response.status===200) {
                navigate('/calendar');  
            }
          })
          .catch(error => {
            console.error(error);
          });
         
        
    }
    useEffect(() => {
        
      }, []);
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
                    <input value={user_name} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Your User Name" id="user_name" name="user_name"/>

                    <label className="auth-label" htmlFor="password">Password</label>
                    <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password"placeholder="Your Password" id="password" name="password" />

                    <button className="submit-btn" onClick={()=>get()} type="submit">Login</button>
            </form>

                <button className="link-btn" onClick={gotoregister} >Dont Have An Account? Register</button>

            </div>
        </div>
    )
    
}