import User from '../models/UserModel.js';
// import bcrypt from 'bcryptjs'

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
  addRecipeToFavorites: async (userId, recipeId) => {

    const user = await userService.getUserByEmail(userId);
    if (!user) {
      return { status: 404, data: { message: 'User not found' } };
    }

    const recipe = await recipeService.getRecipeById(recipeId);
    if (!recipe) {
      return { status: 404, data: { message: 'Recipe not found' } };
    }

    // בדיקה אם המתכון כבר ברשימה המועדפים
    const alreadyExists = user.favorites.some(fav => fav.recipeId === recipeId);
    if (alreadyExists) {
      return { status: 400, data: { message: 'Recipe already in favorites' } };
    }

    // הוספת המתכון לאובייקט המועדפים
    const recipeData = {
      recipeId : recipeId,
      userId : user._id,
      title: recipe.title,
      ingredients: recipe.ingredients,
      instructions: recipe.instructions,
      preparationTime: recipe.preparationTime,
      cookingTime: recipe.cookingTime,
      servings: recipe.servings,
      image: recipe.image,
      difficulty: recipe.difficulty,
      categories: recipe.categories,
      description: recipe.description,
      createdAt: recipe.createdAt
    };

    user.favorites.push(recipeData);
    await user.save();

    return { status: 200, data: { message: 'Recipe added to favorites', favorites: user.favorites } };
  }

}
export default userService;