import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useParams } from 'react-router-dom';
import TaskList from './TaskList';
import TaskLists from './TaskLists';
import Home from './Home';
import { TaskListProvider } from './TaskListContext';
import './App.css';

function App() {
  return (
    <TaskListProvider>
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/tasklists">Task Lists</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasklists" element={<TaskLists />} />
            <Route path="/tasklists/:id" element={<TaskListWrapper />} />
          </Routes>
        </div>
      </Router>
    </TaskListProvider>
  );
}

function TaskListWrapper() {
  const { id } = useParams();
  return <TaskList id={id} />;
}

export default App;
