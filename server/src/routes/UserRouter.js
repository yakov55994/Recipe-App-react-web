import express from 'express';
import userController from '../controller/UserController.js'

const router = express.Router();

// בקשת הרשמה
router.post('/register', userController.register);

// בקשת התחברות
router.post('/login', userController.login);

router.get('/:id', userController.getUserById);

router.post('/likeRecipe', userController.likeRecipe);

export default router;