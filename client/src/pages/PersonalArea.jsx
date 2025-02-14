import React, { useContext, useEffect, useState } from 'react';
import { API_SERVER_URL } from "../api/api.js";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';

const PersonalArea = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const { user, setUser } = useContext(AuthContext); // Adding setUser here to update user context
  const { category } = useParams();
  const navigate = useNavigate(); // To navigate to other pages

  // Load user data from localStorage on mount if it's not in AuthContext
  useEffect(() => {
    // Check if the user exists in localStorage
    const storedUser = localStorage.getItem('user');
    console.log('Stored User:', storedUser); // Log the stored user data
    if (storedUser && !user) {
      try {
        const userFromStorage = JSON.parse(storedUser);
        setUser(userFromStorage); // Update the user context
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, [user, setUser]);
  
  // Save user data to localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user)); // Save to localStorage
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userId) {
        setLoading(false); // If no user, don't fetch favorites
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${API_SERVER_URL}/user/${userId}/favorites`);
        setFavorites(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "אירעה שגיאה בטעינת המועדפים");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [userId]);

  if (loading) {
    return (
      <div className="text-center p-8">
        <h1 className="text-center text-6xl mb-6 mt-10">האיזור האישי 📇</h1>
        <div className="loader">⏳</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        <h1 className="text-center text-6xl mb-6 mt-10">האיזור האישי 📇</h1>
        <div className="text-xl text-red-500">
          יש להתחבר כדי לראות את המתכונים המועדפים
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <h1 className="text-center text-6xl mb-6 mt-10">האיזור האישי 📇</h1>
        <div className="text-xl text-red-500">{error}</div>
        <button className="mt-4 p-2 bg-red-500 text-white rounded" onClick={() => setError(null)}>
          נסה שוב
        </button>
      </div>
    );
  }

  const moveToDetails = (recipe) => {
    navigate(`/${category}/RecipeDetails/${recipe._id}`);
  };

  return (
    <div>
      <h1 className="text-center text-6xl mb-6 mt-10">האיזור האישי 📇</h1>
      <h2 className="text-2xl mb-4 text-center">המתכונים שאהבתי</h2>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {favorites.map((favorite) => (
            <div key={favorite._id} className="border rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-bold mb-2">{favorite.title}</h3>
              {favorite.imageUrl && (
                <img
                  src={favorite.imageUrl}
                  alt={favorite.title}
                  onClick={() => moveToDetails(favorite)} // Update this to trigger navigation
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
              )}
              <p className="mb-2">{favorite.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 p-4">
          <h3>עדיין לא הוספתם מתכונים למועדפים</h3>
          <button className="mt-4 p-2 bg-blue-500 text-white rounded">
            חפש מתכונים עכשיו
          </button>
        </div>
      )}
    </div>
  );
};

export default PersonalArea;
