import React, { useEffect, useState } from "react";
import { API_SERVER_URL } from "../api/api.js";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const RecipeCard = ({ mainCategory, subCategory }) => {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { category } = useParams();

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
  }, []);

  if (loading) {
    return (
      <h1 className="text-center text-xl font-bold text-blue-500">
        טוען מתכונים...
      </h1>
    );
  }

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
            <p className="text-gray-600 text-sm line-clamp-2">
              {recipe.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCard;
