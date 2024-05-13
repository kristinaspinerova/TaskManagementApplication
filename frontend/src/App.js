import './App.css';
import ReadTaskList from './components/TaskList/Read';
import CreateTask from './components/Task/Create';
import DeleteTask from './components/Task/Delete';
import UpdateTaskStatus from './components/Task/UpdateTaskStatus';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>TeamFlow - Task management application</h1>
        <Routes>
          <Route path="/" element={<ReadTaskList />} />
          <Route path="/task" element={<CreateTask />} />
          <Route path="/task/:id" element={<DeleteTask />} />
          <Route path="/task/:id/status" element={<UpdateTaskStatus />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
