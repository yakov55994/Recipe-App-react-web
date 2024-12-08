import recipeService from '../services/recipeService.js';

const recipeController = {
    
    createRecipe: async (req, res) => {
        
        try {
            const newRecipe = await recipeService.createRecipe(req.body);
            res.status(201).json(newRecipe);
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: 'Invalid request' });
        }
    },
    updateRecipe: async (req, res) => {
        try {
            const updatedRecipe = await recipeService.update(req.params.id, req.body);
            res.json(updatedRecipe);
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: 'Recipe not found' });
        }
    },
    deleteRecipe: async (req, res) => {
        try {
            await recipeService.delete(req.params.id);
            res.json({ message: 'Recipe deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(404).json({ message: 'Recipe not found' });
        }
    },
    getRecipeById: async (req, res) => {
        try {
            const recipe = await recipeService.getById(req.params.id);
            if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
            res.json(recipe);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
    getAllRecipes: async (req,res) => {
        try {
            const recipes = await recipeService.getAll();
            res.status(200).json(recipes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' });
        }
    },
}

export default recipeController;