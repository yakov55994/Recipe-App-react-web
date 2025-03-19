import { query } from 'express';
import Recipe from '../models/recipeModel.js';
import fetch from 'node-fetch'

const SearchService = {
    searchRecipe: async (query) => {
        try {
            const recipes = await Recipe.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } }  // אם אתה רוצה לחפש גם בתיאור
                ]
            });
            return recipes; // מחזיר את התוצאות
        } catch (error) {
            throw new Error('Error fetching recipes from the database');
        }
    },
    searchRecipeFromAI: async (query) => {
        try {
            const AI_API_KEY = process.env.AI_API_KEY; // גישה למפתח ה-API מתוך משתני הסביבה
            
            // ביצוע בקשה ל-Hugging Face API (השתמש במודל GPT או מודל אחר שמתאים לך)
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', { // כאן השתמש במודל שמתאים לך
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    inputs: `הצע מתכון המבוסס על המילים הבאות: ${query}`,
                }),
            });
    
            if (!response.ok) {
                const errorDetails = await response.text();
                throw new Error(`Failed to fetch data from Hugging Face API. Status: ${response.status}. Details: ${errorDetails}`);
            }
    
            const data = await response.json();
            // מחזירים את התגובה שהתקבלה
            return data[0].generated_text.trim(); // תלוי איך התגובה בנויה
        } catch (error) {
            console.error('Error during API request:', error);
            throw new Error("אירעה שגיאה במהלך קריאת ה-API");
        }
    }
    

};

export default SearchService;
