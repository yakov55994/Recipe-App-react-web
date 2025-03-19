import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import axios from "axios";
import { API_SERVER_URL } from "../../api/api.js";
import { toast } from "sonner";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmSendMailing, setConfirmSendMailing] = useState(false);

  const { login } = useAuth();

  // const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("סיסמאות אינן תואמות");
      return;
    }

    try {
      const response = await axios.post(
        `${API_SERVER_URL}/user/register`,
        {
          username,
          email,
          firstName,
          lastName,
          password,
          confirmSendMailing,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Call login function which handles both state and localStorage
      await login(response.data.user, response.data.token);

      toast.success("ההרשמה בוצעה בהצלחה");

      // Use a small timeout to ensure state changes have propagated
      setTimeout(() => {
        navigate("/home");
      }, 100);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "שגיאה בהרשמה"
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r  ">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full sm:w-96 transform transition-all duration-500 hover:scale-105 mt-8 mb-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-8 mt-0">
          דף הרשמה
        </h2>
        {/* {error && <p className="text-red-600 text-center mb-4">{error}</p>} */}
        <form onSubmit={handleSignUp}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-gray-700"
            >
              אימייל
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Israel1234@gmail.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="username"
              className="block text-lg font-medium text-gray-700"
            >
              שם משתמש
            </label>
            <input
              type="text"
              name="username"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="ישראל ישראלי"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="firstName"
              className="block text-lg font-medium text-gray-700"
            >
              שם פרטי
            </label>
            <input
              type="text"
              name="firstName"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="ישראל ישראלי"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="lastName"
              className="block text-lg font-medium text-gray-700"
            >
              שם משפחה
            </label>
            <input
              type="text"
              name="lastName"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="ישראל ישראלי"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-700"
            >
              סיסמה
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-medium text-gray-700"
            >
              אימות סיסמה
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full px-6 py-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <div className="mb-5">
            <input
            className=" size-6 bg-cyan-950"
              onChange={(e) => setConfirmSendMailing(e.target.checked)}
              type="checkbox"
              name="confirmSendMailing"
              checked={confirmSendMailing}
            />
            <label htmlFor="confirmSendMailing" className="mr-5 mt-5 font-medium text-xl text-amber-950">מאשר קבלת עדכונים ממכם</label>
            
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r bg-gray-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
          >
            הירשם
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-700">יש לך חשבון? </span>
          <a
            href="/login"
            className="text-teal-600 font-semibold hover:underline"
          >
            התחברות
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
