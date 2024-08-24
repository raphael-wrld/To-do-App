import React, { useState } from 'react'
import PropTypes from 'prop-types'

function TaskItem ({ task, toggleComplete, deleteTask, updateTask }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTaskText, setEditTaskText] = useState(task.text)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    updateTask(task.id, editTaskText)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditTaskText(task.text)
  }

  return (
    <div
      className={`flex items-center justify-between p-2 my-2 border rounded ${
        task.completed ? 'bg-green-200' : 'bg-white'
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
            Save
          </button>
          <button onClick={handleCancel} className='text-gray-500'>
            Cancel
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
        </div>
      )}
      {!isEditing && (
        <div>
          <button onClick={handleEdit} className='text-blue-500 mr-2'>
            Edit
          </button>
          <button onClick={() => deleteTask(task.id)} className='text-red-500'>
            Delete
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
    completed: PropTypes.bool.isRequired
  }).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired
}

export default TaskItem
