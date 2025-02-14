import React, { useEffect, useState } from "react";
import { API_SERVER_URL } from "../api/api.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from './Loader.jsx';
import { FaHeart } from "react-icons/fa";
import { useAuth } from '../context/AuthContext.jsx';

const RecipeCard = ({ mainCategory, subCategory }) => {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSend, setDataSend] = useState({
    userId: null, 
    recipeId: null
  });

  const navigate = useNavigate();
  const { category } = useParams();
  const { user } = useAuth();

  // Ensure the user state is updated before using it
  useEffect(() => {
    if (user) {
      setDataSend((prevData) => ({
        ...prevData,
        userId: user._id
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_SERVER_URL}/recipe/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const recipes = response.data;
        const filtered = recipes.filter(
          (recipe) =>
            recipe.categories.mainCategory === mainCategory &&
            recipe.categories.subCategory === subCategory
        );
        setFilteredRecipes(filtered);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [mainCategory, subCategory]); // Add dependencies to ensure it re-fetches correctly

  // if (loading) {
  //   return <Loader isLoading={true} />;
  // }

  if (filteredRecipes.length === 0) {
    return (
      <h1 className="text-center text-xl font-bold text-red-700">
        מצטערים, עדיין אין כאן מתכונים...
      </h1>
    );
  }

  const MoveToDetails = (recipe) => {
    navigate(`/${category}/RecipeDetails/${recipe._id}`);
  };

  const A_recipe_I_Liked = async (recipe) => {
    try {
      const requestData = {
        userId: user?._id, // ודא שהמשתמש מחובר
        recipeId: recipe?._id
      };
  
      console.log("🔹 Sending Data:", requestData);
  
      const response = await axios.post(
        `${API_SERVER_URL}/user/likeRecipe`,
        requestData, // שליחה ישירה של האובייקט
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      console.log("✔ Recipe liked successfully!", response.data);
    } catch (err) {
      console.error("❌ Error liking the recipe:", err.response?.data || err.message);
    }
  };
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8">
      {filteredRecipes.map((recipe) => (
        <div
          key={recipe._id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
        >
          <a href="#">
            <img
              className="rounded-t-lg w-full h-48 object-cover cursor-pointer"
              src={recipe.imageUrl}
              alt={recipe.title}
              onClick={() => MoveToDetails(recipe)}
            />
          </a>
          <div className="p-4">
            <h5 className="mb-2 text-lg font-bold text-gray-800">
              {recipe.title}
            </h5>
            <p className="text-gray-600 text-sm line-clamp-2 flex items-center justify-between">
              {recipe.description}
              <button className="flex justify-center content-between">
                <FaHeart
                  className="size-8 text-slate-800 border-gray-600"
                  onClick={() => A_recipe_I_Liked(recipe)}
                />
              </button>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCard;
