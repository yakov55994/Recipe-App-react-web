import React from "react";
import RecipeCard from '../../components/RecipeCard.jsx'

const AllMeat = () => {
  return (
    <div>
      <h1 className="font-bold text-center text-3xl my-5 mt-40">המתכונים שלי</h1>
      <RecipeCard mainCategory="Meat"/>
    </div>
  );
};

export default AllMeat;
