import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
import { Link } from "react-router-dom";
  
function TaskList() { 
    const [loading, setLoading] = useState(false); 
    const [tasklist, setPosts] = useState([]); 
  
    useEffect(() => { 
        const loadPost = async () => { 
            // Till the data is fetch using API 
            // the Loading page will show. 
            setLoading(true); 
  
            // Await make wait until that 
            // promise settles and return its result 
            const response = await axios.get( 
                "http://localhost/tasklists/1"
            ); 
  
            // After fetching data stored it in posts state. 
            setPosts(response.data); 
  
            // Closed the loading page 
            setLoading(false); 
        }; 
  
        // Call the function 
        loadPost(); 
    }, []); 
  
    return ( 
        <> 
            <div className="TaskList"> 
                {loading ? ( 
                    <h4>Loading...</h4> 
                ) : ( 
                    <div>
                        <h4>{tasklist.name}</h4>
                        <p>Description: {tasklist.description}</p>
                        <p>Creator: {tasklist.user?.name} {tasklist.user?.surname}</p>
                        <p>Creation date: {tasklist.creationDate?.toString()}</p>
                        { 
                            tasklist.tasks?.map((task) => ( 
                            <div class="task">
                                <p>Name: {task.name}</p>
                                <p>Description: {task.description}</p>
                                <p>Due date: {task.due?.toString()}</p>
                                <p>Priority: {task.priority}</p>
                                <p>Status: {task.status}</p>
                                <Link to={`/task/${task.id}`}>
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </Link>
                            </div> ))
                        }
                    </div>
                )} 
            </div> 
        </> 
    ); 
} 
  
export default TaskList; 