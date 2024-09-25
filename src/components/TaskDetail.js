import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function TaskDetail() {
    const [task, setTask] = useState({
        title: '',
        description: '',
        important: false,
    });
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`http://127.0.0.1:8000/api/tasks/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setTask(response.data);
        })
        .catch(error => {
            console.error('There was an error fetching the task!', error);
        });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setTask(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleUpdate = () => {
        const token = localStorage.getItem('token');
        axios.put(`http://127.0.0.1:8000/api/tasks/${id}/`, task, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            alert('Task updated successfully!');
            navigate('/tasks');
        })
        .catch(error => {
            console.error('There was an error updating the task!', error);
        });
    };

    const handleComplete = () => {
        const token = localStorage.getItem('token');
        axios.patch(`http://127.0.0.1:8000/api/tasks/${id}/`, { datecompleted: new Date().toISOString() }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            alert('Task marked as completed!');
            navigate('/tasks');
        })
        .catch(error => {
            console.error('There was an error completing the task!', error);
        });
    };

    const handleDelete = () => {
        const token = localStorage.getItem('token');
        axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            alert('Task deleted successfully!');
            navigate('/tasks');
        })
        .catch(error => {
            console.error('There was an error deleting the task!', error);
        });
    };

    if (!task) return <div>Loading...</div>;

    return (
        <div className="max-w-lg mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
            <div>
                <label className="block text-gray-700">Title</label>
                <input 
                    type="text" 
                    name="title" 
                    value={task.title} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>
            <div>
                <label className="block text-gray-700">Description</label>
                <textarea 
                    name="description" 
                    value={task.description} 
                    onChange={handleChange} 
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
            </div>
            <div>
                <label className="block text-gray-700">Important</label>
                <input 
                    type="checkbox" 
                    name="important" 
                    checked={task.important} 
                    onChange={handleChange} 
                    className="mt-1"
                />
            </div>
            <div className="space-x-4 mt-4">
                <button 
                    onClick={handleUpdate} 
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                    Update
                </button>
                {!task.datecompleted && 
                    <button 
                        onClick={handleComplete} 
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
                    >
                        Mark as Completed
                    </button>
                }
                <button 
                    onClick={handleDelete} 
                    className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-200"
                >
                    Delete Task
                </button>
            </div>
        </div>
    );
}

export default TaskDetail;
