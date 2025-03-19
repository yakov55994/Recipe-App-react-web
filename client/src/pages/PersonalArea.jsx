import React, { useContext, useEffect, useState } from "react";
import { API_SERVER_URL } from "../api/api.js";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { TbListDetails } from "react-icons/tb";
import { FiEdit, FiSave, FiX } from "react-icons/fi";

const PersonalArea = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // State for user data editing
  const [editMode, setEditMode] = useState({
    username: false,
    fullName: false,
    email: false,
    password: false,
  });

  // State for form data
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { user, setUser } = useAuth();
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);

        // שליפת פרטי המשתמש המלאים מהשרת
        axios
          .get(`${API_SERVER_URL}/user/${decodedUser._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            setUser(response.data); // עדכון הנתונים בקונטקסט
            // Initialize form data with user data
            setFormData({
              username: response.data.username || "",
              firstName: response.data.firstName || "",
              lastName: response.data.lastName || "",
              email: response.data.email || "",
              password: "",
            });
          })
          .catch((err) => {
            console.error("❌ שגיאה בשליפת פרטי המשתמש:", err);
          });
      } catch (error) {
        console.error("❌ שגיאה בפענוח הטוקן:", error);
        localStorage.removeItem("token");
      }
    }
  }, [setUser]);

  useEffect(() => {
    if (!user?._id) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_SERVER_URL}/user/${user._id}/favorites`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setFavorites(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "שגיאה בטעינת המועדפים");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const userId = user?._id;

  const handleDeleteRecipe = async (favorite) => {
    try {
      await axios.delete(
        `${API_SERVER_URL}/user/${userId}/favorites/${favorite._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setFavorites(favorites.filter((fav) => fav._id !== favorite._id));
      toast.success("המתכון נמחק מהמועדפים בהצלחה!");
    } catch (error) {
      console.error(
        "❌ שגיאה במחיקת המתכון:",
        error.response?.data || error.message
      );
      toast.error(
        `❌ שגיאה: ${error.response?.data?.message || error.message}`
      );
    }
  };

  // Toggle edit mode for a specific field
  const toggleEditMode = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));

    // Reset form data to current user data when canceling edit
    if (editMode[field]) {
      setFormData((prev) => ({
        ...prev,
        [field]: user[field] || "",
      }));
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save changes for a specific field
  const handleSave = async (field) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("נא להתחבר מחדש");
        return;
      }

      // Skip if no changes were made
      if (field !== "password" && formData[field] === user[field]) {
        toggleEditMode(field);
        return;
      }

      // Skip if field is empty
      if (!formData[field]) {
        toast.error(`שדה ${field} לא יכול להיות ריק`);
        return;
      }

      // Different endpoint for password update
      const endpoint =
        field === "password"
          ? `${API_SERVER_URL}/user/${userId}/update-password`
          : `${API_SERVER_URL}/user/${userId}/updateProfile`;

      // Different payload based on field
      const payload =
        field === "password"
          ? { password: formData.password }
          : { [field]: formData[field] };

      const response = await axios.put(endpoint, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update user state if not password
      if (field !== "password") {
        setUser((prev) => ({
          ...prev,
          [field]: formData[field],
        }));
      }

      toast.success(`${getFieldLabel(field)} עודכן בהצלחה!`);

      // Clear password field after update
      if (field === "password") {
        setFormData((prev) => ({
          ...prev,
          password: "",
        }));
      }

      toggleEditMode(field);
    } catch (error) {
      console.error(`❌ שגיאה בעדכון ${field}:`, error);

      if (error.response && error.response.data.error === "jwt expired") {
        toast.error("⏳ תוקף ההתחברות פג, נא להתחבר מחדש");
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        toast.error(`❌ שגיאה בעדכון ${getFieldLabel(field)}`);
      }
    }
  };

  // Helper function to get Hebrew field labels
  const getFieldLabel = (field) => {
    const labels = {
      username: "שם משתמש",
      fullName: "שם מלא",
      email: "כתובת מייל",
      password: "סיסמה",
    };
    return labels[field] || field;
  };

  if (!user) {
    return (
      <div className="text-center p-8">
        <h1 className="text-6xl mb-6 mt-10">האיזור האישי 📇</h1>
        <div className="text-xl text-red-500">
          יש להתחבר כדי לראות את המתכונים המועדפים
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className='flex justify-center items-center mt-20'>
        <div className='bg-slate-300 max-w-4xl p-20 rounded-xl mb-20'>
          <h1 className='text-amber-800 font-thin text-5xl text-center mb-14'>הפרטים שלי</h1>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* First Name Field */}
            <div className='mb-2 bg-lime-950 p-7 rounded-full text-amber-400'>
              <div className='flex items-center justify-between'>
                <p className='text-2xl'>שם פרטי:</p>
                <button
                  onClick={() => toggleEditMode('firstName')}
                  className={`p-2 rounded-full ${editMode.firstName ? 'bg-red-400' : 'bg-blue-400'} text-white`}
                >
                  {editMode.firstName ? <FiX /> : <FiEdit />}
                </button>
              </div>
              {editMode.firstName ? (
                <div className='flex items-center'>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full text-xl"
                  />
                  <button
                    onClick={() => handleSave('firstName')}
                    className="mr-2 p-2 rounded-full bg-green-500 text-white"
                  >
                    <FiSave />
                  </button>
                </div>
              ) : (
                <span className='text-xl font-bold'>{user.firstName}</span>
              )}
            </div>

            {/* Last Name Field */}
            <div className='mb-2 bg-lime-950 p-7 rounded-full text-amber-400'>
              <div className='flex items-center justify-between'>
                <p className='text-2xl'>שם משפחה:</p>
                <button
                  onClick={() => toggleEditMode('lastName')}
                  className={`p-2 rounded-full ${editMode.lastName ? 'bg-red-400' : 'bg-blue-400'} text-white`}
                >
                  {editMode.lastName ? <FiX /> : <FiEdit />}
                </button>
              </div>
              {editMode.lastName ? (
                <div className='flex items-center'>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full text-xl"
                  />
                  <button
                    onClick={() => handleSave('lastName')}
                    className="mr-2 p-2 rounded-full bg-green-500 text-white"
                  >
                    <FiSave />
                  </button>
                </div>
              ) : (
                <span className='text-xl font-bold'>{user.lastName}</span>
              )}
            </div>
            <div className='mb-2 bg-lime-950 p-7 rounded-full text-amber-400'>
              <div className='flex items-center justify-between'>
                <p className='text-2xl'>המייל שלי :</p>
                <button
                  onClick={() => toggleEditMode('email')}
                  className={`p-2 rounded-full ${editMode.email ? 'bg-red-400' : 'bg-blue-400'} text-white`}
                >
                  {editMode.email ? <FiX /> : <FiEdit />}
                </button>
              </div>
              {editMode.email ? (
                <div className='flex items-center'>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.email}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full text-xl"
                  />
                  <button
                    onClick={() => handleSave('email')}
                    className="mr-2 p-2 rounded-full bg-green-500 text-white"
                  >
                    <FiSave />
                  </button>
                </div>
              ) : (
                <span className='text-xl font-bold'>{user.email}</span>
              )}
            </div>
            <div className='mb-2 bg-lime-950 p-7 rounded-full text-amber-400'>
              <div className='flex items-center justify-between'>
                <p className='text-2xl'>סיסמה:</p>
                <button
                  onClick={() => toggleEditMode('password')}
                  className={`p-2 rounded-full ${editMode.password ? 'bg-red-400' : 'bg-blue-400'} text-white`}
                >
                  {editMode.password ? <FiX /> : <FiEdit />}
                </button>
              </div>
              {editMode.password ? (
                <div className='flex items-center'>
                  <input
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full text-xl"
                  />
                  <button
                    onClick={() => handleSave('password')}
                    className="mr-2 p-2 rounded-full bg-green-500 text-white"
                  >
                    <FiSave />
                  </button>
                </div>
              ) : (
                <span className='text-xl font-bold'>●●●●●●</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalArea;
