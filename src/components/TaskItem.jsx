// TaskItem.jsx
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi' // Use icons for actions

function TaskItem ({ task, toggleComplete, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTaskText, setEditTaskText] = useState(task.text)

  const handleEdit = () => setIsEditing(true)
  const handleSave = () => {
    updateTask(task.id, editTaskText)
    setIsEditing(false)
  }
  const handleCancel = () => {
    setIsEditing(false)
    setEditTaskText(task.text)
  }

const priorityColor = {
  High: 'text-red-500',
  Medium: 'text-yellow-500',
  Low: 'text-green-500'
}[task.priority]

  return (
    <div
      className={`flex items-center justify-between p-3 my-2 border rounded-md shadow-sm transition ${
        task.completed ? 'bg-green-100' : 'bg-white'
      }`}
    >
      {isEditing ? (
        <div className='flex items-center w-full'>
          <input
            type='text'
            value={editTaskText}
            onChange={e => setEditTaskText(e.target.value)}
            className='border p-2 rounded w-full mr-2'
          />
          <button onClick={handleSave} className='text-green-500 mr-2'>
            <FiSave />
          </button>
          <button onClick={handleCancel} className='text-gray-500'>
            <FiX />
          </button>
        </div>
      ) : (
        <div className='flex items-center w-full'>
          <input
            type='checkbox'
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
            className='mr-2'
          />
          <span className={task.completed ? 'line-through text-gray-500' : ''}>
            {task.text}
            </span>
            ;<span className={`${priorityColor} ml-2`}>{task.priority}</span>
        </div>
      )}
      {!isEditing && (
        <div className='flex'>
          <button onClick={handleEdit} className='text-blue-500 mr-2'>
            <FiEdit2 />
          </button>
          <button onClick={() => deleteTask(task.id)} className='text-red-500'>
            <FiTrash2 />
          </button>
        </div>
      )}
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    priority: PropTypes.string.isRequired // Add this line
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired
}


export default TaskItem
