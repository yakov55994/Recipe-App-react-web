import axios from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import { toast } from "sonner";
import { API_SERVER_URL } from "../../api/api.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from '../../components/Loader.jsx';
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext.jsx";
import RecipeCard from "../../components/RecipeCard.jsx";


const AllRecipes = () => {

  return (
    <div>
      <h1 className="font-bold text-center text-3xl my-5 mt-7 mb-10">כל המתכונים:</h1>
      <RecipeCard />
    </div>
  );
};

export default AllRecipes;
