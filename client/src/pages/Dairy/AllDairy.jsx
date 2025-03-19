import React from "react";
import RecipeCard from '../../components/RecipeCard.jsx'

const AllDairy = () => {
  return (
    <div>
      <h1 className="font-bold text-center text-3xl my-5 mt-40">המתכונים שלי</h1>
      <RecipeCard mainCategory="Dairy"/>
    </div>
  );
};

export default AllDairy;
