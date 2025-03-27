// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { API_SERVER_URL } from "../../api/api.js";
// import { useAuth } from "../../context/AuthContext.jsx";
// import Loader from "../../components/Loader.jsx";
// import { ClockIcon, UsersIcon, StarIcon } from "lucide-react";

// const RecipeDetails = () => {
//   const { id } = useParams();
//   const { user } = useAuth();
//   const [recipe, setRecipe] = useState(null);
//   const [creatorName, setCreatorName] = useState("אנונימי");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecipe = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${API_SERVER_URL}/recipe/${id}`);
//         setRecipe(response.data);

//         // If the recipe has a user ID, fetch the user's details
//         if (response.data.user) {
//           let CreateName = "";
//           try {
//             const userResponse = await axios.get(
//               `${API_SERVER_URL}/user/${response.data.user}`
//             );
//             if (userResponse.data?.role === "admin") {
//               CreateName += "נכתב ע''י המערכת";
//               setCreatorName(CreateName);
//             } else {
//               let tempCreatorName =
//                 userResponse.data.firstName + " " + userResponse.data.lastName;
//               setCreatorName(tempCreatorName);
//             }
//           } catch (userError) {
//             console.log("Error fetching creator details:", userError);
//             setCreatorName("אנונימי");
//           }
//         }
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecipe();
//   }, [id]);

//   if (loading) {
//     return <Loader isLoading={true} />;
//   }

//   const formatToList = (text) => {
//     if (Array.isArray(text)) {
//       return text.map((item) => item.trim());
//     }

//     if (!text || typeof text !== "string" || text.trim() === "") {
//       return [];
//     }

//     return text
//       .split(/(?<=\.)\s*|[\n,]/)
//       .map((item) => item.trim())
//       .filter((item) => item.length > 0);
//   };

//   const formatInstructions = (text) => {
//     if (Array.isArray(text)) {
//       return text.map((step) => step.trim());
//     }

//     if (!text || typeof text !== "string" || text.trim() === "") {
//       return [];
//     }

//     return text
//       .split(/(?<=\.)\s*/)
//       .map((step) => step.trim())
//       .filter((step) => step.length > 0);
//   };

//   if (!recipe) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="text-center p-8 bg-red-50 rounded-lg shadow-lg">
//           <h1 className="text-3xl font-bold text-red-500">המתכון לא נמצא</h1>
//           <p className="mt-4 text-gray-600">נסה לחפש מתכון אחר או חזור לדף הבית</p>
//         </div>
//       </div>
//     );
//   }

//   const ingredientsList = Array.isArray(recipe.ingredients)
//     ? recipe.ingredients
//     : formatToList(recipe.ingredients);
//   const instructionsList = Array.isArray(recipe.instructions)
//     ? recipe.instructions
//     : formatInstructions(recipe.instructions);

//   return (
//     <div className="container mx-auto px-4 py-8 max-w-6xl " dir="rtl">
//       {/* Recipe Header with gradient background */}
//       <div className="relative mb-10 overflow-hidden rounded-2xl">
//         <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-500 opacity-90"></div>
//         <div className="relative z-10 px-8 py-12 text-center">
//           <h1 className="text-4xl font-bold text-white mb-4 shadow-text">
//             {recipe.title}
//           </h1>
//           <div className="flex justify-center items-center text-white">
//             <div className="text-amber-900 font-semibold px-4 py-1 bg-white bg-opacity-20 rounded-full">
//               נוצר על ידי: {creatorName}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-10 items-start">
//         {/* Left Column - Image and Quick Info */}
//         <div className="space-y-8">
//           <div className="overflow-hidden rounded-2xl shadow-2xl">
//             <img
//               src={recipe.imageUrl || "/placeholder-recipe.jpg"}
//               alt={recipe.title}
//               className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
//             />
//           </div>

//           {/* Recipe Quick Info Cards */}
//           <div className="grid grid-cols-2 gap-4">
//             {recipe.preparationTime && (
//               <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-md">
//                 <div className="flex items-center justify-between">
//                   <ClockIcon className="w-6 h-6 text-blue-500" />
//                   <div className="font-bold text-lg text-gray-800">זמן הכנה</div>
//                 </div>
//                 <div className="text-xl font-semibold text-blue-700 mt-2 text-right">{recipe.preparationTime} דקות</div>
//               </div>
//             )}

