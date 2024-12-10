import React, { useEffect, useState } from 'react'
import { API_SERVER_URL } from '../api/api.js';
import axios from 'axios';

const Dairy = () => {
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    handleGetRecipes();
  }, []);

  const handleGetRecipes = async () => {
    try {
      const response = await axios.get(`${API_SERVER_URL}/recipe/`);
      setAllRecipes(response.data);

    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <div>
      <h1 className='font-bold text-center text-3xl'>המתכונים שלי</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mx-auto px-4 sm:px-6 lg:px-8">
        {allRecipes.filter((recipe) => recipe.categories === "FurDishes")
          .map((recipe) => (
            <div
              key={recipe._id}
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="rounded-t-lg w-full h-48 object-cover"
                  src={recipe.imageUrl}
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    #{recipe.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <b>Ingredients:</b> {recipe.ingredients.join(", ")}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  <b>Instructions:</b> {recipe.instructions.join(", ")}
                </p>

              </div>
            </div>
          ))}
      </div>

    </div>
  )
}

export default Dairy