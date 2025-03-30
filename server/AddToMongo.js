import mongoose from 'mongoose';
import Recipe from './src/models/recipeModel.js';
import dotenv from 'dotenv';

dotenv.config();

const recipes = [
    {
        title: 'פשטידת גבינות',
        ingredients: [
            '1 קוטג\'',
            '1 גבינה לבנה',
            '100 גרם גבינה צהובה מגורדת',
            '3 ביצים',
            '2 כפות קמח',
            '1 כפית אבקת אפייה',
            'מלח ופלפל לפי הטעם'
        ],
        instructions: [
            'מחממים תנור ל-180 מעלות.',
            'מערבבים את כל החומרים בקערה.',
            'יוצקים לתבנית ואופים כ-30 דקות עד להזהבה.',
            'מגישים חם או קר.'
        ],
        preparationTime: 10,
        cookingTime: 30,
        servings: 6,
        imageUrl: '/assets/images/פשטידת גבינות.jpg',
        difficulty: 'Easy',
        categories: {
            mainCategory: 'Dairy',
            subCategory: 'Dishes'
        },
        description: 'פשטידת גבינות עשירה וקלה להכנה.',
        favorites: false
    },
   
];

const insertRecipes = async () => {
  try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log('Connected to MongoDB');
      
      await Recipe.insertMany(recipes);
      console.log('Recipes added successfully');
      mongoose.disconnect();
  } catch (error) {
      console.error('Error inserting recipes:', error);
      mongoose.disconnect();
  }
};

insertRecipes();