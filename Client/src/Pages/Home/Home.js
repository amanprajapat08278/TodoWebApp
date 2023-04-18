import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Task from '../../Components/TaskInput/TaskInput'
import AllTask from '../../Components/AllTask/AllTask'


function Home() {
  return (
    <div>
      <Navbar/>
      <Task/>
      <AllTask/>
    </div>
  )
}

export default Home
