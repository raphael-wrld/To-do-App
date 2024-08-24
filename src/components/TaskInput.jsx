//TaksInput.jsx
import React, { useState } from 'react';

function TaskInput({ addTask }) {
    const [task, setTask] = useState('');
    const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
        setTask('');  // Clear the input field
           setError(null);  // Clear error
    } else {
      setError('Task cannot be empty');
    }
  };

  return (
  <form onSubmit={handleSubmit} className='p-4 flex justify-center flex-wrap'>
    <div className='flex'>
      <input
        type='text'
        value={task}
        onChange={(e) => setTask(e.target.value)}
    className="border border-gray-300 p-2 rounded-l-lg w-full sm:w-auto max-w-xs"
    placeholder="Enter a new task"
  />
      <button type='submit' className='bg-blue-600 text-white p-2 rounded-r-lg mt-2 sm:mt-0'>
        Add Task
      </button>
    </div>
    {error && <p className='text-red-500 mt-2'>{error}</p>}
  </form>
)

}

export default TaskInput;
