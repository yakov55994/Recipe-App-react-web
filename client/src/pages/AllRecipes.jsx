import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { API_SERVER_URL } from "../api/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader.jsx";
import { Tooltip } from 'react-tooltip';
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext.jsx";


const AllRecipes = () => {

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  const { category } = useParams();
  const [allRecipe, setAllRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    }
  }, [user]);


  useEffect(() => {
    const fetchRecipes = async () => {
      console.log("Fetching recipes...");
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_SERVER_URL}/recipe`);
        console.log("Response received:", response.data);
        setAllRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        toast.error(`Error fetching recipes: ${error.message}`);
      } finally {
        setIsLoading(false);
        console.log("Loading finished.");
      }
    };

    fetchRecipes();
  }, []);


  const translateToHebrew = (englishText) => {
    const translationMap = {
      "Dairy": "חלבי",
      "Meat": "בשרי",
      "Fur": "פרווה",
      "Dishes": "מנות",
      "Desserts": "קינוחים",
      "Soups": "מרקים",
    };

    return translationMap[englishText] || englishText; // אם לא נמצא תרגום, מחזיר את הערך כמו שהוא
  };


  if (isLoading) {
    return <Loader isLoading={true} />;
  }

  const MoveToDetails = (recipe) => {
    if (!recipe._id) {
      console.log("Recipe ID is undefined");
      return;
    }
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

  return (
    <>
      <h1 className="font-semibold text-center text-4xl text-slate-800 mt-10 mb-10">אוסף מתכונים </h1>
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
              {/* {console.log(recipe.categories)} */}
              <h5 className="mb-2 text-lg font-bold text-gray-800">{recipe.title}</h5>
              <p className="text-gray-600 text-sm line-clamp-2">
                {recipe.description}
              </p>
              <div className="flex items-center justify-between">
                <Link
                  className="text-blue-500"
                  data-tooltip-id="unique-tooltip"
                  data-tooltip-content="לחץ כאן לצפייה בקטגוריה"
                >
                  #{translateToHebrew(recipe.categories.mainCategory)} # {translateToHebrew(recipe.categories.subCategory)}
                </Link>
                <button
                  className="flex justify-center items-center text-gray-800"
                  onClick={() => handleRecipeLike(recipe)}
                >
                  <FaHeart className="text-2xl cursor-pointer hover:text-red-500" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllRecipes;
