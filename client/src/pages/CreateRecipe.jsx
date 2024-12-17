import { useState, useEffect } from 'react';
import { API_SERVER_URL } from "../api/api.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const CreateRecipe = () => {
  const user = localStorage.getItem('user');

  const [allRecipes, setAllRecipes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    ingredients: [],
    instructions: [],
    preparationTime: '',
    cookingTime: '',
    servings: '',
    difficulty: '',
    imageUrl: '',
    categories: {
      mainCategory: '',
      subCategory: '',
    },
    user: user || ''
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'ingredients' || name === 'instructions') {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(',').map((item) => item.trim()),
      }));
    } else if (name === 'mainCategory' || name === 'subCategory') {
      setFormData((prev) => ({
        ...prev,
        categories: {
          ...prev.categories,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle recipe form submission
  const handleSubmitRecipe = async (e) => {
    e.preventDefault();

    if (!formData.title) toast.error("אנא הכנס שם למתכון");
    if (!formData.ingredients?.length) toast.error("אנא הכנס רכיבים");
    if (!formData.instructions?.length) toast.error("אנא הכנס הוראות הכנה");
    if (!formData.preparationTime) toast.error("אנא הכנס זמן הכנה");
    if (!formData.cookingTime) toast.error("אנא הכנס זמן בישול");
    if (!formData.servings) toast.error("אנא הכנס כמות מנות");
    if (!formData.difficulty) toast.error("אנא הכנס רמת קושי");
    if (!formData.imageUrl) toast.error("אנא הכנס קישור לתמונה");
    if (!formData.categories.mainCategory) toast.error("אנא הכנס קטגוריה ראשית");
    if (!formData.categories.subCategory) toast.error("אנא הכנס קטגוריה משנית");

    if (!user) {
      toast.error('No user found in localStorage');
      return;
    }
    try {
      const recipeData = {
        title: formData.title,
        ingredients: formData.ingredients.filter(item => item.trim() !== ''),
        instructions: formData.instructions.filter(item => item.trim() !== ''),
        preparationTime: Number(formData.preparationTime),
        cookingTime: Number(formData.cookingTime),
        servings: Number(formData.servings),
        difficulty: formData.difficulty,
        imageUrl: formData.imageUrl,
        categories: {
          mainCategory: formData.categories.mainCategory,
          subCategory: formData.categories.subCategory,
        },
        user: user,
      };

      const response = await axios.post(`${API_SERVER_URL}/recipe/createRecipe`, recipeData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setAllRecipes((prev) => [...prev, response.data]);
      toast.success('המתכון נוצר בהצלחה');
      resetForm();
    } catch (error) {
      toast.error('Error response:', error.response);
      toast.error('Error message:', error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      ingredients: [],
      instructions: [],
      preparationTime: '',
      cookingTime: '',
      servings: '',
      difficulty: '',
      imageUrl: '',
      categories: {
        mainCategory: '',
        subCategory: '',
      },
    });
  };

  // Fetch recipes on mount
  useEffect(() => {
    const handleGetRecipes = async () => {
      try {
        const response = await axios.get(`${API_SERVER_URL}/recipe/`);
        setAllRecipes(response.data);
      } catch (error) {
        console.error(error.message);
      }
    };

    handleGetRecipes();
  }, []);

  return (
    <>
      <div className="recipe-form">
        <h1 className="text-center text-4xl mb-12"><b>יצירת מתכון</b></h1>

        <form>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">שם מתכון</label>
              <input
                type="text"
                placeholder="הכנס שם מתכון"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="ingredients" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">מרכיבים</label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="...קמח, מים, שמן"
                required
              />
            </div>

            <div>
              <label htmlFor="instructions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">הוראות הכנה</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="לשפוך לערבב וכו"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="preparationTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">זמן הכנה</label>
              <input
                type="number"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleChange}
                placeholder="3"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="cookingTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">זמן בישול</label>
              <input
                type="number"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={handleChange}
                placeholder="45"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="servings" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">כמות מנות</label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                placeholder="10"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">הכנס קישור לתמונה</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="הכנס URL לתמונה"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <select
              name="mainCategory"
              value={formData.categories.mainCategory}
              onChange={handleChange}
              required
            >
              <option value="">קטגוריה ראשית</option>
              <option value="Meat">בשרי</option>
              <option value="Dairy">חלבי</option>
              <option value="Fur">פרווה</option>
            </select>
          </div>

          <div className="mb-6">
            <select
              name="subCategory"
              value={formData.categories.subCategory}
              onChange={handleChange}
              disabled={!formData.categories.mainCategory}
            >
              <option value="">קטגוריה משנית</option>
              {formData.categories.mainCategory === "Meat" && (
                <>
                  <option value="Soup">מרק</option>
                  <option value="Dishes">מנה רגילה</option>
                </>
              )}
              {formData.categories.mainCategory === "Dairy" && (
                <>
                  <option value="Dishes">מנה רגילה</option>
                  <option value="Dessert">קינוח</option>
                </>
              )}
              {formData.categories.mainCategory === "Fur" && (
                <>
                  <option value="Dishes">מנה רגילה</option>
                  <option value="Dessert">קינוח</option>
                  <option value="Soups">מרק</option>
                </>
              )}
             
            </select>
          </div>
          <div className="mb-6">
            <select
              name="difficulty"
              value={formData.categories.difficulty}
              onChange={handleChange}
              required
            >
              <option value="">קטגוריה ראשית</option>
              <option value="Easy">קל</option>
              <option value="Medium">בינוני</option>
              <option value="Hard">קשה</option>
            </select>
          </div>


          <button onClick={handleSubmitRecipe} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-8"><b>שמור</b></button>

        </form>
      </div>
    </>
  );
};

export default CreateRecipe;

