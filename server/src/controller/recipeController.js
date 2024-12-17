import recipeService from '../services/recipeService.js';

const recipeController = {
    createRecipe: async (req, res) => {
        const { title, ingredients, instructions, preparationTime, cookingTime, servings, imageUrl, difficulty, categories, user } = req.body;
        const recipeData = {
            title,
            ingredients,
            instructions,
            preparationTime,
            cookingTime,
            servings,
            imageUrl,
            difficulty,
            categories,
            user
        };
        if (!title || !ingredients || !instructions || !cookingTime || !preparationTime || !servings || !imageUrl || !difficulty || !categories || !user)
            return res.status(400).json({ error: "All fields are required" });
        try {
            const newRecipe = await recipeService.createRecipe(recipeData); // הפנייה לסרביס
            res.status(201).json(newRecipe);

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    },
    updateRecipe: async (req, res) => {
        try {
            const updatedRecipe = await recipeService.updateRecipe(req.body);
            res.json(updatedRecipe);
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: 'Recipe not found' });
        }
    },
    deleteRecipe: async (req, res) => {
        try {
            await recipeService.deletedRecipe(req.params.id);
            res.json({ message: 'Recipe deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: 'Recipe not found' });
        }
    },
    getRecipeById: async (req, res) => {
        try {
            const recipe = await recipeService.getById(req.params);
            if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
            res.json(recipe);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    getAllRecipes: async (req, res) => {
        try {
            const recipes = await recipeService.getAll();
            res.status(200).json(recipes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    }
};

export default recipeController;
