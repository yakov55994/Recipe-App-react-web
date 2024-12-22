import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_SERVER_URL } from "../api/api.js";
import { useAuth } from '../context/AuthContext.jsx';


const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const saveedUser = user;

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  // const 
  const savedUser = localStorage.getItem('username') || user?.username;
  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_SERVER_URL}/recipe/${id}`);
        setRecipe(response.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <h1>טוען מתכון...</h1>;
  }

  if (!recipe) {
    return <h1>המתכון לא נמצא</h1>;
  }
  

  return (
    <>
      <div className="flex flex-col items-center p-6">

        <div className="relative w-full max-w-md">
          <h1 className="mb-10 absolute top-4 mr-40 bg-gray-400 bg-opacity-80 px-4 py-2 rounded-lg text-2xl font-bold text-black shadow-2xl">
            {recipe.title}
          </h1>
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className="w-full rounded-lg shadow-lg mt-24"
          />
        </div>
      </div>

      <div className="mt-6 w-full max-w-md text-right">

        <h2 className="font-bold text-2xl mr-6 mb-4">מרכיבים</h2>
        <p className="bg-gray-300 p-4 rounded-lg shadow text-lg mr-3">
          {recipe.ingredients}
        </p>

        <h2 className="font-bold text-2xl mr-6 mt-8 mb-4">נוצר על ידי:</h2>
        <p className="bg-gray-300 p-4 rounded-lg shadow text-lg mr-3">
          {savedUser || "אנונימי"}
        </p>

        <h2 className="font-bold text-2xl mr-6 mt-8 mb-4">הוראות הכנה</h2>
        <p className="text-lg leading-relaxed bg-gray-300 p-4 rounded-lg shadow mb-24 mr-3">
          {recipe.instructions}
        </p>
      </div>
    </>
  );

}

export default RecipeDetails