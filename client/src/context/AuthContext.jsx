import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { API_SERVER_URL } from '../api/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // Changed the login function to match how it's called in LoginPage
  const login = async (loggedInUser, token) => {  // Changed parameters to match what LoginPage sends
    try {
      // Store the token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      
      // Update state
      setToken(token);
      setUser(loggedInUser);
      
      // Set the default authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setToken('');
    // Clear the authorization header
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};