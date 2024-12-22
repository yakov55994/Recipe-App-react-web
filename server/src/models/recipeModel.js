// models/Recipe.js
import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: [String], required: true },
    preparationTime: { type: Number, required: true },
    cookingTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    difficulty: {
        type: String,
        required: true,
        enum: ['Easy', 'Medium', 'Hard']
    },
    categories: {
        mainCategory: {
            type: String,
            required: true,
            enum: ['Dairy', 'Fur', 'Meat'] // קטגוריות ראשיות
        },
        subCategory: {
            type: String,
            required: true,
            enum: ['Dishes', 'Desserts', 'Soups'] // תתי-קטגוריות
        }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    description:{
        type: String,
        required: true,
        maxlength: 100     }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
