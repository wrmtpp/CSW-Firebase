import React, { useState, useEffect } from 'react';
import {firestore} from './index'
import Task from './Task'
import './App.css'

const App = () => {

  const [tasks,setTasks] = useState([

  ])
  const [name, setName] = useState('')

  useEffect( () => {
    retriveData()
  },[])

  const retriveData = () => {
    firestore.collection("tasks").orderBy('id', 'asc').onSnapshot( snapshot => {
      console.log(snapshot)
      let myTask = snapshot.docs.map(d => {
          const { id, name } = d.data()
          return {id,name }
      })
      setTasks(myTask)
    })
  }




  const renderTask =() =>{
    if(tasks && tasks.length){
      return tasks.map( (task,index) => (
        <Task key = {index}
              task = {task}
              deleteTask = {deleteTask}
              editTask = {editTask} />
        )
      )
     
    }else{
      return ( <li>No task</li> )
    }
  }

  const addTask = () =>{
    let id = (tasks.length === 0) ? 1 : tasks[tasks.length - 1].id + 1
       firestore.collection("tasks").doc(id + '').set({ id, name })
  }

  const deleteTask = (id) =>{
    firestore.collection('tasks').doc(id + '').delete()
  }

  const editTask = (id) => {
    firestore.collection('tasks').doc(id + '').set({id,name})
  }

  return (
    <div className='app-container'>
      <h1>Todo</h1>
      <input type="text" name="name" onChange={(e) => setName(e.target.value)} />
      <button style={{margin:'5px'}} onClick={addTask} >Submit</button> 
      <ul style={{ display: 'flex', listStyle: 'none' }} >{ renderTask() }</ul>
    </div>
  );
}

export default App;
