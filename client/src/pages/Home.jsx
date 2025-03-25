import AuroraBackgroundDemo from "../components/ui/background/BackgroundView";
import InteractiveBentoGallery from "../components/ui/gallery/Gallery";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";

const defaultMediaItems = [
  {
    id: 1,
    type: "image",
    title: "בשר צלוי ",
    desc: "צלי בשר מלווה בירקות מובחרים שום קונפי ודברים מעניינים",
    url: img1,
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "סלט ישראלי עשיר",
    desc: "שלל ירקות עשירים בתיבול מיוחד",
    url: img2,
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "פיצה פצצה ",
    desc: "פיצוץ של פיצה בליווי תוספות מגוונות",
    url: img3,
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2 ",
  },
  {
    id: 4,
    type: "image",
    title: "דג צרוב מעודן",
    desc: "דג צרוב עם לימון וטוויסט  חרףרף",
    url: img4,
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
  },
];

const Home = ({ mediaItems = defaultMediaItems }) => {
  return (
    <div className="min-h-screen overflow-y-auto">
      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title="מהמומלצים שלנו"
        description="מאחלים הנאה מכל מתכון 😊"
      />
    </div>
  );
};

export default Home;
