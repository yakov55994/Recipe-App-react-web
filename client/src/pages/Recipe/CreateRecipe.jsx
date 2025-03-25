import { useState, useEffect, useContext } from "react";
import { API_SERVER_URL } from "../../api/api.js";
import { toast } from "sonner";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

const CreateRecipe = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [allRecipes, setAllRecipes] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    ingredients: [],
    instructions: [],
    preparationTime: "",
    cookingTime: "",
    servings: "",
    difficulty: "",
    imageUrl: "",
    categories: {
      mainCategory: "",
      subCategory: "",
    },
    description: "",
    user: user,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "ingredients" || name === "instructions") {
      setFormData((prev) => ({
        ...prev,
        [name]: value
          .split(",") // מפריד לפי פסיק בלבד
          // מסיר רווחים מיותרים סביב כל פריט
          .filter((item) => item !== ""), // מסיר פריטים ריקים אם יש פסיקים מיותרים
      }));
    } else if (name === "mainCategory" || name === "subCategory") {
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

    if (!formData.title) {
      toast.error("אנא הכנס שם למתכון");
      return;
    }
    if (!formData.ingredients?.length) {
      toast.error("אנא הכנס רכיבים");
      return;
    }
    if (!formData.instructions?.length) {
      toast.error("אנא הכנס הוראות הכנה");
      return;
    }
    if (!formData.preparationTime) {
      toast.error("אנא הכנס זמן הכנה");
      return;
    }
    if (!formData.cookingTime) {
      toast.error("אנא הכנס זמן בישול");
      return;
    }
    if (!formData.servings) {
      toast.error("אנא הכנס כמות מנות");
      return;
    }
    if (!formData.difficulty) {
      toast.error("אנא הכנס רמת קושי");
      return;
    }
    if (!formData.imageUrl) {
      toast.error("אנא הכנס קישור לתמונה");
      return;
    }

    if (!formData.categories.mainCategory) {
      toast.error("אנא הכנס קטגוריה ראשית");
      return;
    }
    if (!formData.categories.subCategory) {
      toast.error("אנא הכנס קטגוריה משנית");
      return;
    }
    if (!formData.description) {
      toast.error("אנא הכנס תיאור");
      return;
    }

    try {
      const recipeData = {
        title: formData.title,
        ingredients: formData.ingredients.filter((item) => item.trim() !== ""),
        instructions: formData.instructions.filter(
          (item) => item.trim() !== ""
        ),
        preparationTime: Number(formData.preparationTime),
        cookingTime: Number(formData.cookingTime),
        servings: Number(formData.servings),
        difficulty: formData.difficulty,
        imageUrl: formData.imageUrl,
        categories: {
          mainCategory: formData.categories.mainCategory,
          subCategory: formData.categories.subCategory,
        },
        description: formData.description,
        user: user,
      };
      console.log(recipeData);
      const response = await axios.post(
        `${API_SERVER_URL}/recipe/createRecipe`,
        recipeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          // Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      );

      setAllRecipes((prevRecipes) => [...prevRecipes, response.data]);

      // Update the user's recipe list in the context
      setUser((prevUser) => ({
        ...prevUser,
        recipes: Array.isArray(prevUser.recipes)
          ? [...prevUser.recipes, response.data]
          : [response.data],
      }));

      toast.success("המתכון נוצר בהצלחה");
      resetForm();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      ingredients: [],
      instructions: [],
      preparationTime: "",
      cookingTime: "",
      servings: "",
      difficulty: "",
      imageUrl: "",
      categories: {
        mainCategory: "",
        subCategory: "",
      },
      description: "",
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

  // const userId  = user._id;
  // console.log("userId ", userId);

  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="mt-7 bg-gray-600 shadow-lg rounded-lg p-6 w-full max-w-4xl text-white">
        <h1 className="text-center text-2xl sm:text-3xl font-bold text-white dark:text-white mb-14">
          טופס יצירת מתכון ✨
        </h1>

        <form onSubmit={handleSubmitRecipe}>
          <div className="font-bold grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 text-xl">
            {/* Title */}
            <div>
              <label
                htmlFor="title"
                className="font-bold block text-white dark:text-gray-300 mb-2"
              >
                שם מתכון
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="הכנס שם מתכון"
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-white dark:text-gray-300 font-bold mb-2"
              >
                תיאור מתכון
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="הכנס תיאור למתכון"
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Ingredients */}
            <div className="sm:col-span-2">
              <label
                htmlFor="ingredients"
                className="block text-white dark:text-gray-300 font-bold mb-2"
              >
                מרכיבים
              </label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="הכנס מרכיבים למתכון"
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Instructions */}
            <div className="sm:col-span-2">
              <label
                htmlFor="instructions"
                className="block text-white dark:text-gray-300 font-bold mb-2"
              >
                הוראות הכנה
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                placeholder="הכנס הוראות הכנה למתכון'"
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Preparation Time */}
            <div>
              <label
                htmlFor="preparationTime"
                className="block text-white dark:text-gray-300 font-bold mb-2"
              >
                זמן הכנה (בדקות)
              </label>
              <input
                type="number"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleChange}
                placeholder="לדוגמא: 30"
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Cooking Time */}
            <div>
              <label
                htmlFor="cookingTime"
                className="block text-white dark:text-gray-300 font-bold mb-2"
              >
                זמן בישול (בדקות)
              </label>
              <input
                type="number"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={handleChange}
                placeholder="לדוגמא: 45"
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Servings */}
            <div>
              <label
                htmlFor="servings"
                className="block text-white dark:text-gray-300 font-bold mb-2"
              >
                מנות
              </label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                placeholder="לדוגמא: 4"
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* Difficulty */}
            <div>
              <label
                htmlFor="difficulty"
                className="block text-white dark:text-gray-300 font-bold mb-2"
              >
                רמת קושי
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="text-black font-bold w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">בחר רמת קושי</option>
                <option value="Easy">קל</option>
                <option value="Medium">בינוני</option>
                <option value="Hard">קשה</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="mainCategory"
                className="block text-white dark:text-gray-300 font-bold mb-2"
              >
                קטגוריה ראשית
              </label>
              <select
                name="mainCategory"
                value={formData.mainCategory}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">בחר קטגוריה ראשית</option>
                <option value="Dairy">חלבי</option>
                <option value="Fur">פרווה</option>
                <option value="Meat">בשרי</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="subCategory"
                className="block text-white dark:text-gray-300 font-bold mb-2"
              >
                קטגוריה משנית
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="">בחר קטגוריה משנית</option>
                <option value="Dishes">מנות</option>
                <option value="Desserts">קינוחים</option>
                <option value="Soups">מרקים</option>
              </select>
            </div>

            {/* Image URL */}
            <div className="sm:col-span-2">
              <label
                htmlFor="imageUrl"
                className="block text-white dark:text-gray-300 font-bold mb-2"
              >
                קישור לתמונה
              </label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-purple-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gray-300 text-black font-medium py-2 px-4 rounded-b-full active:bg-gray-950 active:text-white "
            >
              צור מתכון
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecipe;
