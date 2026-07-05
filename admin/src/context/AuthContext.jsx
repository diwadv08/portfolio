import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../url/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    // isAuthenticated: null = not checked yet, true/false = known
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [username, setUsername] = useState(null);
    const [checkingSession, setCheckingSession] = useState(true);

    const verifySession = useCallback(async () => {
        setCheckingSession(true);
        try {
            const res = await api.get('/verify');
            setIsAuthenticated(true);
            setUsername(res.data.username);
        } catch (err) {
            setIsAuthenticated(false);
            setUsername(null);
        } finally {
            setCheckingSession(false);
        }
    }, []);

    useEffect(() => {
        verifySession();
    }, [verifySession]);

    const login = async (loginUsername, password) => {
        const res = await api.post('/login', { username: loginUsername, password });
        setIsAuthenticated(true);
        setUsername(res.data.username);
        return res.data;
    };

    const logout = async () => {
        try {
            await api.post('/logout');
        } finally {
            setIsAuthenticated(false);
            setUsername(null);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, username, checkingSession, login, logout, verifySession }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}
