import React, { useContext, useEffect, useState } from 'react';
import { API_SERVER_URL } from "../api/api.js";
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';

const PersonalArea = () => {
  const { user } = useContext(AuthContext);  // מידע על המשתמש מהקונטקסט
  const [favorites, setFavorites] = useState([]); // מצב למועדפים של המשתמש
  const [loading, setLoading] = useState(true);  // מצב של טעינה
  const [error, setError] = useState(null);  // מצב של שגיאות

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_SERVER_URL}/api/users/${user._id}/favorites`);
        setFavorites(response.data); // עדכון המועדפים
        setLoading(false); // סיום טעינה
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError('לא הצלחתי להעלות את המועדפים');
        setLoading(false);
      }
    };

    if (user?._id) {
      fetchFavorites();
    }
  }, [user]); // קריאה מחדש רק אם ה-user משתנה

  if (loading) {
    return <div>טעינה...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1 className="text-center text-6xl mb-6 mt-10">האיזור האישי 📇</h1>
      <h2>המתכונים שאהבתי</h2>

      {favorites.length > 0 ? (
        <div>
          {favorites.map((favorite) => (
            <div key={favorite?._id} className="favorite-item">
              <h3>{favorite.title}</h3>
              <img src={favorite.image} alt={favorite.title} className="favorite-image" />
              <p>{favorite.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <h3>עדיין לא הוספתם מתכונים</h3>
      )}
    </div>
  );
};

export default PersonalArea;
