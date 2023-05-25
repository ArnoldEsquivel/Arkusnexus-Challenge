import { createContext, useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        window.localStorage.getItem('session') ?? false
    );

    useEffect(() => {
        verifyToken();
    }, []);

    const verifyToken = async () => {
        const session = JSON.parse(window.localStorage.getItem('session'))

        if (session.token) {
            await axios.put('/verify_token', { token:session.token , user: session.user })
                .then(res => {
                    if (res.data.status === 200) {
                        const newSession = {
                            token: res.data.token,
                            user: res.data.user
                        }
                        window.localStorage.setItem('session', JSON.stringify(newSession))
                        setIsAuthenticated(true);
                    }
                })
        } else {
            setIsAuthenticated(false);
        }
    };

    const login = async (session) => {
        window.localStorage.setItem('session', JSON.stringify(session))
        setIsAuthenticated(true);
    };

    const logout = () => {
        // Lógica de cierre de sesión
        window.localStorage.removeItem('session');
        setIsAuthenticated(false);
    };

    const refreshToken = () => { }

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