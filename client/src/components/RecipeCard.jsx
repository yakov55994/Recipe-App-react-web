import React, { useEffect, useState, useMemo, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { API_SERVER_URL } from "../api/api.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader.jsx";
import { FaHeart } from "react-icons/fa";
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from "sonner";

const RecipeCard = ({ mainCategory, initialRecipes }) => {
  const { user } = useAuth();
  const [filteredRecipes, setFilteredRecipes] = useState(initialRecipes || []);
  const [loading, setLoading] = useState(!initialRecipes);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const { category } = useParams();
  const heartControls = useAnimation();

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);

  const fetchRecipes = useCallback(async () => {
    if (!initialRecipes) {
      try {
        const response = await axios.get(`${API_SERVER_URL}/recipe/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const recipes = response.data;
    
        const filtered = mainCategory
          ? recipes.filter((recipe) => recipe.categories.mainCategory === mainCategory)
          : recipes;
    
        setFilteredRecipes(filtered);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
        toast.error("שגיאה בטעינת מתכונים. נסה שוב מאוחר יותר.");
      } finally {
        setLoading(false);
      }
    }
  }, [mainCategory, initialRecipes]);

  useEffect(() => {
    if (!initialRecipes) {
      fetchRecipes();
    }
  }, [fetchRecipes, initialRecipes]);

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
      await axios.post(
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

  const deleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`${API_SERVER_URL}/recipe/${recipeId}`);
      toast.success("המתכון נמחק בהצלחה!");
      // Optionally remove the deleted recipe from the list
      setFilteredRecipes(prev => prev.filter(recipe => recipe._id !== recipeId));
    } catch (error) {
      console.error("שגיאה במחיקת המתכון:", error.response?.data || error.message);
      toast.error(`שגיאה: ${error.response?.data?.message || error.message}`);
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
      {filteredRecipes.map((recipe) => (
        <div 
          key={recipe._id} 
          className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
        >
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
                  <FaHeart 
                    className="text-2xl cursor-pointer hover:text-red-500"
                    size={30}
                  />
                </motion.div>
              </button>
            </p>
            {user && user.role === "admin" && (
              <div className="flex gap-3">
                <button 
                  onClick={() => deleteRecipe(recipe._id)}
                  className="cursor-pointer bg-red-600 text-yellow-300 font-bold p-5 rounded-4xl mt-4 hover:bg-red-800"
                >
                  מחק מתכון
                </button>
                <button 
                  onClick={() => editRecipe(recipe._id)}
                  className="cursor-pointer bg-green-600 text-black font-bold p-5 rounded-4xl mt-4 hover:bg-green-800"
                >
                  ערוך מתכון
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCard;