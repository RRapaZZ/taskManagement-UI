import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TaskForm() {
    const [formData, setFormData] = useState({ title: '', description: '', important: false });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e) => {
        setFormData({ ...formData, important: e.target.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        console.log(formData);  // Verifica que el formData tenga todos los datos correctos
    
        axios.post('http://127.0.0.1:8000/api/create_task/', formData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            console.log('Task created successfully:', response.data);
            navigate('/tasks');
        })
        .catch(error => {
            console.error('There was an error creating the task!', error.response.data);
        });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Task</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            onChange={handleChange} 
                            required 
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Description</label>
                        <textarea 
                            name="description" 
                            onChange={handleChange} 
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Important</label>
                        <input 
                            type="checkbox" 
                            name="important" 
                            onChange={handleCheckboxChange} 
                            className="mt-1"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                    >
                        Create Task
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TaskForm;
