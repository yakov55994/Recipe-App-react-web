import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { API_SERVER_URL } from '../api/api';
 import { useNavigate, useParams  } from "react-router-dom";


const AllRecipes = () => {

  const navigate = useNavigate();
  const { category } = useParams();
  const [allRecipe, setAllRecipes] = useState([])
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${API_SERVER_URL}/recipe/`);
        const recipes = response.data;
        setAllRecipes(recipes);
      } catch (error) {
        toast.error("Error fetching recipes:", error.message);
      } 
    };

    fetchRecipes();
  }, []);

  const MoveToDetails = (recipe) =>{
    console.log(recipe);
    
    if (!recipe._id) {
      console.log("Recipe ID is undefined");
      return;
  }
  navigate(`/${category}/RecipeDetails/${recipe._id}`);
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {allRecipe.map((recipe) => (
        <div
          key={recipe._id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
        >
          <a href="#">
            <img
              className="rounded-t-lg w-full h-48 object-cover"
              src={recipe.imageUrl}
              alt={recipe.title}
              onClick={() => MoveToDetails(recipe)}
            />
          </a>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold">{recipe.title}</h5>
            <p>
              {recipe.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllRecipes