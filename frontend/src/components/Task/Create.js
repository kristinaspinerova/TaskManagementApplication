import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import { useParams, useNavigate} from "react-router-dom";
  
function TaskList() { 
    const [tasklist, setTaskList] = useState([]); 
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => { 
        const loadPost = async () => { 
            let name = prompt("Task name?");
            let description = prompt("Task description?");
            let due = prompt("Due date? (ISO 8601)");
            let priority = prompt("Priority?");
            let status = prompt("Status?");

            const data = {
                name: name,
                description: description,
                due: due,
                priority: Number(priority),
                status: Number(status),
                taskListId: 1
            }
            const response = await axios.post("http://localhost/task", data);
            let copy = JSON.parse(JSON.stringify(tasklist))
            copy.tasks?.push(response.data)
            setTaskList(copy)
            navigate("/")
        }; 
  
        // Call the function 
        loadPost(); 
    }, []); 
  
    return ( 
        <> 
        </> 
    ); 
} 
  
export default TaskList; 