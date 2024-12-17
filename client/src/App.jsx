import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import NavBar from './pages/NavBar.jsx';
import Home from './pages/Home';
import Recipes from './pages/ViewRecipes.jsx';
import DairyDishes from "./pages/DairyDishes.jsx";
import FurDishes from "./pages/FurDishes.jsx";
import MeatDishes from "./pages/MeatDishes.jsx";
import DairyDesserts from "./pages/DairyDesserts";
import FurDesserts from './pages/FurDesserts.jsx';
import FurSoups from './pages/FurSoups.jsx';
import MeatSoups from './pages/MeatSoups.jsx';
import { ToastContainer } from 'react-toastify';
import PersonalArea from "./pages/PersonalArea.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";
import AllRecipes from "./pages/AllRecipes.jsx";

export default function App() {
  return (
    <>
<ToastContainer/>
      <AuthProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/PersonalArea" element={<PersonalArea />} />
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
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}