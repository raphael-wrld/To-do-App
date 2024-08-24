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
  <form onSubmit={handleSubmit} className='p-4 flex flex-col items-center'>
    <div className='flex'>
      <input
        type='text'
        value={task}
        onChange={e => setTask(e.target.value)}
        className={`border p-2 rounded-l-lg w-full max-w-xs ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder='Enter a new task'
      />
      <button type='submit' className='bg-blue-600 text-white p-2 rounded-r-lg'>
        Add Task
      </button>
    </div>
    {error && <p className='text-red-500 mt-2'>{error}</p>}
  </form>
)

}

export default TaskInput;
