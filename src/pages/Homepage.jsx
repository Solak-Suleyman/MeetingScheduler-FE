import React from "react";
import Model from "../component/model/Model";
export  const HomePage=()=>{
    return(

        <div className="Main">
            <main class>
                <h1>Popup deneme</h1>
                <br />
                <button>Open popup</button>
                
            </main>
            <Model trigger={true}>
                    <h3>Biz Burdayızz</h3>
                </Model>
        </div>

    );
}

