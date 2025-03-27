import { API_SERVER_URL } from "../../api/api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState({
    title: "",
    ingredients: [],
    instructions: [],
    preparationTime: "",
    cookingTime: "",
    servings: "",
    imageUrl: "",
    difficulty: "",
    description: "",
    categories: { mainCategory: "", subCategory: "" },
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`${API_SERVER_URL}/recipe/${recipeId}`);
        setRecipe(response.data);
      } catch (error) {
        console.error("שגיאה בטעינת המתכון:", error.message);
        toast.error("שגיאה בטעינת המתכון.");
      }
    };

    fetchRecipe();
  }, [recipeId]);

  const handleInputChange = (event) => {
    setRecipe({ ...recipe, [event.target.name]: event.target.value });
  };

  const handleEditRecipe = async () => {
    try {
      const response = await axios.put(
        `${API_SERVER_URL}/recipe/${recipeId}`, recipe, {headers: { 'Content-Type': 'application/json' } }
      );
      toast.success("המתכון עודכן בהצלחה");
      navigate('/allRecipes');
    } catch (error) {
      toast.error("Error", error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="font-bold text-2xl md:text-3xl text-center mb-8">עדכון מתכון</h1>
      
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-gray-300 p-6 md:p-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 rounded-2xl border-2 border-black">
          {/* Title */}
          <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <label className="block mb-2">שם מתכון :</label>
            <input
              name="title"
              value={recipe.title}
              onChange={handleInputChange}
              type="text"
              className="w-full border-2 border-black p-2 rounded"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block mb-2">מרכיבים :</label>
            <textarea
              name="ingredients"
              value={recipe.ingredients.join("\n")}
              onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value.split("\n") })}
              className="w-full border-2 border-black p-2 rounded h-32"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block mb-2">הוראות הכנה :</label>
            <textarea
              name="instructions"
              value={recipe.instructions.join("\n")}
              onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value.split("\n") })}
              className="w-full border-2 border-black p-2 rounded h-32"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2">תיאור :</label>
            <textarea
              name="description"
              value={recipe.description}  
              onChange={(e) => setRecipe({ ...recipe, description: e.target.value })}
              className="w-full border-2 border-black p-2 rounded h-32"
            />
          </div>

          {/* Preparation Time */}
          <div>
            <label className="block mb-2">זמן הכנה :</label>
            <input
              name="preparationTime"
              value={recipe.preparationTime}
              onChange={handleInputChange}
              type="number"
              className="w-full border-2 border-black p-2 rounded"
            />
          </div>

          {/* Cooking Time */}
          <div>
            <label className="block mb-2">זמן בישול :</label>
            <input
              name="cookingTime"
              value={recipe.cookingTime}
              onChange={handleInputChange}
              type="number"
              className="w-full border-2 border-black p-2 rounded"
            />
          </div>

          {/* Servings */}
          <div>
            <label className="block mb-2">כמות מנות :</label>
            <input
              name="servings"
              value={recipe.servings}
              onChange={handleInputChange}
              type="number"
              className="w-full border-2 border-black p-2 rounded"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block mb-2">תמונה :</label>
            <input
              name="imageUrl"
              value={recipe.imageUrl}
              onChange={handleInputChange}
              type="text"
              className="w-full border-2 border-black p-2 rounded"
            />
          </div>

          {/* Difficulty */}
          <div>
            <label className="block mb-2">רמת קושי :</label>
            <select
              name="difficulty"
              onChange={handleInputChange}
              value={recipe.difficulty}
              className="w-full border-2 border-black p-2 rounded"
            >
              <option value="">בחר רמת קושי</option>
              <option value="Easy">קל</option>
              <option value="Medium">בינוני</option>
              <option value="Hard">קשה</option>
            </select>
          </div>
        </div>

        {/* Update Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleEditRecipe}
            className="bg-gray-300 text-lg text-yellow-800 font-bold p-3 w-40 rounded-xl hover:bg-black hover:text-yellow-400 transition-colors duration-300"
          >
            סיימתי, עדכן
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;