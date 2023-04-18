import React, { useEffect, useState } from 'react'
import "./AllTask.css"
import axios from 'axios'



function AllTask() {

    let [taskData, setTaskData] = useState([])
    let [statusBool, setStatusBool] = useState([])

    let userId = JSON.parse(localStorage.getItem("user")).id

    let dateFun = new Date()
    let date = `${dateFun.getFullYear()}-${dateFun.getMonth()}-${dateFun.getDate()}`

    useEffect(() => {
        axios.get(`http://localhost:4000/task/${userId}?date=${date}`)
            .then((res) => {
                setTaskData(res.data.data)
                let n = res.data.data.length;
                let array = new Array(n).fill(false)
                setStatusBool(array)
            })
            .catch((err) => console.log(err.message))
    }, [])



    const changeBtn = (i) => {
        let array = [...statusBool]
        array.splice(i, 1, true)
        setStatusBool(array)
    }

    const updateTask = (id, i, preStatus) => {

        let status = document.getElementById("select1").value

        if (status === "no select") { return alert("Please select status of task...") }
        if (preStatus === status) { return alert("Status had updated succesfully...") }

        axios.put(`http://localhost:4000/task/${userId}/${id}`, { status })
            .then(() => {
                alert("Task status update succesfully !")
                window.location.reload()
            })
            .catch((err) => alert(err.message))
    }



    const deleteTask = (id) => {
        let confirmation = window.confirm("Are you sure")
        if (confirmation) {
            axios.delete(`http://localhost:4000/task/${userId}/${id}`)
                .then(() => {
                    window.location.reload()
                })
                .catch((err) => alert(err.message))
        }
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th className='taskBox' id='taskBox'>Task</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {taskData.map((x, i) => {
                        return (<tr>
                            <td>{x.time}</td>
                            <td className='taskBox'>{x.task}</td>
                            {(!statusBool[i]) ? <td>{x.status}</td> : <select id='select1'>
                                <option value="no select">select</option>
                                <option value="pending">Pending</option>
                                <option value="in progress">In progress</option>
                                <option value="done">Done</option>
                                <option value="completed">Completed</option>
                            </select>
                            }
                            {(!statusBool[i]) ? <td><i className="fa-solid fa-pen-to-square" onClick={() => changeBtn(i)}></i></td>
                                : <button id='btntodo' onClick={() => updateTask(x.id, i, x.status)}  >Update</button>}

                            <td><i className="fa-solid fa-trash" onClick={() => deleteTask(x.id)}></i></td>
                        </tr>)
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default AllTask
