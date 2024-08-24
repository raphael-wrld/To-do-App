import React from 'react'
import PropTypes from 'prop-types'

function TaskFilter ({ filter, setFilter }) {
  return (
    <div className='flex justify-center p-4 flex- wrap'>
      <button
        onClick={() => setFilter('all')}
    className={`px-4 py-2 ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} w-full sm:w-auto`}
  >
        All
      </button>
      <button
    onClick={() => setFilter('active')}
    className={`px-4 py-2 mx-2 ${filter === 'active' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} w-full sm:w-auto`}
  >
    Active
  </button>
  <button
    onClick={() => setFilter('completed')}
    className={`px-4 py-2 ${filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} w-full sm:w-auto`}
  >
    Completed
  </button>
    </div>
  )
}

TaskFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired
}

export default TaskFilter
