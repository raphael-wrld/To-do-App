//TaksInput.jsx
import React, { useState } from 'react';

function TaskInput({ addTask }) {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      addTask(task);
      setTask('');  // Clear the input field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 flex justify-center">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="border border-gray-300 p-2 rounded-l-lg w-full max-w-xs"
        placeholder="Enter a new task"
      />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded-r-lg">
        Add Task
      </button>
    </form>
  );
}

export default TaskInput;
