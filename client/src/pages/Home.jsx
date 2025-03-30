// import AuroraBackgroundDemo from "../components/ui/background/BackgroundView";
// import InteractiveBentoGallery from "../components/ui/gallery/Gallery";
// import img1 from "../../public/assets/1.jpg";
// import img2 from "../../public/assets/2.jpg";
// import img3 from "../../public/assets/3.jpg";
// import img4 from "../../public/assets/4.jpg";

// const defaultMediaItems = [
//   {
//     id: 1,
//     type: "image",
//     title: "בשר צלוי ",
//     desc: "צלי בשר מלווה בירקות מובחרים שום קונפי ודברים מעניינים",
//     url: img1,
//     span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
//   },
//   {
//     id: 2,
//     type: "image",
//     title: "סלט ישראלי עשיר",
//     desc: "שלל ירקות עשירים בתיבול מיוחד",
//     url: img2,
//     span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
//   },
//   {
//     id: 3,
//     type: "image",
//     title: "פיצה פצצה ",
//     desc: "פיצוץ של פיצה בליווי תוספות מגוונות",
//     url: img3,
//     span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2 ",
//   },
//   {
//     id: 4,
//     type: "image",
//     title: "דג צרוב מעודן",
//     desc: "דג צרוב עם לימון וטוויסט  חרףרף",
//     url: img4,
//     span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
//   },
// ];

// const Home = ({ mediaItems = defaultMediaItems }) => {
//   return (
//     <div className="min-h-screen overflow-y-auto">
//       <InteractiveBentoGallery
//         mediaItems={mediaItems}
//         title="מהמומלצים שלנו"
//         description="מאחלים הנאה מכל מתכון 😊"
//       />
//     </div>
//   );
// };

// export default Home;

import { useEffect, useState } from "react";
import axios from "axios";
import AuroraBackgroundDemo from "../components/ui/background/BackgroundView";
import InteractiveBentoGallery from "../components/ui/gallery/Gallery";
import { API_SERVER_URL } from "../api/api.js";
import Loader from "../components/Loader.jsx";

const Home = () => {

  const [mediaItems, setMediaItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_SERVER_URL}/recipe`);

        // console.log(response.data); // תראה מה מתקבל ב-API
        const favoriteRecipes = response.data.filter(
          (recipe) => recipe.favorites === true
        );
        // console.log(favoriteRecipes)
        // מיפוי הנתונים כך שיתאימו למבנה של הגלריה
        const formattedMediaItems = favoriteRecipes.map((recipe) => ({
          id: recipe._id,
          type: "image",
          title: recipe.title,
          desc: recipe.description || "מתכון ללא תיאור",
          url: recipe.imageUrl, // ודא ששדה זה קיים ב-DB
          span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
        }));

        setMediaItems(formattedMediaItems);
        setLoading(false); // ��יו�� ה��עי��ה
        // console.log(mediaItems)
      } catch (error) {
        console.error("Error fetching favorite recipes:", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);
  // console.log(mediaItems)
  // console.log("Media items sent to gallery:", mediaItems);
  // console.log("Props received by InteractiveBentoGallery:", mediaItems);
  
  if (loading) {
    return <Loader isLoading={true} />;
  }
  return (
    <div className="min-h-screen overflow-y-auto">
      {mediaItems.length > 0 ? (

      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title="מהמומלצים שלנו"
        description="מאחלים הנאה מכל מתכון 😊"
      />
    ) : ( 
      <div className="text-center p-10">
        {setLoading(true)}
        <h1>
        טוען מתכונים מומלצים...
        </h1>
        </div>
      )}
    </div>
  );
};

export default Home;
