import React, { useState } from 'react';
import axios from 'axios';
import { API_SERVER_URL } from '../../api/api.js';

const RecipeSearch = () => {
  const [query, setQuery] = useState('');
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchRecipe = async () => {
    setLoading(true);
    try {
      // שולחים בקשה ל-Backend (Express)
      const response = await axios.post(`${API_SERVER_URL}/search/AI`, { query });

      // עדכון התוצאה
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error("Error fetching recipe:", error);
    } finally {
      setLoading(false);
    }
  };

  const cleanRecipe = (rawRecipe) => {
    // דוגמה לעיבוד טקסט כדי לשפר את הקריאות
    let cleaned = rawRecipe.trim();
  
    // אפשר להוסיף כאן כל חיפוש והחלפה של תוויים לא רצויים
    cleaned = cleaned.replace(/\[.*?\]/g, ''); // מסנן את התגובות (כל מה שנמצא בסוגריים)
    
    // מחזיר את התוצאה הנקייה
    return cleaned;
  };
  

  return (
    <div className=''>
      <h1 className='font-bold text-2xl mt-6 mb-5 flex justify-center'>חפש מתכון</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='p-2 rounded-lg border-black '
        placeholder="הכנס מילת חיפוש"
      />
      <button
        className='mr-3'
        onClick={searchRecipe} disabled={loading}>
        {loading ? "טוען..." : "🔍"}
      </button>

      {recipe && (
        <div className="mt-4 p-4 border rounded-lg bg-gray-100">
          <h2 className="font-semibold text-xl mb-2">המתכון שלך:</h2>
          <pre className="whitespace-pre-wrap break-words">{cleanRecipe(recipe)}</pre>
        </div>
      )}
    </div>
  );
};

export default RecipeSearch;
