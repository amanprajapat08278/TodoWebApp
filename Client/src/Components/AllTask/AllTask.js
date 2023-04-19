import React, { useEffect, useState } from 'react'
import "./AllTask.css"
import axios from 'axios'



function AllTask({reRender, setReRender}) {

    let [taskData, setTaskData] = useState([])
    let [statusBool, setStatusBool] = useState([])

    let [displayTable, setDisplayTable] = useState(false)

    

    useEffect(() => {
        
        setReRender(false)
        const config = {
            headers: {
                "x-api-key": localStorage.getItem("token"),
                'content-type': 'multipart/form-data'
            },
        };

        let userId = JSON.parse(localStorage.getItem("user")).id

        let dateFun = new Date()
        let date = `${dateFun.getFullYear()}-${dateFun.getMonth()}-${dateFun.getDate()}`

        axios.get(`http://localhost:4000/task/${userId}?date=${date}`, config)
            .then((res) => {
                setTaskData(res.data.data)
                let n = res.data.data.length;
                if(n>0){setDisplayTable(true)}
                let array = new Array(n).fill(false)
                setStatusBool(array)
            })
            .catch((err) => alert(err.message))
    }, [reRender])



    const changeBtn = (i) => {
        let array = [...statusBool]
        array.splice(i, 1, true)
        setStatusBool(array)
    }

    const updateTask = (id, i, preStatus) => {

        const config = {
            headers: {
                "x-api-key": localStorage.getItem("token"),
                'content-type': 'multipart/form-data'
            },
        };
        
        let userId = JSON.parse(localStorage.getItem("user")).id
        let status = document.getElementById("select1").value

        if (status === "no select") { return alert("Please select status of task...") }
        if (preStatus === status) { 
             alert(`Status already ${status}`)
             return setReRender(true)
         }

        axios.put(`http://localhost:4000/task/${userId}/${id}`, { status }, config)
            .then(() => {
                alert("Task status update succesfully !")
                window.location.reload()
            })
            .catch((err) => alert(err.message))
    }



    const deleteTask = (id) => {
        const config = {
            headers: {
                "x-api-key": localStorage.getItem("token"),
                'content-type': 'multipart/form-data'
            },
        };

        let confirmation = window.confirm("Are you sure")
        if (confirmation) {
            let userId = JSON.parse(localStorage.getItem("user")).id

            axios.delete(`http://localhost:4000/task/${userId}/${id}`, config)
                .then(() => {
                    setReRender(true)
                })
                .catch((err) => alert(err.message))
        }
    }

    return (
        <div>
            {displayTable?<table>
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
                            <td className='task-status'>{(!statusBool[i]) ? <td className='t-body'>{x.status}</td> : <td className='t-body'><select id='select1'>
                                <option value="no select">select</option>
                                <option value="pending">Pending</option>
                                <option value="in progress">In progress</option>
                                <option value="completed">Completed</option>
                            </select></td>
                            }</td>
                            <td > {(!statusBool[i]) ? <td className='u-btn'><i className="fa-solid fa-pen-to-square" onClick={() => changeBtn(i)}></i></td>
                                : <i onClick={() => updateTask(x.id, i, x.status)} className="fa-solid fa-circle-check"></i>}</td>

                            <td><i className="fa-solid fa-trash" onClick={() => deleteTask(x.id)}></i></td>
                        </tr>)
                    })}

                </tbody>
            </table>:
            <h1 id='notask'>No task added</h1>
            }
        </div>
    )
}

export default AllTask
