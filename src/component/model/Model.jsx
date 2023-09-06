import React from 'react'
import './Model.css'
import ReactScrollableList from 'react-scrollable-list'

const Model = (props) => {
    let listItems = []
    for (let i = 0; i < 30; i++) {
    listItems.push({ id: i, content: i })
}
  return (props.trigger)?(
    <div className='popup'>
      <div className="popup-inner">
        <button className="close-btn">X</button>
        <form className="meeting-create">
            <label htmlFor="text" className="meeting-label">Title</label>
            <input type="text" name="title" id="title" placeholder='Title' />
            <label htmlFor="text" className="meeting-label">Starting Date</label>
            <input type="datetime-local" name="" id="" />
            <label htmlFor="text" className="meeting-label">Ending Date</label>
            <input type="datetime-local" name="" id="" />
            <label htmlFor="text" className="meeting-label">Room</label>
            <ReactScrollableList className="scroll-list"
                listItems={listItems}
                heightOfItem={30}
                maxItemsToRender={20}
                style={{ color: '#333' }}/>  
            <label htmlFor="text" className="meeting-label">Users</label>
            <ReactScrollableList
                listItems={listItems}
                heightOfItem={30}
                maxItemsToRender={20}
                style={{ color: '#333' }}/>  
            <label htmlFor="text" className="meeting-label"></label>



        </form>
        {props.children}
      </div>
    </div>
  ):"";
}

export default Model
