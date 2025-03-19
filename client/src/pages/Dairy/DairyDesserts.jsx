import React from "react";
import RecipeCard from '../../components/RecipeCard.jsx'

const DairyDesserts = () => {
  return (
    <div>
      <h1 className="font-bold text-center text-3xl my-5 mt-32">המתכונים שלי</h1>
      <RecipeCard mainCategory="Dairy" subCategory="Desserts" />
    </div>
  );
};

export default DairyDesserts;
