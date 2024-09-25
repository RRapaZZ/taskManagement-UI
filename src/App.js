import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Signin from './components/Signin';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskDetail from './components/TaskDetail';
import Navbar from './components/Navbar';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Funciones de inicio y cierre de sesión
    const handleLogin = () => {
        setIsAuthenticated(true);
        // Aquí podrías guardar un token de autenticación en el localStorage o en un contexto global
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        // Aquí puedes borrar el token de autenticación si usas uno
        localStorage.removeItem('authToken'); // Ejemplo de cómo eliminar un token
    };

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
                {isAuthenticated ? (
                    <>
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
