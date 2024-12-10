import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar.jsx'
import Home from './pages/Home'
import Recipes from './pages/Recipes';
import DairyDishes from "./pages/DairyDishes.jsx";
import FurDishes from "./pages/FurDishes.jsx";
import MeatDishes from "./pages/MeatDishes.jsx";
import DairyDesserts from "./pages/DairyDesserts";
import FurDesserts from './pages/FurDesserts.jsx'
import FurSoups from './pages/FurSoups.jsx'
import MeatSoups from './pages/MeatSoups.jsx'

export default function App() {

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/DairyDishes" element={<DairyDishes />} />
          <Route path="/FurDishes" element={<FurDishes />} />
          <Route path="/MeatDishes" element={<MeatDishes />} />
          <Route path="/FurDesserts" element={<FurDesserts />} />
          <Route path="/DairyDesserts" element={<DairyDesserts />} />
          <Route path="/FurSoups" element={<FurSoups />} />
          <Route path="/MeatSoups" element={<MeatSoups />} />
          <Route path="/Recipes" element={<Recipes />} />
        </Routes>
      </Router>
    </>
  )
}


