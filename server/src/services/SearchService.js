import Recipe from '../models/recipeModel.js';

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
    }
};

export default SearchService;
