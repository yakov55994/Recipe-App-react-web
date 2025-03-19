// import imgBg from "../assets/images/imgBg.jpg";

const Home = () => {
  return (
    <div>
      <h1 className="text-center text-3xl md:text-6xl mt-32">
        מתכוני האוכל המובילים 🍽️
      </h1>
      {/* התמונות של המתכונים */}
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible relative z-10">
        <div className="w-full h-screen flex justify-center items-center">
          {/* <img src={imgBg} alt="" className="w-full h-full object-cover" /> */}
        </div>
      </div>
      <button></button>
    </div>
  );
};

export default Home;
