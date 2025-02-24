import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_SERVER_URL } from "../../api/api.js";
import { useAuth } from '../../context/AuthContext.jsx';
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, login } = useAuth(); // קבלת פונקציית `login` מהקונטקסט
  const navigate = useNavigate();

  //   if (user) {
  //     navigate("/home");
  //     toast.info('אתה כבר מחובר !')
  //     return;
  //   }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token || user) {
      // alert(`User ${user}` + "מחובר")
      navigate("/home");
    }
  }, [user]);


  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_SERVER_URL}/user/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { user, token } = response.data;

      await login(user, token); // חכה שהפעולה תסתיים

      console.log("localStorage.user ", localStorage.getItem('user'))
      toast.success('התחברת בהצלחה !');
      console.log("Login successful:", user);
      navigate("/home");
    } catch (err) {
      toast.error('ההתחברות נכשלה. אנא בדוק את פרטי ההתחברות שלך');
      setError('פרטי ההתחברות שגויים'); // הוספת הודעת שגיאה למשתמש
      console.error("Login error:", err.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-400 to-cyan-600">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full sm:w-96 transform transition-all duration-500 hover:scale-105 mt-8 mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-6 sm:mb-8">
          דף התחברות
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              אימייל
            </label>
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
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              סיסמה
            </label>
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
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            {isLoading ? 'מתחבר...' : 'התחבר'}

          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">עדיין אין לך חשבון? </span>
          <Link href="/signup" className="text-teal-600 font-semibold hover:underline">
            הירשם
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
