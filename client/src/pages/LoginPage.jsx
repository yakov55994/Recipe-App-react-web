import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_SERVER_URL } from '../api/api.js';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_SERVER_URL}/user/login`, { email, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      const user = response.data.user._id;
      toast.success(`התחברת בהצלחה, שלום ${response.data.user.username}`)
      localStorage.setItem('user', user);
      navigate('/home');
    } catch (err) {
      console.error(err);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 to-cyan-600 ">
    <div className="bg-white p-10 rounded-3xl shadow-2xl w-full sm:w-96 transform transition-all duration-500 hover:scale-105 mt-8 mb-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8">דף התחברות</h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">אימייל</label>
            <input
              type="email"
              name="email"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="israel123@gmail.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">סיסמה</label>
            <input
              type="password"
              name="password"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            התחבר
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">עדיין אין לך חשבון? </span>
          <a href="/signup" className="text-teal-600 font-semibold hover:underline">הירשם</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
