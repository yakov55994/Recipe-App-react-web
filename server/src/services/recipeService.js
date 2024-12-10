import recipeModel from '../models/recipeModel.js';

const RecipeService = {
    createRecipe: async (recipeData) => {
        try {
            const newRecipe = new recipeModel(recipeData);
            return await newRecipe.save();
        } catch (error) {
            console.error('Error creating recipe:', error);
            throw error;
        }
    },
    updateRecipe: async (recipeData) => {
        try {
            const updatedRecipe = await recipeModel.findByIdAndUpdate(
                recipeData._id,
                recipeData,
                { new: true }
            );
            if (!updatedRecipe) {
                throw new Error('Recipe not found');
            }
            return updatedRecipe;
        } catch (error) {
            console.error('Error updating recipe:', error);
            throw error;
        }
    },
    deletedRecipe: async (recipeId) => {
        try {
            const deletedRecipe = await recipeModel.findByIdAndDelete(recipeId);
            if (!deletedRecipe) {
                throw new Error('Recipe not found');
            }
            return deletedRecipe;
        } catch (error) {
            console.error('Error deleting recipe:', error);
            throw error;
        }
    },
    getAll: async () => {
        try {
            return await recipeModel.find();
        } catch (error) {
            console.error('Error fetching recipes:', error);
            throw error;
        }
    },
    getById: async (recipeId) => {
        try {
            return await recipeModel.findById(recipeId);
        } catch (error) {
            console.error('Error fetching recipe by ID:', error);
            throw error;
        }
    }
}

export default RecipeService;