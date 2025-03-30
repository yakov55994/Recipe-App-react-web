import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { API_SERVER_URL } from "../../api/api.js";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const Favorites = () => {

    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchRecipes = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(`${API_SERVER_URL}/recipe`);
                setRecipes(response.data);
            } catch (error) {
                toast.error(`שגיאה בטעינת מתכונים: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecipes();
    }, []);


    // if (isLoading) return <Loader isLoading={true} />;

    return (
        <>
        <div className="text-center font-bold text-3xl">: The favorites</div>
        <div>
        {
            recipes.filter(recipe => recipe.favorites === true).map(recipe =>{
                return (
                    <div key={recipe._id}>
                        <Link to={`/recipeDetails/${recipe._id}`}>
                                <div className="border-2 border-gray-200 p-5 rounded-md mt-10">
                                    <h2>{recipe.title}</h2>
                                    <p>{recipe.description}</p>
                                    <p>By: {recipe.cookingTime}</p>
                                    <p>Category: {recipe.categories.mainCategory}</p>
                                    <p>Category: {recipe.categories.subCategory}</p>
                                    <FaHeart color={recipe.hearted === true? "red" : "gray"} onClick={() => handleHeartClick(recipe._id)} />
                                    <p>Hearted: {recipe.hearted === true? "Yes" : "No"}</p>
                                </div>
                        </Link>
                    </div>
                )
            })
        }

        </div>
        </>
    )
}

export default Favorites