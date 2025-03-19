import React from "react";
import RecipeCard from '../../components/RecipeCard.jsx'

const AllFur = () => {
  return (
    <div>
      <h1 className="font-bold text-center text-3xl my-5 mt-40">המתכונים שלי</h1>
      <RecipeCard mainCategory="Fur"/>
    </div>
  );
};

export default AllFur;
