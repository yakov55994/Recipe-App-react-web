import React, { useEffect, useState } from "react";
import { Edit, Save, X } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_SERVER_URL } from "../api/api.js";

const PersonalArea = () => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });

  const { user, setUser } = useAuth();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        axios.get(`${API_SERVER_URL}/user/${decodedUser._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then((response) => {
          setUser(response.data);
          setFormData(response.data);
        }).catch((err) => {
          console.error("❌ שגיאה בשליפת פרטי המשתמש:", err);
        });
      } catch (error) {
        console.error("❌ שגיאה בפענוח הטוקן:", error);
        localStorage.removeItem("token");
      }
    }
  }, [setUser]);

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
  });

  const [formData, setFormData] = useState({ ...userData });

  const toggleEditMode = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (field) => {
    if (!formData[field].trim()) {
      alert(`השדה ${field} לא יכול להיות ריק`);
      return;
    }
    setUserData((prev) => ({
      ...prev,
      [field]: formData[field],
    }));
    toggleEditMode(field);
  };

  const renderNameField = () => {
    return (
      <div className="mb-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <label className="text-lg font-semibold text-gray-700">שם מלא</label>
          <button
            onClick={() =>
              setEditMode((prev) => ({
                ...prev,
                firstName: !prev.firstName,
                lastName: !prev.lastName,
              }))
            }
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            {editMode.firstName || editMode.lastName ? <X size={20} /> : <Edit size={20} />}
          </button>
        </div>
        {editMode.firstName || editMode.lastName ? (
          <div className="flex space-x-2">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="flex-grow p-2 border rounded-lg text-xl"
              placeholder="שם פרטי"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="flex-grow p-2 border rounded-lg text-xl"
              placeholder="שם משפחה"
            />
            <button
              onClick={() => {
                handleSave("firstName");
                handleSave("lastName");
              }}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              <Save size={20} />
            </button>
          </div>
        ) : (
          <p className="text-xl font-bold text-gray-800">
            {formData.firstName} {formData.lastName}
          </p>
        )}
      </div>
    );
  };

  const renderEditableField = (field, label) => {
    return (
      <div className="mb-4 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <label className="text-lg font-semibold text-gray-700">{label}</label>
          <button
            onClick={() => toggleEditMode(field)}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            {editMode[field] ? <X size={20} /> : <Edit size={20} />}
          </button>
        </div>
        {editMode[field] ? (
          <div className="flex space-x-2">
            <input
              type="text"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="flex-grow p-2 border rounded-lg text-xl"
            />
            <button
              onClick={() => handleSave(field)}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
            >
              <Save size={20} />
            </button>
          </div>
        ) : (
          <p className="text-xl font-bold text-gray-800">{formData[field]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 mt-10">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-8 ">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          האיזור האישי שלי
        </h2>
        {renderNameField()}
        {renderEditableField("email", "אימייל")}
        {/* {renderEditableField("phone", "טלפון")}
        {renderEditableField("address", "כתובת")} */}
      </div>
    </div>
  );
};

export default PersonalArea;
