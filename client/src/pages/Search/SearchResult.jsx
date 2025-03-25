import React from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from "../../components/RecipeCard.jsx";

const SearchResult = () => {
  const location = useLocation();
  const { data } = location.state || {}; // קבלת הנתונים מה-location

  // אם אין תוצאות
  if (!data || data.length === 0) {
    return (
      <h1 className="text-center text-5xl text-amber-700 mt-64 font-bold"> 
        מצטערים, אבל לא נמצאו מתכונים . . .
      </h1>
    );
  }

  return (
    <div>
      <h1 className='text-center text-5xl mb-6 mt-20 font-bold text-amber-700'>
        הנה מה שמצאנו
      </h1>
      <RecipeCard initialRecipes={data} />
    </div>
  );
};

export default SearchResult;