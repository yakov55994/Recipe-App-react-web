import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider } from "./context/AuthContext.jsx";
import LoginPage from "./pages/Auth/LoginPage.jsx";
import SignUpPage from "./pages/Auth/SignUpPage.jsx";
import NavBar from "./pages/NavBar.jsx";
import Home from "./pages/Home";
import Recipes from "./pages/Recipe/ViewRecipes.jsx";
import PersonalArea from "./pages/PersonalArea.jsx";
import CreateRecipe from "./pages/Recipe/CreateRecipe.jsx";
import AllRecipes from "./pages/Recipe/AllRecipes.jsx";
import Search from "./pages/Search/Search.jsx";
import SearchResult from "./pages/Search/SearchResult.jsx";
import RecipeDetails from "./pages/Recipe/RecipeDetails.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import AllDairy from "./pages/Dairy/AllDairy.jsx";
import AllFur from "./pages/Fur/AllFure.jsx";
import AllMeat from "./pages/Meat/AllMeat.jsx";
import ProductsIliked from "./pages/Recipe/ProductsIliked.jsx";
import DairyDishes from "./pages/Dairy/DairyDishes.jsx";
import FurDishes from "./pages/Fur/FurDishes.jsx";
import MeatDishes from "./pages/Meat/MeatDishes.jsx";
import DairyDesserts from "./pages/Dairy/DairyDesserts.jsx";
import FurDesserts from "./pages/Fur/FurDesserts.jsx";
import FurSoups from "./pages/Fur/FurSoups.jsx";
import MeatSoups from "./pages/Meat/MeatSoups.jsx";
import EditRecipe from "./pages/Recipe/EditRecipe.jsx";

export default function App() {
  return (
    <>
      <Toaster />
      <AuthProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/PersonalArea" element={<PersonalArea />} />
            <Route path="/AllDairy" element={<AllDairy />} />
            <Route path="/AllFur" element={<AllFur />} />
            <Route path="/AllMeat" element={<AllMeat />} />
            <Route path="/DairyDishes" element={<DairyDishes />} />
            <Route path="/FurDishes" element={<FurDishes />} />
            <Route path="/MeatDishes" element={<MeatDishes />} />
            <Route path="/FurDesserts" element={<FurDesserts />} />
            <Route path="/DairyDesserts" element={<DairyDesserts />} />
            <Route path="/FurSoups" element={<FurSoups />} />
            <Route path="/MeatSoups" element={<MeatSoups />} />
            <Route path="/CreateRecipe" element={<CreateRecipe />} />
            <Route path="/AllRecipes" element={<AllRecipes />} />
            <Route path="/Recipes" element={<Recipes />} />
            <Route path="/SearchResult" element={<SearchResult />} />
            {/* <Route
              path="/:category/RecipeDetails/:id"
              element={<RecipeDetails />}
            /> */}
            <Route path="/RecipeDetails/:id" element={<RecipeDetails />} />
            <Route path="/category/:categoryName" element={<CategoryPage />} />
            <Route path="/productsIliked" element={<ProductsIliked />} />
            <Route path="/editRecipe/:recipeId" element={<EditRecipe />} />
          </Routes>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "#F5DEB3",
              marginTop: "200px",
            }}
          >
            <b
              style={{
                color: "ActiveBorder",
                // backgroundColor: "#61402cc5",
                padding: "0.5rem",
                borderRadius: "5px",
              }}
            >
              נבנה ועוצב ע"י{" "}
              <a
                href="https://mmmtweb2.github.io/MT/index.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "ActiveBorder",
                  textShadow: "1px 1px 1px rgba(204, 231, 107, 0.395)",
                  fontSize: "20px",
                  textDecoration: "underline",
                }}
                
              >
                Made Tomorrow
              </a>{" "}
              {/* <a
                href="/index.html"
                style={{
                  color: "ActiveBorder",
                  textShadow: "1px 1px 1px rgba(204, 231, 107, 0.395)",
                }}
              >
                צור קשר
              </a> */}
            </b>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "ActiveBorder",
            }}
          >
            <p
              style={{
                marginTop: "4px",
                marginBottom: "20px",
                // backgroundColor: "#61402cc5",
                padding: "0.5rem",
                borderRadius: "5px",
              }}
            >
              &copy; 2025 Made Tomorrow. כל הזכויות שמורות.
            </p>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
