import React, { useState } from 'react'
import "./TaskInput.css"
import axios from 'axios'
import { useNavigate } from "react-router-dom"


function Task() {

    const [task, setTask] = useState("")

    const navigate = useNavigate()

    const addTask=()=>{
        let status = document.getElementById("select").value

        if(!task){return alert("Please write a task...")}
        if(status==="no select"){return alert("Please select status of task...")}
        
        let userId = JSON.parse(localStorage.getItem("user")).id
        
        let time = new Date().toTimeString().slice(0,8)
        let dateFun = new Date()
        let date = `${dateFun.getFullYear()}-${dateFun.getMonth()}-${dateFun.getDate()}`


        let todoData = {task, status, date, time}

        axios.post(`http://localhost:4000/task/${userId}`, todoData)
        .then(()=>{
            alert("Task added succesfully...")
            window.location.reload()
        })
        .catch((err)=>console.log(err.message))
    }

    return (
        <div>
            <div id="inputBox">

                <div className="manageTwoInputs">
                    <span> Task :  </span>
                    <input type='text' placeholder='Write your task here...' value={task} onChange={(e)=>setTask(e.target.value)} />
                </div>

                <div className="selectBox" id='selectBox'>
                    <span> Status : </span>
                    <select id='select'>
                        <option value="no select">select</option>
                        <option value="pending">Pending</option>
                        <option value="in progress">In progress</option>
                        <option value="done">Done</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <div className="manageTwoInputs">
                    <button id='btntodo' onClick={addTask} >Add</button>
                </div>
            </div>
        </div>
    )
}

export default Task
