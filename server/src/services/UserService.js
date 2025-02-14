import User from '../models/UserModel.js';  // Corrected import
import RecipeService from './recipeService.js';  // Ensure this import is correct

const userService = {
  registerUser: async (username, email, password) => {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) throw new Error('Username or Email already exists');

    const newUser = new User({ username, email, password });
    await newUser.save();
    return newUser;
  },

  getUserByEmail: async (email) => {
    return await User.findOne({ email });
  },

  getUserById: async (userId) => {
    try {
        const user = await User.findById(userId);  // חיפוש משתמש לפי ID
        return user;  // מחזיר את המידע על המשתמש
    } catch (error) {
        console.error(error);
        throw new Error('Error retrieving user');
    }
  },

  addRecipeToFavorites: async (userId, recipeId) => {
    const user = await userService.getUserById(userId);
    if (!user) {
      return { status: 404, data: { message: 'User not found' } };
    }

    const recipe = await RecipeService.getById(recipeId);
    if (!recipe) {
      return { status: 404, data: { message: 'Recipe not found' } };
    }

    // Check if the recipe is already in favorites
    const alreadyExists = user.favorites.includes(recipeId);
    if (alreadyExists) {
      return { status: 400, data: { message: 'Recipe already in favorites' } };
    }

    // Add recipe to favorites array
    user.favorites.push(recipeId);
    await user.save();

    return { status: 200, data: { message: 'Recipe added to favorites', favorites: user.favorites } };
  },
  getFavorites: async (userId) => {
    try {
      const user = await User.findById(userId).populate('favorites');
      if (!user) {
        return { status: 404, data: { message: 'User not found' } };
      }
      return { status: 200, data: user.favorites }; // מחזירים את רשימת המתכונים המועדפים
    } catch (error) {
      console.error(error);
      throw new Error('Error retrieving user favorites');
    }
  },
}

export default userService;
