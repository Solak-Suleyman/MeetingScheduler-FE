import React from "react";
import gif from './meeting.gif'
import './JobDone.css'

const JobDone = (props) => {

    return (props.trigger) ? (
        <div className="popups">

            <div className="popup-inner-job">
                <button className="close-btn-job" onClick={() => props.setTrigger(false)}>X</button>
                <p>Meeting {props.job} Successfully</p>
                <img height={"150px"} src={gif} alt="" />
                <button className="submit-btn" onClick={() => {
                    window.location.reload(true)
                }}>OK</button>
            </div>
        </div>) : "";
}
export default JobDone;