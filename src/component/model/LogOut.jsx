import React, { useEffect, useState } from 'react'
import './Model.css'
const LogOut = (props) => {
    useEffect(() => {
        //window.alert("Heyy")
    }, [])
     return (props.trigger) ? (
        <div className="popup">
            <div className="logout">
                <form className="logout-frm" >
                <button className="close-btn" onClick={() => props.setTrigger(false)}>X</button>
                    <h3 className='decision'>ARE YOU SURE</h3> 
                    <div className='decision-btns'>
                        <button className='decision-btn' onClick={()=>localStorage.removeItem('token')}>YES</button>
                        <button className='decision-btn' onClick={()=>props.setTrigger(false)}>NO</button>
                    </div>

                </form>
            </div>
        </div>
    ) : "";
}
export default LogOut;