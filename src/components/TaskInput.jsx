// TaskInput.jsx
import React, { useState } from 'react'
import PropTypes from 'prop-types'

function TaskInput ({ addTask }) {
  const [task, setTask] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    if (task.trim()) {
      addTask(task)
      setTask('')
      setError(null)
    } else {
      setError('Task cannot be empty')
    }
  }

  return (
    <form onSubmit={handleSubmit} className='p-4 flex justify-center'>
      <div className='flex flex-col w-full max-w-md'>
        <div className='flex items-center rounded-lg overflow-hidden'>
          <input
            type='text'
            value={task}
            onChange={e => setTask(e.target.value)}
            className='flex-grow border border-gray-300 p-3 rounded-l-md'
            placeholder='Enter a new task'
          />
          <button
            type='submit'
            className='bg-blue-600 text-white p-3 rounded-r-md transition hover:bg-blue-700'
          >
            Add
          </button>
        </div>
        {error && <p className='text-red-500 mt-2'>{error}</p>}
      </div>
    </form>
  )
}

TaskInput.propTypes = {
  addTask: PropTypes.func.isRequired
}

export default TaskInput
