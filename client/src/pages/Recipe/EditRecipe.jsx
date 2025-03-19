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
        setRecipe(response.data); // שמירת הנתונים ב-state
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
    <>
      <div>
        <h1 className="font-bold text-3xl mt-20 text-center">עדכון מתכון</h1>
        <div className="flex justify-center ">
          <div className=" mt-14 bg-gray-300 p-10 grid grid-cols-4 gap-4 max-w-[1000px] rounded-2xl border-2 border-black">
            <div>
              <h1>שם מתכון :</h1>
              <input
                name="title"
                value={recipe.title}
                onChange={handleInputChange}
                type="text"
                className="border-2 border-black p-2 "
              />
            </div>
            <div>
            <h1>מרכיבים :</h1>
            <textarea
              name="ingredients"
              value={recipe.ingredients.join("\n")} // מציג כטקסט מופרד בשורות
              onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value.split("\n") })}
              className="border-2 border-black"
            />
          </div>
          <div>
            <h1>הוראות הכנה :</h1>
            <textarea
              name="instructions"
              value={recipe.instructions.join("\n")} // מציג כטקסט מופרד בשורות
              onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value.split("\n") })}
              className="border-2 border-black"
            />
          </div>
            <div>
              <h1>זמן הכנה :</h1>
              <input
                name="preparationTime"
                value={recipe.preparationTime}
                onChange={handleInputChange}
                type="number"
                className="border-2 border-black"
              />
            </div>
            <div>
              <h1>זמן בישול :</h1>
              <input
                name="cookingTime"
                value={recipe.cookingTime}
                onChange={handleInputChange}
                type="number"
                className="border-2 border-black"
              />
            </div>
            <div>
              <h1>כמות מנות :</h1>
              <input
                name="servings"
                value={recipe.servings}
                onChange={handleInputChange}
                type="number"
                className="border-2 border-black"
              />
            </div>
            <div>
              <h1>תמונה :</h1>
              <input
                name="imageUrl"
                value={recipe.imageUrl}
                onChange={handleInputChange}
                type="text"
                className="border-2 border-black"
              />
            </div>
            <div>
              <h1>רמת קושי :</h1>
              <select
                name="difficulty"
                onChange={handleInputChange}
                value={recipe.difficulty}
                type="text"
                className="border-2 border-black"
              >
                <option value="">בחר רמת קושי</option>
                <option value="Easy">קל</option>
                <option value="Medium">בינוני</option>
                <option value="Hard">קשה</option>
              </select>
            </div>
          </div>
        </div>
        <div className=" flex justify-center mt-10">
          <button
            onClick={handleEditRecipe}
            className="bg-gray-300 text-lg text-yellow-800 font-bold p-3 w-40 rounded-xl hover:bg-black hover:text-yellow-400"
          >
            סיימתי, עדכן
          </button>
        </div>
      </div>
    </>
  );
};

export default EditRecipe;
