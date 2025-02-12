import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_SERVER_URL } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const AllRecipes = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  const [allRecipe, setAllRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${API_SERVER_URL}/recipe/`);
        const recipes = response.data;
        setAllRecipes(recipes);
      } catch (error) {
        toast.error(`Error fetching recipes: ${error.message}`);
      }
    };

    fetchRecipes();
  }, []);

  const MoveToDetails = (recipe) => {
    if (!recipe._id) {
      console.log("Recipe ID is undefined");
      return;
    }
    navigate(`/${category}/RecipeDetails/${recipe._id}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8">
      {allRecipe.map((recipe) => (
        <div
          key={recipe._id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
        >
          <a href="#!">
            <img
              className="rounded-t-lg w-full h-48 object-cover cursor-pointer"
              src={recipe.imageUrl}
              alt={recipe.title}
              onClick={() => MoveToDetails(recipe)}
            />
          </a>
          <div className="p-4">
            <h5 className="mb-2 text-lg font-bold text-gray-800">{recipe.title}</h5>
            <p className="text-gray-600 text-sm line-clamp-2">
              {recipe.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllRecipes;
