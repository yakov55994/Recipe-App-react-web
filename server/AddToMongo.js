import mongoose from 'mongoose';
import Recipe from './src/models/recipeModel.js';
import dotenv from 'dotenv';

dotenv.config();

const recipes = [
    {
        title: 'שיפודי פרגית במרינדה אסייתית',
        ingredients: [
            '500 גרם חזה עוף/פרגית חתוך לקוביות',
            '3 כפות רוטב סויה',
            '1 כף שמן שומשום',
            '2 שיני שום כתושות',
            '1 כפית ג\'ינג\'ר מגורד',
            '1 כף דבש',
            '1 כף חומץ אורז',
            'שיפודי עץ'
        ],
        instructions: [
            'מערבבים את כל חומרי המרינדה בקערה ומשרים את קוביות הפרגית למשך שעתיים לפחות.',
            'משפדים את הפרגית על השיפודים.',
            'צולים על גריל או מחבת פסים 3-4 דקות מכל צד עד להזהבה.',
            'מגישים עם אורז או ירקות מאודים.'
        ],
        preparationTime: 120,
        cookingTime: 10,
        servings: 4,
        imageUrl: 'https://example.com/grilled-chicken-skewers.jpg',
        difficulty: 'Easy',
        categories: {
            mainCategory: 'Meat',
            subCategory: 'Dishes'
        },
        description: 'שיפודי פרגית עסיסיים במרינדה אסייתית טעימה וקלה להכנה.',
        favorites: false
    },
    {
        title: 'קדירת בקר עם ירקות שורש',
        ingredients: [
            '700 גרם בשר בקר (כתף או שריר) חתוך לקוביות',
            '2 בצלים חתוכים לקוביות',
            '3 גזרים חתוכים לעיגולים',
            '2 תפוחי אדמה חתוכים לקוביות',
            '1 שורש סלרי חתוך לקוביות',
            '4 שיני שום כתושות',
            '3 כפות רסק עגבניות',
            '1 כוס ציר בקר / מים',
            '1 כף פפריקה מתוקה',
            'מלח ופלפל לפי הטעם',
            '2 כפות שמן'
        ],
        instructions: [
            'מחממים שמן בסיר ומטגנים את הבצל עד להזהבה.',
            'מוסיפים את קוביות הבקר ומשחימים מכל הצדדים.',
            'מוסיפים את הירקות, התבלינים, רסק העגבניות וציר הבקר.',
            'מבשלים על אש נמוכה כ-3 שעות עד שהבשר רך.',
            'מגישים עם אורז או לחם טרי.'
        ],
        preparationTime: 20,
        cookingTime: 180,
        servings: 6,
        imageUrl: 'https://example.com/beef-stew.jpg',
        difficulty: 'Medium',
        categories: {
            mainCategory: 'Meat',
            subCategory: 'Dishes'
        },
        description: 'קדירת בקר עשירה עם ירקות שורש בבישול איטי.',
        favorites: false
    },
    {
        title: 'פסטה ברוטב אלפרדו',
        ingredients: [
            '250 גרם פסטה פנה',
            '2 כוסות שמנת לבישול',
            '1 כוס גבינת פרמזן מגורדת',
            '2 כפות חמאה',
            '2 שיני שום כתושות',
            'מלח ופלפל לפי הטעם'
        ],
        instructions: [
            'מבשלים את הפסטה לפי ההוראות ומסננים.',
            'ממיסים חמאה במחבת, מוסיפים שום ומטגנים קלות.',
            'מוסיפים את השמנת ומבשלים על אש נמוכה 5 דקות.',
            'מערבבים פנימה את גבינת הפרמזן, מוסיפים מלח ופלפל.',
            'מערבבים את הרוטב עם הפסטה ומגישים חם.'
        ],
        preparationTime: 10,
        cookingTime: 15,
        servings: 4,
        imageUrl: 'https://example.com/alfredo-pasta.jpg',
        difficulty: 'Easy',
        categories: {
            mainCategory: 'Dairy',
            subCategory: 'Dishes'
        },
        description: 'פסטה שמנתית וטעימה ברוטב אלפרדו קלאסי.',
        favorites: false
    },
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
        imageUrl: 'https://example.com/cheese-pie.jpg',
        difficulty: 'Easy',
        categories: {
            mainCategory: 'Dairy',
            subCategory: 'Dishes'
        },
        description: 'פשטידת גבינות עשירה וקלה להכנה.',
        favorites: false
    },
    {
        title: 'סלט קינואה עם ירקות',
        ingredients: [
            '1 כוס קינואה',
            '2 כוסות מים',
            '1 פלפל אדום חתוך לקוביות',
            '1 מלפפון חתוך לקוביות',
            '1 גזר מגורד',
            '3 כפות שמן זית',
            'מיץ מלימון אחד',
            'מלח ופלפל לפי הטעם'
        ],
        instructions: [
            'מבשלים את הקינואה עם המים לפי ההוראות ומצננים.',
            'מערבבים את כל הירקות בקערה.',
            'מוסיפים את הקינואה, שמן הזית ומיץ הלימון.',
            'מערבבים היטב ומגישים.'
        ],
        preparationTime: 10,
        cookingTime: 15,
        servings: 4,
        imageUrl: 'https://example.com/quinoa-salad.jpg',
        difficulty: 'Easy',
        categories: {
            mainCategory: 'Fur',
            subCategory: 'Dishes'
        },
        description: 'סלט קינואה מרענן עם ירקות טריים ורוטב לימון.',
        favorites: false
    }
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