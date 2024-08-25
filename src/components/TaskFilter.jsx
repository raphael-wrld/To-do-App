// TaskFilter.jsx
import React from 'react'
import PropTypes from 'prop-types'

function TaskFilter ({ filter, setFilter }) {
  return (
    <div className='flex justify-center space-x-4 p-4'>
      {['all', 'active', 'completed'].map(option => (
        <button
          key={option}
          onClick={() => setFilter(option)}
          className={`px-4 py-2 rounded-lg transition ${
            filter === option
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-200 text-blue-600'
          }`}
        >
          {option.charAt(0).toUpperCase() + option.slice(1)}
        </button>
      ))}
    </div>
  )
}

TaskFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
}

export default TaskFilter
