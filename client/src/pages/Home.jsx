import img1 from '../assets/images/img1_home.png';
import img2 from '../assets/images/img2_home.png';
import img3 from '../assets/images/img3_home.png';
import img4 from '../assets/images/img4_home.png';

const Home = () => {
  return (
    <div className="relative bg-orange-100">
      <h1 className="text-center text-6xl mb-6 bg-amber-50 relative z-10 mt-28">מתכוני האוכל המובילים 🍽️</h1>

      {/* התמונות של המתכונים */}
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible relative z-10">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-2">

          <img
            className="object-cover object-center h-40 w-full rounded-lg md:h-60"
            src={img1}
            alt="Recipe 1"
          />

          <img
            className="object-cover object-center h-40 w-full rounded-lg md:h-60"
            src={img2}
            alt="Recipe 2"
          />

          <img
            className="object-cover object-center h-40 w-full rounded-lg md:h-60"
            src={img3}
            alt="Recipe 3"
          />

          <img
            className="object-cover object-center h-40 w-full rounded-lg md:h-60"
            src={img4}
            alt="Recipe 4"
          />

        </div>
      </div>
    </div>
  );
};

export default Home;
