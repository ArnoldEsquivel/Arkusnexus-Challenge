import { createContext, useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        window.localStorage.getItem('session') ?? false
    );

    const login = () => {
        // Lógica de inicio de sesión
        // window.localStorage.setItem('session', JSON.stringify(session))
        window.localStorage.setItem('session', true)
        setIsAuthenticated(true);
    };

    const logout = () => {
        // Lógica de cierre de sesión
        window.localStorage.removeItem('session');
        setIsAuthenticated(false);
    };

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