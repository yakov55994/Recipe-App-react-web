import React, { useEffect, useState } from "react";
import { API_SERVER_URL } from "../../api/api.js";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loader from "../../components/Loader.jsx";

const ProductsIliked = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

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

  const handleDeleteFavorite = async () => {
    if (!itemToDelete) return;
    
    try {
      await axios.delete(
        `${API_SERVER_URL}/user/${user._id}/favorites/${itemToDelete._id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setFavorites(favorites.filter((fav) => fav._id !== itemToDelete._id));
      toast.success("המוצר הוסר מהמועדפים בהצלחה!");
      setShowDeleteConfirmation(false);
      setItemToDelete(null);
    } catch (error) {
      console.error(
        "❌ שגיאה במחיקת המוצר:",
        error.response?.data || error.message
      );
      toast.error(
        `❌ שגיאה: ${error.response?.data?.message || error.message}`
      );
    }
  };

  const openDeleteConfirmation = (favorite) => {
    setItemToDelete(favorite);
    setShowDeleteConfirmation(true);
  };

  if (loading) {
    return <Loader isLoading={true} />;
  }

  return (
    <div>
      <h2 className="mt-14 text-4xl text-amber-800 font-bold mb-20 text-center">
        המתכונים שאהבתי
      </h2>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 p-4 text-center">
          {favorites.map((favorite) => (
            <div key={favorite._id} className=" rounded-lg p-5 shadow-2xl shadow-amber-700 ">
              <h3 className="text-xl font-bold mb-2">{favorite.title}</h3>
              {favorite.imageUrl && (
                <img
                  src={favorite.imageUrl}
                  alt={favorite.title}
                  onClick={() => navigate(`/recipeDetails/${favorite.productId || favorite._id}`)}
                  className="w-full h-48 mb-10 object-cover rounded-md cursor-pointer"
                />
              )}
              <button
                className="rounded-xl bg-red-500 text-white font-bold p-2 hover:bg-red-700 cursor-pointer"
                onClick={() => openDeleteConfirmation(favorite)}
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

      {showDeleteConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-80 rtl">
            <h3 className="text-lg font-bold text-center">
              האם אתה בטוח שברצונך להסיר את המוצר מהמועדפים?
            </h3>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleDeleteFavorite}
                className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-red-700"
              >
                כן
              </button>
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md cursor-pointer hover:bg-black hover:text-white"
              >
                לא
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsIliked;