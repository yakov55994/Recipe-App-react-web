import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_SERVER_URL } from "../api/api";
import Loader from "../components/Loader";

const CategoryPage = () => {
  const { categoryName } = useParams(); // מקבל את שם הקטגוריה מתוך ה-URL
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_SERVER_URL}/recipe/`);
        const filteredRecipes = response.data.filter(
          (recipe) => recipe.categories.mainCategory === categoryName
        );
        setRecipes(filteredRecipes);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, [categoryName]); // הרצת ה-API לפי שם הקטגוריה

  if (isLoading) {
    return <Loader isLoading={true} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8">
      {recipes.map((recipe) => (
        <div
          key={recipe._id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
        >
          <a href="#!">
            <img
              className="rounded-t-lg w-full h-48 object-cover cursor-pointer"
              src={recipe.imageUrl}
              alt={recipe.title}
              // here you can add the click functionality to go to recipe details
            />
          </a>
          <div className="p-4">
            <h5 className="mb-2 text-lg font-bold text-gray-800">
              {recipe.title}
            </h5>
            <p className="text-gray-600 text-sm line-clamp-2">
              {recipe.description}
            </p>
            <p>
              #{recipe.categories.mainCategory} -{" "}
              {recipe.categories.subCategory}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPage;
