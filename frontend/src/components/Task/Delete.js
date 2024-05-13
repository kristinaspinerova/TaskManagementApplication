import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import { useParams, useNavigate} from "react-router-dom";
  
function TaskList() { 
    const [tasklist, setTaskList] = useState([]); 
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => { 
        const loadPost = async () => { 
  
            const response = await axios.delete(`http://localhost/task/${id}`);
            let copy = JSON.parse(JSON.stringify(tasklist))
            copy.tasks = tasklist.tasks?.filter((task) => task.id !== id)
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