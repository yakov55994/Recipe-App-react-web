import { API_SERVER_URL } from '../api/api.js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react';
import './RecipeComponent.css'

const RecipesComponent = () => {

    const [allRecipes,setAllRecipes] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        ingredients: [],
        instructions: [],
        preparationTime: '',
        cookingTime: '',
        servings: '',
        difficulty: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'ingredients' || name === 'instructions') {
            setFormData(prev => ({
                ...prev,
                [name]: value.split(',').map(item => item.trim()).filter(item => item !== '')
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
        });
        setError('');
    };

    const handleSubmitRecipe = async () => {
        let formErrors = {};

        if (!formData.title) formErrors.title = 'Title is required';
        if (formData.ingredients.length === 0) formErrors.ingredients = 'Ingredients are required';
        if (formData.instructions.length === 0) formErrors.instructions = 'Instructions are required';
        if (!formData.preparationTime) formErrors.preparationTime = 'Preparation time is required';
        if (!formData.cookingTime) formErrors.cookingTime = 'Cooking time is required';
        if (!formData.servings) formErrors.servings = 'Number of servings is required';
        if (!formData.difficulty) formErrors.difficulty = 'Difficulty is required';

        if (Object.keys(formErrors).length > 0) {
            setError(formErrors);
            return;
        }

        try {
            const response = await axios.post(`${API_SERVER_URL}/recipe/createRecipe`, formData);
            console.log('Recipe created:', response.data);
            alert('Recipe created successfully');
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
            console.log('All recipes:', response.data);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <>
            <div className="recipe-form">
                <h1>Create Recipe</h1>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    <textarea
                        name="ingredients"
                        placeholder="Enter ingredients (comma separated)"
                        value={formData.ingredients.join(', ')}
                        onChange={handleChange}
                    />
                    <textarea
                        name="instructions"
                        placeholder="Enter instructions (comma separated)"
                        value={formData.instructions.join(', ')}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="preparationTime"
                        placeholder="Enter preparation time (minutes)"
                        value={formData.preparationTime}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="cookingTime"
                        placeholder="Enter cooking time (minutes)"
                        value={formData.cookingTime}
                        onChange={handleChange}
                    />
                    <input
                        type="number"
                        name="servings"
                        placeholder="Enter number of servings"
                        value={formData.servings}
                        onChange={handleChange}
                    />
                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                    >
                        <option value="">Select difficulty</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                </div>
                <button onClick={handleSubmitRecipe}>Add Recipe</button>
            </div>
            <div>
                <h1 className='font-bold'>All Recipes:</h1>
           
                    {allRecipes.map((recipe) => {
                        return(
                            
                            <div className='recipe-card'>
                                <h2>{recipe.title}</h2>
                                <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                                <p>Instructions: {recipe.instructions.join(', ')}</p>
                                <p>Preparation Time: {recipe.preparationTime} minutes</p>
                                <p>Cooking Time: {recipe.cookingTime} minutes</p>
                                <p>Servings: {recipe.servings}</p>
                                <p>Difficulty: {recipe.difficulty}</p>
                            </div>
                        )
                    })}
            </div>
        </>
    );
};

export default RecipesComponent;

