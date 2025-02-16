import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_SERVER_URL } from '../api/api';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // הפעלת useEffect כדי לטעון את המשתמש בהתחלה, אם יש token
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          // שליחה של בקשה לשרת עם ה-token שנמצא ב-localStorage
          const response = await axios.get(`${API_SERVER_URL}/user/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data.user); // עדכון המשתמש מה-API
        } catch (error) {
          console.error('Error fetching user:', error);
          setUser(null); // במידה ויש טעות, נדאג להחזיר את המשתמש ל-null
        }
      }
    };

    fetchUser();
  }, [token]); // רק אם ה-token משתנה

  const login = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_SERVER_URL}/user/login`, 
            { email, password },
            { 
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const { token, user: loggedInUser } = response.data;
        
        if (!token || !loggedInUser) {
            throw new Error('Invalid response from server');
        }

        // Set the token in axios defaults for future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Store in localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        
        // Update context
        setToken(token);
        setUser(loggedInUser);
        
        return { success: true };
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        throw error;
    }
};

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken('');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
