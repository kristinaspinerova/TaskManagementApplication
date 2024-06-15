// src/TaskList.js
import React, { useState, useEffect, useContext } from 'react';
import { TaskListContext } from './TaskListContext';

const getCurrentDateTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

function TaskList({ id }) {
  const { tasks, fetchTasks, addTask, deleteTask, updateTaskStatus } = useContext(TaskListContext);
  const [newTask, setNewTask] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('1');
  const [priority, setPriority] = useState('3');
  const [dueDate, setDueDate] = useState(getCurrentDateTime());

  useEffect(() => {
    fetchTasks(id);
  }, [id, fetchTasks]);

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    addTask(id, newTask, description, status, priority, dueDate);
    setNewTask('');
    setDescription('');
    setStatus('1');
    setPriority('3');
    setDueDate(getCurrentDateTime());
  };

  const handleDeleteTask = (index) => {
    deleteTask(id, index);
  };

  const handleUpdateStatus = (index, newStatus) => {
    updateTaskStatus(id, index, newStatus);
  };
  return (
    <div>
      <h1>Add task</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Task name"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="1">Pending</option>
        <option value="2">In Progress</option>
        <option value="3">Completed</option>
      </select>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="1">Low</option>
        <option value="2">Medium</option>
        <option value="3">High</option>
      </select>
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
      <h1>Tasks</h1>
      <ul>
        {(tasks[id] || []).map((task) => (
          <li key={task.id}>
            <div>
              <strong>{task.name}</strong><br/>
              Description: {task.description} <br/>
              Priority: {task.priority} <br/>
              Due Date:{task.due} <br/>
              Status: <select value={task.status} onChange={(e) => handleUpdateStatus(task.id, e.target.value)}>
                  <option value="1">Pending</option>
                  <option value="2">In Progress</option>
                  <option value="3">Completed</option>
                </select>
              </div>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
