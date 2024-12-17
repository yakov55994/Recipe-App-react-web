import React, { useEffect, useState } from "react";
import { API_SERVER_URL } from "../api/api.js";
import axios from "axios";

const RecipeCard = ({ mainCategory, subCategory }) => {
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true); // סטייט טעינה

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true); // התחלת טעינה
      try {
        const response = await axios.get(`${API_SERVER_URL}/recipe/`);
        const recipes = response.data;

        // סינון המתכונים
        const filtered = recipes.filter(
          (recipe) =>
            recipe.categories.mainCategory === mainCategory &&
            recipe.categories.subCategory === subCategory
        );

        setFilteredRecipes(filtered);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      } finally {
        setLoading(false); // סיום טעינה
      }
    };

    fetchRecipes();
  }, []);

  // הצגת הודעת טעינה
  if (loading) {
    return (
      <h1 className="text-center text-xl font-bold text-blue-500">
        טוען מתכונים...
      </h1>
    );
  }

  // הצגת הודעה אם אין מתכונים
  if (filteredRecipes.length === 0) {
    return (
      <h1 className="text-center text-xl font-bold text-red-700">
        מצטערים, עדיין אין כאן מתכונים...
      </h1>
    );
  }

  // הצגת כרטיסי המתכונים
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredRecipes.map((recipe) => (
        <div
          key={recipe._id}
          className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
        >
          <a href="#">
            <img
              className="rounded-t-lg w-full h-48 object-cover"
              src={recipe.imageUrl}
              alt={recipe.title}
            />
          </a>
          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold">{recipe.title}</h5>
            <p>
              <b>מרכיבים:</b> {recipe.ingredients.join(", ")}
            </p>
            <p>
              <b>נוצר על ידי:</b> {recipe.user.username}
            </p>
            <p>
              <b>הוראות הכנה:</b> {recipe.instructions.join(", ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCard;
