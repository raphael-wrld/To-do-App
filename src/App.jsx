// App.jsx
import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'

function App () {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  // Save tasks to localStorage whenever the tasks state changes
  useEffect(() => {
    console.log('Saving tasks to localStorage:', tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = taskText => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    }
    setTasks(prevTasks => {
      const updatedTasks = [...prevTasks, newTask]
      console.log('Updated tasks:', updatedTasks)
      return updatedTasks
    })
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
