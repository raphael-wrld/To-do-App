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
  const [sortOption, setSortOption] = useState('dateNewest') // Add sorting state

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = taskText => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    }
    setTasks(prevTasks => [...prevTasks, newTask])
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

  // Filter tasks based on the filter option
  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed
    if (filter === 'active') return !task.completed
    return true
  })

  // Sort tasks based on the sorting option
  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortOption === 'dateNewest') {
      return b.id - a.id
    } else if (sortOption === 'dateOldest') {
      return a.id - b.id
    } else if (sortOption === 'alphaAZ') {
      return a.text.localeCompare(b.text)
    } else if (sortOption === 'alphaZA') {
      return b.text.localeCompare(a.text)
    } else if (sortOption === 'completedFirst') {
      return b.completed - a.completed
    } else if (sortOption === 'activeFirst') {
      return a.completed - b.completed
    }
    return 0
  })

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center px-4'>
      <Header />
      <div className='w-full max-w-lg mt-6 bg-white rounded-lg shadow-md p-6'>
        <TaskInput addTask={addTask} />
        <TaskFilter filter={filter} setFilter={setFilter} />
        <div className='flex justify-center mb-4'>
          <select
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
            className='p-2 border rounded sort-dropdown'
          >
            <option value='dateNewest'>Newest First</option>
            <option value='dateOldest'>Oldest First</option>
            <option value='alphaAZ'>A-Z</option>
            <option value='alphaZA'>Z-A</option>
            <option value='completedFirst'>Completed First</option>
            <option value='activeFirst'>Active First</option>
          </select>
        </div>
        <TaskList
          tasks={sortedTasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      </div>
    </div>
  )
}

export default App
