import express from 'express';
import userController from '../controller/UserController.js'
import authenticate from '../middleware/Authenticate.js';

const router = express.Router();

// בקשת הרשמה
router.post('/register', userController.register);

// בקשת התחברות
router.post('/login', userController.login);

router.post('/check-admin', userController.checkAdmin);


router.put("/:id/updateProfile", authenticate, userController.updateProfile);

router.put("/:id/update-password", authenticate, userController.updatePassword);

router.get('/:id', userController.getUserById);

router.post('/likeRecipe', userController.likeRecipe);

router.get('/:userId/favorites', userController.getFavorites);

router.delete("/:userId/favorites/:recipeId", userController.deleteFavoriteRecipe);


export default router;