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
          const response = await axios.get('/user/profile', {
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
      // שליחת בקשה לשרת עם פרטי המשתמש
      const response = await axios.post(`${API_SERVER_URL}/user/login`,
        { email, password }, 
        { withCredentials: true },);
      const { token } = response.data;
      localStorage.setItem('token', token);
      setToken(token);
      // אם ההתחברות הצליחה
      console.log(response?.data?.message); // "Login successful"
    } catch (error) {
      console.error('Login failed:', error?.response?.data?.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
