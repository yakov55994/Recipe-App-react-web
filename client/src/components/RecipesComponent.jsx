import { API_SERVER_URL } from '../api/api.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './RecipeComponent.css'
import { toast } from 'react-toastify';

const RecipesComponent = () => {

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
            subCategory: ''
        },
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === 'select-multiple' && name === 'mainCategory' || name === 'subcategory') {
            // עדכון קטגוריות
            setFormData(prev => ({
                ...prev,
                [name]: Array.from(e.target.selectedOptions, option => option.value)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
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
                subCategory: ''
            },
        });
        setError('');
    };

    const handleSubmitRecipe = async (e) => {
        let formErrors = {};
        e.preventDefault();
        console.log("formData ", formData);
        if (!formData.title) formErrors.title = 'Title is required';
        if (formData.ingredients.length === 0) formErrors.ingredients = 'Ingredients are required';
        if (formData.instructions.length === 0) formErrors.instructions = 'Instructions are required';
        if (!formData.preparationTime) formErrors.preparationTime = 'Preparation time is required';
        if (!formData.cookingTime) formErrors.cookingTime = 'Cooking time is required';
        if (!formData.servings) formErrors.servings = 'Number of servings is required';
        if (!formData.difficulty) formErrors.difficulty = 'Difficulty is required';
        if (!formData.imageUrl) formErrors.imageUrl = 'Image is required';
        if (!formData.categories.mainCategory ) formErrors.categories = 'MainCategory are required';
        if (!formData.categories.subCategory ) formErrors.categories = 'SubCategory are required';

        if (Object.keys(formErrors).length > 0) {
            setError(formErrors);
            return;
        }

        try {
            const response = await axios.post(`${API_SERVER_URL}/recipe/createRecipe`, formData);
            console.log('Recipe created:', response.data);
            toast('המתכון נוצר בהצלחה');
            resetForm();
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'An error occurred while creating the recipe';
            setError({ general: errorMessage });
            console.error(error.message);
        }
    };

    useEffect(() => {
        handleGetRecipes();
    }, []);

    const handleGetRecipes = async () => {
        try {
            const response = await axios.get(`${API_SERVER_URL}/recipe/`);
            setAllRecipes(response.data);
            console.log(allRecipes);
            
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <>
            <div className="recipe-form">
                <h1 className='text-2xl'><b>יצירת מתכון</b></h1>
                {error && <div className="error-message">{error}</div>}

                <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label for="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">שם מתכון</label>
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
                            <label for="ingredients" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">מרכיבים</label>
                            <textarea
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                name="ingredients"
                                value={formData.ingredients}
                                onChange={handleChange}
                                placeholder="...קמח, מים, שמן"
                                required />

                        </div>
                        <div>
                            <label for="instructions" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">הוראות הכנה</label>
                            <textarea
                                type="text"
                                name="instructions"
                                value={formData.instructions}
                                onChange={handleChange}
                                placeholder="לשפוך לערבב וכו"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label for="preparationTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">זמן הכנה</label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                                type="number"
                                name="preparationTime"
                                value={formData.preparationTime}
                                onChange={handleChange}
                                placeholder="3"
                                required />
                        </div>
                        <div>
                            <label for="cookingTime" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">זמן בישול</label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="number"
                                name="cookingTime"
                                value={formData.cookingTime}
                                onChange={handleChange}
                                placeholder="45"
                                required />
                        </div>
                        <div>
                            <label for="servings" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">כמות מנות</label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="number"
                                name="servings"
                                value={formData.servings}
                                onChange={handleChange}
                                placeholder="10"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label for="imageUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">הכנס קישור לתמונה</label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="data:image/jpeg"
                            required />
                    </div>
                    <div className="mb-6">
                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                        >
                            <option value="">רמת קושי</option>
                            <option value="Easy">קל</option>
                            <option value="Medium">בינוני</option>
                            <option value="Hard">קשה</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <select
                            name="mainCategory"
                            value={formData.categories.mainCategory}
                            onChange={handleChange}
                        >
                            <option value="">קטגוריה</option>
                            <option value="Dairy">חלבי</option>
                            <option value="Fur">פרווה</option>
                            <option value="Meat">בשרי</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <select
                            name="subCategory"
                            value={formData.categories.subCategory}
                            onChange={handleChange}
                        >
                            <option value="קטגוריה">תת קטגוריה</option>
                            <option value="Dishes">מנה רגילה</option>
                            <option value="Desserts">קינוח</option>
                            <option value="Soups">מרק</option>
                        </select>
                    </div>

                </form>


                <button onClick={handleSubmitRecipe} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-8"><b>הוסף מתכון</b></button>
            </div>
       

        </>
    );
};

export default RecipesComponent;

