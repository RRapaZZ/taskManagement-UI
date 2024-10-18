import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';
import Navbar from './components/Navbar';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

    // Funciones de inicio y cierre de sesión
    const handleLogin = () => {
        setIsAuthenticated(true);
        // Guardar token en localStorage o contexto global
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        // Eliminar el token de autenticación
        localStorage.removeItem('authToken');
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            <Routes>
                {/* Redirigir a Signin como página predeterminada */}
                <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Signin onLogin={handleLogin} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
                
                {isAuthenticated ? (
                    <>
                        <Route path="/home" element={<Home />} />
                        <Route path="/tasks" element={<TaskList />} />
                        <Route path="/tasks/create" element={<TaskForm />} />
                        <Route path="/tasks/:id" element={<TaskDetail />} />
                    </>
                ) : (
                    <Route path="*" element={<Signin onLogin={handleLogin} />} />
                )}
            </Routes>
        </Router>
    );
}

export default App;
