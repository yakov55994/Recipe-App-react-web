import React from "react";
import RecipeCard from '../../components/RecipeCard.jsx'
const FurDishes = () => {
  return (
    <div>
      <h1 className="font-bold text-center text-3xl my-5">המתכונים שלי</h1>
      <RecipeCard mainCategory="Fur" subCategory="Dishes" />
    </div>
  );
};

export default FurDishes;