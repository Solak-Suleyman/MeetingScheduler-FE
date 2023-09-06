import React, { useState } from "react";
import Model from "../component/model/Model";
import EditMeeting from "../component/model/EditMeetingModel"
export  const HomePage=()=>{
    const [buttonPopUp,setButtonPopup]=useState(false);
    const [popUp,setPopUp]=useState(true);
    return(

        <div className="Main">
            <main>
                <h1>Popup deneme</h1>
                <br />
                <button onClick={()=>setButtonPopup(true)}>Open popup</button>
                
            </main>
            <Model trigger={buttonPopUp} setTrigger={setButtonPopup}>
            </Model>
            <EditMeeting trigger={popUp} setTrigger={setPopUp}>
                sa
            </EditMeeting>
        </div>

    );
}

