import React, { useContext, useEffect, useState } from 'react';
import { API_SERVER_URL } from "../api/api.js";
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx'
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader.jsx';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode'; // יש לוודא שהוא מותקן

const PersonalArea = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const { user, setUser } = useAuth();
  const { category } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);

        // שליפת פרטי המשתמש המלאים מהשרת
        axios.get(`${API_SERVER_URL}/user/${decodedUser._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }).then(response => {
          setUser(response.data); // עדכון הנתונים בקונטקסט
        }).catch(err => {
          console.error("❌ שגיאה בשליפת פרטי המשתמש:", err);
        });

      } catch (error) {
        console.error('❌ שגיאה בפענוח הטוקן:', error);
        localStorage.removeItem('token');
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
        const response = await axios.get(`${API_SERVER_URL}/user/${user._id}/favorites`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // שולחים את הטוקן לבקשה
          },
        });
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
      await axios.delete(`${API_SERVER_URL}/user/${userId}/favorites/${favorite._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      

      setFavorites(favorites.filter((fav) => fav._id !== favorite._id));
      toast.success("המתכון נמחק מהמועדפים בהצלחה!");
    } catch (error) {
      console.error("❌ שגיאה במחיקת המתכון:", error.response?.data || error.message);
      toast.error(`❌ שגיאה: ${error.response?.data?.message || error.message}`);
    }
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

  const handleUpdatePassword = async () => {
    if (!newPassword) {
      toast.error("נא להזין סיסמה חדשה");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("נא להתחבר מחדש");
        return;
      }

      await axios.put(
        `${API_SERVER_URL}/user/update-password`,
        { password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("✅ הסיסמה עודכנה בהצלחה!");
      setNewPassword("");
    } catch (error) {
      console.error("❌ שגיאה בעדכון הסיסמה:", error);

      if (error.response && error.response.data.error === "jwt expired") {
        toast.error("⏳ תוקף ההתחברות פג, נא להתחבר מחדש");
        localStorage.removeItem("token");
        navigate("/login"); // הפניה למסך התחברות
      } else {
        toast.error("❌ שגיאה בעדכון הסיסמה");
      }
    }
  };



  console.log("user ", user);


  return (
    <div>
      <h1 className="text-center text-6xl mb-6 mt-10">האיזור האישי 📇</h1>

      <div className='bg-slate-500'>
        <h1 className=' text-white font-thin text-xl'>הפרטים שלי :</h1>
        <p className='text-xl'>שם משתמש: {user.username}</p>
        <p className='text-xl'>כתובת מייל: {user.email}</p>
        <div className="relative mt-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="הכנס סיסמה חדשה"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border rounded-lg p-2 w-full text-xl"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
          >
            {showPassword ? "👁️" : "🙈"}
          </button>
        </div>
        <button
          onClick={handleUpdatePassword}
          className="mt-2 bg-blue-500 text-white p-2 rounded-lg"
        >
          עדכן סיסמה
        </button>


      </div>

      <h2 className="text-2xl mb-4 text-center">המתכונים שאהבתי</h2>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 text-center">
          {favorites.map((favorite) => (
            <div key={favorite._id} className="border rounded-lg p-4 shadow-md">
              {/* {console.log("favorite: ", favorite)} */}
              <h3 className="text-xl font-bold mb-2">{favorite.title}</h3>
              {favorite.imageUrl && (
                <img
                  src={favorite.imageUrl}
                  alt={favorite.title}
                  onClick={() => navigate(`/${favorite.categories.mainCategory}/RecipeDetails/${favorite._id}`)}
                  className="w-full h-48 object-cover rounded-md mb-2 cursor-pointer"
                />
              )}
              <button
                className="rounded-xl bg-red-500 font-bold p-2 hover:bg-red-300"
                onClick={() => handleDeleteRecipe(favorite)}
              >
                מחק מהאהובים
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 p-4">
          <h3>עדיין לא הוספתם מתכונים למועדפים</h3>
        </div>
      )}
    </div>
  );
};

export default PersonalArea;
