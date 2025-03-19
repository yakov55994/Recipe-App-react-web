import React, { useEffect, useState } from 'react';
import { API_SERVER_URL } from '../../api/api.js'
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProductsIliked = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

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
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  const handleDeleteFavorite = async (favorite) => {
    try {
      await axios.delete(`${API_SERVER_URL}/user/${user._id}/favorites/${favorite._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });

      setFavorites(favorites.filter((fav) => fav._id !== favorite._id));
      toast.success("המוצר הוסר מהמועדפים בהצלחה!");
    } catch (error) {
      console.error("❌ שגיאה במחיקת המוצר:", error.response?.data || error.message);
      toast.error(`❌ שגיאה: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div>
      <h2 className="mt-14 text-4xl text-amber-800 font-bold mb-4 text-center">המוצרים שאהבתי </h2>

      {loading ? (
        <div className="text-center text-gray-500 p-4">טוען...</div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 text-center">
          {favorites.map((favorite) => (
            <div key={favorite._id} className="border rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-bold mb-2">{favorite.title}</h3>
              {favorite.imageUrl && (
                <img
                  src={favorite.imageUrl}
                  alt={favorite.title}
                  onClick={() => navigate(`/${favorite.categories.mainCategory}/recipeDetails/${favorite._id}`)}
                  className="w-full h-48 object-cover rounded-md mb-2 cursor-pointer"
                />
              )}
              <button
                className="rounded-xl bg-red-500 font-bold p-2 hover:bg-red-300"
                onClick={() => handleDeleteFavorite(favorite)}
              >
                הסר מהרשימה
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 p-4">
          <h3>עדיין לא הוספתם מוצרים למועדפים</h3>
        </div>
      )}
    </div>
  );
};

export default ProductsIliked;