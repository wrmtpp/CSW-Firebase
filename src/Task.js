import React from 'react';
import './Task.css'

export default (props)=> {
    const {task, editTask, deleteTask} = props;
    const {id,name} = task
    return ( 
        <li > 
            <div className="id">{id}</div>
            <div className="name">{name}</div>
            <div className='bt-container'>
                <button className="green" onClick={ ()=> deleteTask(id)} >Delete</button>
                <button className="red" onClick={ ()=> editTask(id)} >Edit</button>
            </div>
        </li>
      )
}