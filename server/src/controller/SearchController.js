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
    },
    searchRecipeFromAI: async(req,res) => {
        const { query } = req.body;  // קבלת מילות החיפוש מהבקשה

        try {
          // קריאה לפונקציה בסרוויס
          const recipe = await SearchService.searchRecipeFromAI(query);
      
          // מחזירים את המתכון ל-Frontend
          res.json({ recipe });
        } catch (error) {
          // טיפול בשגיאות
          console.error("Error in searchRecipe:", error);
          res.status(500).json({ error: "אירעה שגיאה במהלך החיפוש" });
        }
    }

};

export default SearchController;
