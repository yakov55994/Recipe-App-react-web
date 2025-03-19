import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_SERVER_URL } from "../../api/api.js";
import { useAuth } from "../../context/AuthContext.jsx";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  // console.log("user: ", user)
  const [recipe, setRecipe] = useState(null);
  const [creatorName, setCreatorName] = useState("אנונימי");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_SERVER_URL}/recipe/${id}`);
        setRecipe(response.data);

        // If the recipe has a user ID, fetch the user's details
        if (response.data.user) {
          let CreateName = "";
          try {
            const userResponse = await axios.get(
              `${API_SERVER_URL}/user/${response.data.user}`
            );
            // console.log("userResponse ", userResponse)
            if (userResponse.data?.role === "admin") {
              CreateName += "נכתב ע''י המערכת";
              setCreatorName(CreateName);
            } else {
              let tempCreatorName =
                userResponse.data.firstName + " " + userResponse.data.lastName;
              setCreatorName(tempCreatorName);
            }
          } catch (userError) {
            console.log("Error fetching creator details:", userError);
            setCreatorName("אנונימי");
          }
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const formatToList = (text) => {
    if (Array.isArray(text)) {
      return text.map((item) => item.trim());
    }

    if (!text || typeof text !== "string" || text.trim() === "") {
      return [];
    }

    return text
      .split(/(?<=\.)\s*|[\n,]/) // מחלק אחרי נקודה, שורה חדשה או פסיק
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const formatInstructions = (text) => {
    if (Array.isArray(text)) {
      return text.map((step) => step.trim());
    }

    if (!text || typeof text !== "string" || text.trim() === "") {
      return [];
    }

    return text
      .split(/(?<=\.)\s*/)
      .map((step) => step.trim())
      .filter((step) => step.length > 0);
  };

  if (loading) {
    return <h1>טוען מתכון...</h1>;
  }

  if (!recipe) {
    return <h1>המתכון לא נמצא</h1>;
  }

  const ingredientsList = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : formatToList(recipe.ingredients);
  const instructionsList = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : formatInstructions(recipe.instructions);

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
        {recipe.description && (
          <>
            <h2 className="font-bold text-2xl mr-6 mb-4">תיאור</h2>
            <p className="bg-gray-300 p-4 rounded-lg shadow text-lg mr-3 mb-6">
              {recipe.description}
            </p>
          </>
        )}

        {recipe.preparationTime && (
          <>
            <h2 className="font-bold text-2xl mr-6 mb-4">זמן הכנה</h2>
            <p className="bg-gray-300 p-4 rounded-lg shadow text-lg mr-3 mb-6">
              {recipe.preparationTime} דקות
            </p>
          </>
        )}

        {recipe.cookingTime && (
          <>
            <h2 className="font-bold text-2xl mr-6 mb-4">זמן בישול</h2>
            <p className="bg-gray-300 p-4 rounded-lg shadow text-lg mr-3 mb-6">
              {recipe.cookingTime} דקות
            </p>
          </>
        )}

        {recipe.servings && (
          <>
            <h2 className="font-bold text-2xl mr-6 mb-4">מספר מנות</h2>
            <p className="bg-gray-300 p-4 rounded-lg shadow text-lg mr-3 mb-6">
              {recipe.servings}
            </p>
          </>
        )}

        {recipe.difficultyLevel && (
          <>
            <h2 className="font-bold text-2xl mr-6 mb-4">רמת קושי</h2>
            <p className="bg-gray-300 p-4 rounded-lg shadow text-lg mr-3 mb-6">
              {recipe.difficulty}
            </p>
          </>
        )}

        {/* {recipe.category && (
          <>
            <h2 className="font-bold text-2xl mr-6 mb-4">קטגוריה</h2>
            <p className="bg-gray-300 p-4 rounded-lg shadow text-lg mr-3 mb-6">
              {recipe.category}
            </p>
          </>
        )} */}

        <h2 className="font-bold text-2xl mr-6 mb-4">מרכיבים</h2>
        <ul className="bg-gray-300 p-4 rounded-lg shadow text-lg mr-3 list-disc list-inside mb-6">
          {ingredientsList.map((ingredient, index) => (
            <li key={index} className="mb-2">
              {ingredient}
            </li>
          ))}
        </ul>

        <h2 className="font-bold text-2xl mr-6 mt-8 mb-4">נוצר על ידי:</h2>
        <p className="bg-gray-300 p-4 rounded-lg shadow text-lg mr-3 mb-6">
          {creatorName}
        </p>

        <h2 className="font-bold text-2xl mr-6 mt-8 mb-4">הוראות הכנה</h2>
        <ol className="text-lg leading-relaxed bg-gray-300 p-4 rounded-lg shadow mb-24 mr-3 list-decimal list-inside">
          {instructionsList.map((step, index) => (
            <li key={index} className="mb-3">
              {step}
            </li>
          ))}
        </ol>

        {/* {recipe.tips && (
          <>
            <h2 className="font-bold text-2xl mr-6 mb-4">טיפים</h2>
            <p className="bg-gray-300 p-4 rounded-lg shadow text-lg mr-3 mb-24">
              {recipe.tips}
            </p>
          </>
        )} */}
      </div>
    </>
  );
};

export default RecipeDetails;
