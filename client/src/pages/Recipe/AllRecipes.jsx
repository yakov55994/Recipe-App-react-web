import React from "react";
import RecipeCard from "../../components/RecipeCard.jsx";

const AllRecipes = () => {
  return (
    <div>
      <h1 className="font-bold text-center text-3xl my-5 mt-7 mb-10">
        כל המתכונים:
      </h1>
      <RecipeCard />
    </div>
  );
};

export default AllRecipes;
