import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { API_SERVER_URL } from "../api/api.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader.jsx";
import { FaHeart } from "react-icons/fa";
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from "sonner";

const RecipeCard = ({ mainCategory }) => {
  const { user } = useAuth();
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const { category } = useParams();
  const heartControls = useAnimation(); // בקר אנימציה ללב

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_SERVER_URL}/recipe/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const recipes = response.data;
  
      // אם יש קטגוריה ראשית, סנן לפי הקטגוריה, אחרת הצג את כל המתכונים
      const filtered = mainCategory
        ? recipes.filter((recipe) => recipe.categories.mainCategory === mainCategory)
        : recipes; // במקרה שאין mainCategory, הצג את כל המתכונים
  
      setFilteredRecipes(filtered);
    } catch (error) {
      console.error("Error fetching recipes:", error.message);
      toast.error("שגיאה בטעינת מתכונים. נסה שוב מאוחר יותר.");
    } finally {
      setLoading(false);
    }
  }, [mainCategory]);
  

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const moveToDetails = useCallback((recipe) => {
    navigate(`/${category}/RecipeDetails/${recipe._id}`);
  }, [navigate, category]);

  const handleRecipeLike = useCallback(async (recipe) => {
    if (!userId) {
      toast.error("User is not logged in");
      return;
    }

    heartControls.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 },
    });

    const requestData = {
      userId: userId,
      recipeId: recipe?._id,
    };

    try {
      const response = await axios.post(
        `${API_SERVER_URL}/user/likeRecipe`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("המתכון הוסף למועדפים בהצלחה!");
    } catch (err) {
      toast.error(err.response.data.message);
      console.error(err.response.data);
    }
  }, [userId, heartControls]);

  const filteredRecipesMemo = useMemo(() => filteredRecipes, [filteredRecipes]);


  const deleteRecipe = async (recipeId) => {
    try {
      const response = await axios.delete(`${API_SERVER_URL}/recipe/${recipeId}`)
      toast.success("המתכון נמחק בהצלחה!");
    } catch (error) {
      console.error("�� ש��י��ה במחי��ת המתכו��:", error.response?.data || error.message);
      toast.error(`�� ש��י��ה: ${error.response?.data?.message || error.message}`);
    }
  }

const editRecipe = (recipeId) => {
  navigate(`/editRecipe/${recipeId}`);
}
  
  if (loading) {
    return <Loader isLoading={true} />;
  }

  if (filteredRecipes.length === 0) {
    return (
      <h1 className="text-center text-xl font-bold text-red-700">
        מצטערים, עדיין אין כאן מתכונים...
      </h1>
    );
  }

  return (
    <div className="mb-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8">
      {filteredRecipesMemo.map((recipe) => (
        // <motion.div
        //   key={recipe._id}
        //   className="w-80 h-80 bg-white shadow-lg rounded-2xl flex justify-center items-center"
        //   whileHover={{
        //     scale: 1.05,
        //     rotate: 3,
        //     backgroundColor: "#f5f5f5",
        //     boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
        //     transition: { duration: 0.6 },
        //   }}
        //   whileTap={{
        //     scale: 0.95,
        //     rotate: -5,
        //     backgroundColor: "#e0e0e0",
        //     boxShadow: "0 5px 10px rgba(0, 0, 0, 0.3)",
        //     transition: { duration: 0.2 },
        //   }}
        // >
          <div className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300">
            <img
              className="rounded-t-lg w-full h-48 object-cover cursor-pointer"
              src={recipe.imageUrl}
              alt={recipe.title}
              onClick={() => moveToDetails(recipe)}
            />
            <div className="p-4">
              <h5 className="mb-2 text-lg font-bold text-gray-800">{recipe.title}</h5>
              <p className="text-gray-600 text-sm line-clamp-2 flex items-center justify-between">
                {recipe.description}
                <button
                  className="relative flex justify-center items-center text-gray-800"
                  onClick={() => handleRecipeLike(recipe)}
                >
                  <motion.div animate={heartControls}>
                    <FaHeart className="text-2xl cursor-pointer hover:text-red-500"
                    size={30}
                    />
                  </motion.div>
                </button>
              </p>
              {
               user && user.role === "admin" ? (
                <div className="flex gap-3">
                <button 
                onClick={() => deleteRecipe(recipe._id)}
                className="bg-red-600 text-yellow-300 font-bold p-5 rounded-4xl mt-4 hover:bg-red-800">מחק מתכון</button>
                <button 
                onClick={() => editRecipe(recipe._id)}
                className="bg-green-600 text-black font-bold p-5 rounded-4xl mt-4 hover:bg-green-800">ערוך מתכון</button>
                </div>
              ) : ""
              }

            </div>
          </div>
        // </motion.div>
      ))}
    </div>
  );
};

export default RecipeCard;
