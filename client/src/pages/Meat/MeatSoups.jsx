import React from "react";
import RecipeCard from '../../components/RecipeCard.jsx'
const MeatSoups = () => {
  return (
    <div>
      <h1 className="font-bold text-center text-3xl my-5">המתכונים שלי</h1>
      <RecipeCard mainCategory="Meat" subCategory="Soups" />
    </div>
  );
};

export default MeatSoups