import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No token found. Please login first.');
            return;
        }

        axios.get('http://127.0.0.1:8000/api/tasks/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setTasks(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the tasks!', error);
        });
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Task List</h1>
            <Link 
                to="/tasks/create" 
                className="inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 mb-4"
            >
                Create New Task
            </Link>
            <ul className="space-y-4">
                {tasks.map(task => (
                    <li 
                        key={task.id} 
                        className={`p-4 rounded-lg shadow-md ${task.important ? "bg-yellow-100 border-l-4 border-yellow-500" : "bg-white"}`}
                    >
                        <Link to={`/tasks/${task.id}`} className="text-xl font-semibold">
                            {task.title} 
                            <span className={`ml-2 text-sm ${task.datecompleted ? "text-green-600" : "text-red-600"}`}>
                                {task.datecompleted ? "Completed" : "Pending"}
                            </span>
                            {task.important && (
                                <span className="ml-2 text-yellow-600 font-bold">
                                    (Important)
                                </span>
                            )}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;
