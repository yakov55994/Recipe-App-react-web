import SearchService from '../services/SearchService.js';

const SearchController = {
    search: async (req, res) => {
        try {
            const { query } = req.query; // מקבל את query מהפרמטרים של הבקשה
            const recipes = await SearchService.searchRecipe(query); // קריאה לשירות כדי לבצע חיפוש
            res.json(recipes); // מחזיר את התוצאות
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error' }); // מחזיר שגיאה במקרה של בעיה
        }
    }
};

export default SearchController;
