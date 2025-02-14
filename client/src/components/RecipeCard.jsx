import React, { useEffect, useState, useContext } from "react";
import { API_SERVER_URL } from "../api/api.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from './Loader.jsx';
import { FaHeart } from "react-icons/fa";
import { AuthContext } from '../context/AuthContext.jsx';

const RecipeCard = ({ mainCategory, subCategory }) => {
  const { user } = useContext(AuthContext);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();
  const { category } = useParams();

  // console.log(user)
  useEffect(() => {
    if (user) {
      setUserId(user._id);
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
  }, [mainCategory, subCategory]);

  const moveToDetails = (recipe) => {
    navigate(`/${category}/RecipeDetails/${recipe._id}`);
  };

  const handleRecipeLike = async (recipe) => {
    if (!userId) {
      console.error("User is not logged in");
      return;
    }

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
      console.log("✔ Recipe liked successfully!", response.data);
    } catch (err) {
      console.error("❌ Error liking the recipe:", err.response?.data || err.message);
    }
  };

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8">
      {filteredRecipes.map((recipe) => (
        <div
          key={recipe._id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
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
                className="flex justify-center items-center text-gray-800"
                onClick={() => handleRecipeLike(recipe)}
              >
                <FaHeart className="text-2xl cursor-pointer hover:text-red-500" />
              </button>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCard;
