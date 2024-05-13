import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import { useParams, useNavigate, json} from "react-router-dom";
  
function TaskList() { 
    const [tasklist, setTaskList] = useState([]); 
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => { 
        const loadPost = async () => { 
  
            let newStatus = prompt("New status?");
            let copy = JSON.parse(JSON.stringify(tasklist))
            const response = await axios.put(`http://localhost/task/${id}/status/${newStatus}`);
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