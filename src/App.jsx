import React, { useState } from 'react'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
// import { v4 as uuidv4 } from 'uuid';
function App () {
  const [tasks, setTasks] = useState([])

  const addTask = task => {
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }])
  }

  const toggleComplete = id => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    )
  }

  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className='min-h-screen bg-gray-100'>
      <Header />
      <TaskInput addTask={addTask} />
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    </div>
  )
}

export default App
