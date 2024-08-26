import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import TaskFilter from './components/TaskFilter'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore'
import { db } from './firebaseConfig' // Import Firestore instance

function App () {
  // const [tasks, setTasks] = useState(() => {
  //   const storedTasks = localStorage.getItem('tasks')
  //   return storedTasks ? JSON.parse(storedTasks) : []
  // })

  const [tasks, setTasks] = useState([])


  const [filter, setFilter] = useState('all')
  const [sortOption, setSortOption] = useState('dateNewest') // Add sorting state

  // useEffect(() => {
  //   localStorage.setItem('tasks', JSON.stringify(tasks))
  // }, [tasks])

  // Fetch tasks from Firestore
useEffect(() => {
  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'tasks'))
      const tasksFromFirestore = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setTasks(tasksFromFirestore)
    } catch (error) {
      console.error('Error fetching tasks from Firestore:', error)
      // Fallback to LocalStorage if Firestore fails
      const storedTasks = localStorage.getItem('tasks')
      setTasks(storedTasks ? JSON.parse(storedTasks) : [])
    }
  }
  fetchTasks()
}, [])

// Sync tasks to LocalStorage and Firestore
useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}, [tasks])

  const addTask = async taskText => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    }
   try {
  const docRef = await addDoc(collection(db, 'tasks'), newTask)
  setTasks(prevTasks => [...prevTasks, { id: docRef.id, ...newTask }])
} catch (error) {
  console.error('Error adding task to Firestore:', error)
}

  }

  const toggleComplete = async id => {
    // setTasks(
    //   tasks.map(task =>
    //     task.id === id ? { ...task, completed: !task.completed } : task
    //   )
    // )
    try {
      const taskRef = doc(db, 'tasks', id);
      const updatedTask = tasks.find(task => task.id === id);
      await updateDoc(taskRef, { completed: !updatedTask.completed });
      setTasks(
        tasks.map(task =>
          task.id === id ? { ...task, completed: !task.completed } : task
        )
      );
    } catch (error) {
      console.error("Error updating task in Firestore:", error);
    }
  }

  const deleteTask = async id => {
    // setTasks(tasks.filter(task => task.id !== id))
    try {
  await deleteDoc(doc(db, 'tasks', id))
  setTasks(tasks.filter(task => task.id !== id))
} catch (error) {
  console.error('Error deleting task from Firestore:', error)
}

  }

  const updateTask = async (id, newText) => {
    // setTasks(
    //   tasks.map(task => (task.id === id ? { ...task, text: newText } : task))
    // )
    try {
  const taskRef = doc(db, 'tasks', id)
  await updateDoc(taskRef, { text: newText })
  setTasks(
    tasks.map(task => (task.id === id ? { ...task, text: newText } : task))
  )
} catch (error) {
  console.error('Error updating task in Firestore:', error)
}

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
