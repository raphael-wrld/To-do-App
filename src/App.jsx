import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import TaskFilter from './components/TaskFilter'

function App () {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasks')
    return storedTasks ? JSON.parse(storedTasks) : []
  })

  const [filter, setFilter] = useState('all')

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

  const updateTask = (id, newText) => {
    setTasks(
      tasks.map(task => (task.id === id ? { ...task, text: newText } : task))
    )
  }

  const filteredTasks = tasks.filter(task => {
  if (filter === 'completed') return task.completed
  if (filter === 'active') return !task.completed
  return true
})


  return (
    <div className='min-h-screen bg-gray-100 flex justify-center items-center px-4'>
      <div className = 'w-full max-w-md'>
      <Header />
      <TaskInput addTask={addTask} />
      <TaskFilter filter={filter} setFilter={setFilter} /> {/* Add filter component */}
      <TaskList
        // tasks={tasks}
        tasks = { filteredTasks }
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
      </div>
      </div>
  )
}

export default App
