import React from 'react';
import { useLocation } from 'react-router-dom';
import RecipeCard from '../../components/RecipeCard.jsx'; // Import of RecipeCard component

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
      <h1 className="text-center text-4xl mb-6 mt-20 font-bold text-amber-700">
        הנה מה שמצאנו
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7 mr-7">
        {/* שלח את הנתונים כל רכיב RecipeCard */}
        {data.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
