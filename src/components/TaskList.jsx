import React from 'react'
import PropTypes from 'prop-types'
import TaskItem from './TaskItem'

function TaskList ({ tasks, toggleComplete, deleteTask }) {
  return (
    <div className='p-4'>
      {Array.isArray(tasks) && tasks.length > 0 ? (
        tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            toggleComplete={toggleComplete}
            deleteTask={deleteTask}
          />
        ))
      ) : (
        <p className='text-center text-gray-500'>No tasks available.</p>
      )}
    </div>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired
    })
  ).isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired
}

export default TaskList
