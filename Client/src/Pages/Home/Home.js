import React, { useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Task from '../../Components/TaskInput/TaskInput'
import AllTask from '../../Components/AllTask/AllTask'


function Home({ user }) {

  const [reRender, setReRender] = useState(false)

  return (
    <div>
      <Navbar user={user} />
      <Task reRender={reRender} setReRender={setReRender} />
      <AllTask reRender={reRender} setReRender={setReRender} />
    </div>
  )
}

export default Home
