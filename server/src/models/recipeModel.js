import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    instructions: [{ type: String, required: true }],
    preparationTime: { type: Number, required: true },
    cookingTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    difficulty: { 
        type: String, 
        required: true,
        enum: ['Easy', 'Medium', 'Hard']
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;