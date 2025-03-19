import React from "react";
import RecipeCard from '../../components/RecipeCard.jsx'
const FurSoups = () => {
  return (
    <div>
      <h1 className="font-bold text-center text-3xl my-5 mt-32">המתכונים שלי</h1>
      <RecipeCard mainCategory="Fur" subCategory="Soups" />
    </div>
  );
};

export default FurSoups