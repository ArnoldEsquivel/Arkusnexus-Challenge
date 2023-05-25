import { createContext, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        window.localStorage.getItem('session') ?? false
    );

    const login = async (session) => {
        window.localStorage.setItem('session', JSON.stringify(session))
        setIsAuthenticated(true);
    };

    const logout = () => {
        // Lógica de cierre de sesión
        window.localStorage.removeItem('session');
        setIsAuthenticated(false);
    };

    const refreshToken = () => {}

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

function useAuthContext() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuthContext };