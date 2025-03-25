import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import RecipeCard from '../../components/RecipeCard.jsx';

const SearchResult = () => {
  const location = useLocation();
  const { data } = location.state || {}; // קבלת הנתונים מה-location
  const { category } = useParams();

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
      <h1 className='text-center text-4xl mb-6 mt-8 font-serif text-cyan-900'>הנה מה שמצאנו 🔎</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} category={category} />
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
