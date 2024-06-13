import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import { useParams, useNavigate, json} from "react-router-dom";
  
function UpdateTaskStatus() { 
    const navigate = useNavigate();
    const { id } = useParams();
  
    useEffect(() => { 
        const loadPost = async () => { 
            let newStatus = prompt("New status?");
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
  
export default UpdateTaskStatus; 