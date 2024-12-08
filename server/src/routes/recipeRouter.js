import express from "express";
import recipeController from '../controller/recipeController.js';

const router = express.Router();

router.post('/createRecipe', recipeController.createRecipe);
router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', recipeController.updateRecipe);
router.delete('/:id', recipeController.deleteRecipe);

export default router;