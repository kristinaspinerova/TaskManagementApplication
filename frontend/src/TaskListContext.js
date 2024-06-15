// src/TaskListContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const port = 5000
const TaskListContext = createContext();

const TaskListProvider = ({ children }) => {
  const [taskLists, setTaskLists] = useState([]);
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTaskLists();
  }, []);

  const fetchTaskLists = async () => {
    try {
      const response = await axios.get(`http://localhost:${port}/tasklists`);
      setTaskLists(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const fetchTasks = async (id) => {
    try {
      const response = (await axios.get(`http://localhost:${port}/tasklists/${id}`));
      setTasks((prevTasks) => ({ ...prevTasks, [id]: response.data.tasks }));
    } catch (err) {
      setError(err);
    }
  };

  const addTask = async (taskListId, name, description, status, priority, due) => {
    try {
      const data = {
        name: name,
        description: description,
        due: due+":00Z",
        priority: Number(priority),
        status: Number(status),
        taskListId: Number(taskListId)
      }
      const response = await axios.post(`http://localhost:${port}/task`, data);
      setTasks((prevTasks) => 
        ({ ...prevTasks, [taskListId]: [...prevTasks[taskListId], response.data] }));
    } catch (err) {
      setError(err);
    }
  };

  const deleteTask = async (list, taskIndex) => {
    try {
      await axios.delete(`http://localhost:${port}/task/${taskIndex}`);
      setTasks((prevTasks) => ({ ...prevTasks, [list]: prevTasks[list].filter((task) => task.id !== taskIndex) }));
    } catch (err) {
      setError(err);
    }
  };

  const updateTaskStatus = async (list, id, status) => {
    try {
      await axios.put(`http://localhost:${port}/task/${id}/status/${status}`);
      setTasks((prevTasks) => {
        const objIndex = prevTasks[list].findIndex(obj => obj.id === id);
        prevTasks[list][objIndex].status = status
        return prevTasks
      });
    } catch (err) {
      setError(err);
    }
  };

  return (
    <TaskListContext.Provider value={{ taskLists, tasks, fetchTasks, addTask, deleteTask, updateTaskStatus, loading, error }}>
      {children}
    </TaskListContext.Provider>
  );
};

export { TaskListProvider, TaskListContext };
