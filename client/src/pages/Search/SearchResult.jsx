import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const SearchResult = () => {
  const location = useLocation();
  const { data } = location.state || {}; // קבלת הנתונים מה-location
  const { category } = useParams();
  const navigate = useNavigate();

  // אם אין תוצאות
  if (!data || data.length === 0) {
    return (
      <h1 className="text-center text-5xl text-amber-700 mt-64 font-bold"> מצטערים, אבל לא נמצאו מתכונים . . .</h1>
    );
  }
  const MoveToDetails = (recipe) => {
    navigate(`/RecipeDetails/${recipe._id}`);
  }

  return (
    <div >
      <h1 className='text-center text-5xl mb-6 mt-20 font-bold text-amber-700'>הנה מה שמצאנו</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((recipe, index) => (
          <div
            key={index}
            className="max-w-sm bg-white border-gray-200 rounded-lg shadow mb-20 mt-10"
          >
            <a href="#">
              <img
                className="rounded-t-lg w-full h-48 object-cover"
                src={recipe.imageUrl}
                alt={recipe.title}
                onClick={() => MoveToDetails(recipe)}

              />
            </a>
            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold">{recipe.title}</h5>
              <p>
                {recipe.description}
              </p>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
