//TaskList.jsx
import React from 'react'
import PropTypes from 'prop-types'
import TaskItem from './TaskItem'

/**
 * Component to display a list of tasks
 * @param {Object} props
 * @param {Array} props.tasks - tasks to display
 * @param {Function} props.toggleComplete - callback to toggle task completion
 * @param {Function} props.deleteTask - callback to delete a task
 */
function TaskList ({ tasks, toggleComplete, deleteTask }) {
  console.log('Rendering TaskList with tasks:', tasks)

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

