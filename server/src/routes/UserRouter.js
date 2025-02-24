import express from 'express';
import userController from '../controller/UserController.js'
import authenticate from '../middleware/Authenticate.js';

const router = express.Router();

// בקשת הרשמה
router.post('/register', userController.register);

// בקשת התחברות
router.post('/login', userController.login);

router.put("/update-password", authenticate, userController.updatePassword);

router.get('/:id', userController.getUserById);

router.post('/likeRecipe', userController.likeRecipe);

router.get('/:userId/favorites', userController.getFavorites);

router.delete("/favorites/:recipeId", userController.deleteFavoriteRecipe);


export default router;