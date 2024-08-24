import React from 'react'
import PropTypes from 'prop-types'

function TaskItem ({ task, toggleComplete, deleteTask }) {
  return (
    <div
      className={`flex items-center justify-between p-2 my-2 border rounded ${
        task.completed ? 'bg-green-200' : 'bg-white'
      }`}
    >
      <div className='flex items-center'>
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
      <button onClick={() => deleteTask(task.id)} className='text-red-500'>
        Delete
      </button>
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
  deleteTask: PropTypes.func.isRequired
}

export default TaskItem
