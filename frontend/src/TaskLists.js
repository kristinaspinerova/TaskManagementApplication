// src/TaskLists.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TaskListContext } from './TaskListContext';

function TaskLists() {
  const { taskLists, loading, error } = useContext(TaskListContext);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching task lists</p>;

  return (
    <div>
      <h1>Task Lists</h1>
      <ul>
        {taskLists.map((idName, index) => (
          <li key={index}>
            <Link to={`/tasklists/${idName.split(".")[0]}`}>{idName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskLists;