//             {recipe.cookingTime && (
//               <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl shadow-md">
//                 <div className="flex items-center justify-between">
//                   <ClockIcon className="w-6 h-6 text-red-500" />
//                   <div className="font-bold text-lg text-gray-800">זמן בישול</div>
//                 </div>
//                 <div className="text-xl font-semibold text-red-700 mt-2 text-right">{recipe.cookingTime} דקות</div>
//               </div>
//             )}

//             {recipe.servings && (
//               <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-md">
//                 <div className="flex items-center justify-between">
//                   <UsersIcon className="w-6 h-6 text-green-500" />
//                   <div className="font-bold text-lg text-gray-800">מספר מנות</div>
//                 </div>
//                 <div className="text-xl font-semibold text-green-700 mt-2 text-right">{recipe.servings}</div>
//               </div>
//             )}

//             {recipe.difficultyLevel && (
//               <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-md">
//                 <div className="flex items-center justify-between">
//                   <StarIcon className="w-6 h-6 text-purple-500" />
//                   <div className="font-bold text-lg text-gray-800">רמת קושי</div>
//                 </div>
//                 <div className="text-xl font-semibold text-purple-700 mt-2 text-right">{recipe.difficulty}</div>
//               </div>
//             )}
//           </div>

//           {/* Description Card */}
//           {recipe.description && (
//             <div className="bg-amber-50 p-6 rounded-xl shadow-md border-r-4 border-amber-400">
//               <h2 className="font-bold text-2xl mb-4 text-amber-800">תיאור</h2>
//               <p className="text-lg leading-relaxed text-gray-700">{recipe.description}</p>
//             </div>
//           )}
//         </div>

//         {/* Right Column - Ingredients and Instructions */}
//         <div className="space-y-8">
//           {/* Ingredients Card */}
//           <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-6 rounded-xl shadow-lg">
//             <div className="flex items-center mb-6">
//               <div className="flex-grow h-px bg-teal-200 ml-4"></div>
//               <h2 className="font-bold text-2xl text-teal-800">מרכיבים</h2>
//             </div>
//             <ul className="space-y-3">
//               {ingredientsList.map((ingredient, index) => (
//                 <li key={index} className="flex items-center gap-3">
//                   <div className="w-2 h-2 rounded-full bg-teal-400"></div>
//                   <span className="text-lg text-gray-700">{ingredient}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Instructions Card */}
//           <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-lg">
//             <div className="flex items-center mb-6">
//               <div className="flex-grow h-px bg-orange-200 ml-4"></div>
//               <h2 className="font-bold text-2xl text-orange-800">הוראות הכנה</h2>
//             </div>
//             <ol className="space-y-6">
//               {instructionsList.map((step, index) => (
//                 <li key={index} className="relative">
//                   <div className="flex items-start gap-4">
//                     <div className="flex-shrink-0 w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center font-bold">
//                       {index + 1}
//                     </div>
//                     <div className="flex-grow">
//                       <p className="text-lg text-gray-700">{step}</p>
//                     </div>
//                   </div>
//                   {index < instructionsList.length - 1 && (
//                     <div className="absolute left-4 top-8 bottom-0 w-px h-8 bg-orange-200"></div>
//                   )}
//                 </li>
//               ))}
//             </ol>
//           </div>
//         </div>
//       </div>

//       {/* Add custom CSS for shadow text */}
//       <style jsx>{`
//         .shadow-text {
//           text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default RecipeDetails;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_SERVER_URL } from "../../api/api.js";
import { useAuth } from "../../context/AuthContext.jsx";
import Loader from "../../components/Loader.jsx";
import {
  ClockIcon,
  UsersIcon,
  StarIcon,
  AlertCircleIcon,
  BookIcon,
} from "lucide-react";

const RecipeDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [recipe, setRecipe] = useState(null);
  const [creatorName, setCreatorName] = useState("אנונימי");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ingredients");

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_SERVER_URL}/recipe/${id}`);
        setRecipe(response.data);

        // If the recipe has a user ID, fetch the user's details
        if (response.data.user) {
          let CreateName = "";
          try {
            const userResponse = await axios.get(
              `${API_SERVER_URL}/user/${response.data.user}`
            );
            if (userResponse.data?.role === "admin") {
              CreateName += "נכתב ע''י המערכת";
              setCreatorName(CreateName);
            } else {
              let tempCreatorName =
                userResponse.data.firstName + " " + userResponse.data.lastName;
              setCreatorName(tempCreatorName);
            }
          } catch (userError) {
            console.log("Error fetching creator details:", userError);
            setCreatorName("אנונימי");
          }
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return <Loader isLoading={true} />;
  }

  const formatToList = (text) => {
    if (Array.isArray(text)) {
      return text.map((item) => item.trim());
    }

    if (!text || typeof text !== "string" || text.trim() === "") {
      return [];
    }

    return text
      .split(/(?<=\.)\s*|[\n,]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  };

  const formatInstructions = (text) => {
    if (Array.isArray(text)) {
      return text.map((step) => step.trim());
    }

    if (!text || typeof text !== "string" || text.trim() === "") {
      return [];
    }

    return text
      .split(/(?<=\.)\s*/)
      .map((step) => step.trim())
      .filter((step) => step.length > 0);
  };

  if (!recipe) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center p-8 bg-red-50 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-red-500">המתכון לא נמצא</h1>
          <p className="mt-4 text-gray-600">
            נסה לחפש מתכון אחר או חזור לדף הבית
          </p>
        </div>
      </div>
    );
  }

  const ingredientsList = Array.isArray(recipe.ingredients)
    ? recipe.ingredients
    : formatToList(recipe.ingredients);
  const instructionsList = Array.isArray(recipe.instructions)
    ? recipe.instructions
    : formatInstructions(recipe.instructions);

  // Calculate total time
  const totalTime =
    (parseInt(recipe.preparationTime) || 0) +
    (parseInt(recipe.cookingTime) || 0);

  return (
    <div
      className="container mx-auto px-4 py-8 max-w-6xl bg-white shadow-lg rounded-lg"
      dir="rtl"
    >
      {/* Top section with image and basic info */}
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="w-full md:w-2/5 p-4">
          <img
            src={recipe.imageUrl || "/placeholder-recipe.jpg"}
            alt={recipe.title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
          <div className="mt-4 text-center">
            <h2 className="text-2xl font-bold text-gray-800">{recipe.title}</h2>
            <p className="text-gray-600">מאת: {creatorName}</p>
          </div>
        </div>

        {/* Recipe quick info */}
        <div className="w-full md:w-3/5 p-4">
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed">
              {recipe.description}
            </p>
          </div>

          {/* Info cards in grid */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <div className="flex items-center justify-center p-2 bg-gray-100 rounded-lg w-32 text-center">
              <div className="flex flex-col items-center">
                <BookIcon className="w-6 h-6 text-gray-500 mb-1" />
                <span className="text-sm text-gray-500">כשר</span>
              </div>
            </div>

            {recipe.categories?.mainCategory && (
              <div className="flex items-center justify-center p-2 bg-gray-100 rounded-lg w-32 text-center">
                <div className="flex flex-col items-center">
                  <BookIcon className="w-6 h-6 text-gray-500 mb-1" />
                  <span className="text-sm text-gray-500">
                    {recipe.categories.mainCategory === "Dairy"
                      ? "חלבי"
                      : recipe.categories.mainCategory === "Meat"
                      ? "בשרי"
                      : recipe.categories.mainCategory === "Fur"
                      ? "פרווה"
                      : recipe.categories.mainCategory}
                  </span>
                </div>
              </div>
            )}

            {recipe.difficulty && (
              <div className="flex items-center justify-center p-2 bg-gray-100 rounded-lg w-32 text-center">
                <div className="flex flex-col items-center">
                  <StarIcon className="w-6 h-6 text-gray-500 mb-1" />
                  <span className="text-sm text-gray-500">
                    {recipe.difficulty === "Easy"
                      ? "קל"
                      : recipe.difficulty === "Medium"
                      ? "בינוני"
                      : recipe.difficulty === "Hard"
                      ? "קשה"
                      : recipe.difficulty}
                  </span>
                </div>
              </div>
            )}

            {totalTime > 0 && (
              <div className="flex items-center justify-center p-2 bg-gray-100 rounded-lg w-32 text-center">
                <div className="flex flex-col items-center">
                  <ClockIcon className="w-6 h-6 text-gray-500 mb-1" />
                  <span className="text-sm text-gray-500">
                    הכנה: {totalTime} דקות
                  </span>
                </div>
              </div>
            )}

            {recipe.servings && (
              <div className="flex items-center justify-center p-2 bg-gray-100 rounded-lg w-32 text-center">
                <div className="flex flex-col items-center">
                  <UsersIcon className="w-6 h-6 text-gray-500 mb-1" />
                  <span className="text-sm text-gray-500">
                    מנות: {recipe.servings}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Rating stars */}
          <div className="flex justify-center mb-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">ציון המתכון</h3>
              <div className="flex items-center justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarIcon
                    key={star}
                    className={`w-6 h-6 ${
                      star <= 4 ? "text-yellow-400" : "text-gray-300"
                    }`}
                    fill={star <= 4 ? "#FBBF24" : "none"}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 mt-1">
                4 מתוך 5 (14 דירוגים)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for ingredients and instructions */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          עוד פרטים חשובים
        </h2>

        {/* Tab buttons */}
        <div className="flex justify-center border-b mb-6">
          <button
            className={`px-4 py-2 mr-2 ${
              activeTab === "ingredients"
                ? "text-blue-500 border-b-2 border-blue-500 font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("ingredients")}
          >
            רשימת מרכיבים
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "instructions"
                ? "text-blue-500 border-b-2 border-blue-500 font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("instructions")}
          >
            אופן ההכנה בפירוט מלא
          </button>
          <button
            className={`px-4 py-2 ml-2 ${
              activeTab === "tips"
                ? "text-blue-500 border-b-2 border-blue-500 font-bold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("tips")}
          >
            טיפים
          </button>
        </div>

        {/* Tab content */}
        <div className="p-4">
          {activeTab === "ingredients" && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">מרכיבים</h3>
              <ul className="space-y-2">
                {ingredientsList.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="ml-3 w-6 h-6 bg-blue-100 rounded-full flex-shrink-0 mr-2 flex items-center justify-center text-blue-500">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "instructions" && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                אופן ההכנה
              </h3>
              <ol className="space-y-4">
                {instructionsList.map((step, index) => (
                  <li key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex">
                      <span className="ml-3 w-8 h-8 bg-blue-500 rounded-full flex-shrink-0 mr-3 flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </span>
                      <span className="text-gray-700">{step}</span>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {activeTab === "tips" && (
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">טיפים</h3>
              <div className="bg-yellow-50 p-4 rounded-lg border-r-4 border-yellow-400">
                <div className="flex items-start">
                  <AlertCircleIcon className="w-6 h-6 text-yellow-500 mr-2 flex-shrink-0 ml-3" />
                  <p className="text-gray-700">
                    "אל תשכחו לבדוק את התיבול בסוף הכנה. תמיד כדאי לטעום ולהתאים
                    את התיבול למתכון בהתאם להעדפות האישיות שלכם."
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comments section */}
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          תגובות
        </h2>
        <div className="flex justify-center">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 bg-amber-100 w-50 rounded-lg">
             בקרוב  🤌
          </h2>
        </div>

        {/* <div className="flex justify-center gap-2 mb-6">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600">
            להוספת תגובה
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300">
            לצפייה בכל התגובות
          </button>
        </div> */}
      </div>

      {/* Similar recipes section */}
      <div className="mt-8 border-t pt-6 mb-6">
        <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
          מתכונים דומים ומומלצים
        </h2>
        <div className="flex justify-center">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4 bg-amber-100 w-50 rounded-lg">
             בקרוב  🤌
          </h2>  
        </div>
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="text-center">
              <div className="w-full h-32 bg-gray-200 rounded-lg mb-2"></div>
              <p className="text-gray-700 font-medium">מתכון לדוגמה {item}</p>
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default RecipeDetails;
