import InteractiveBentoGallery from "../gallery/Gallery.jsx";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";

const mediaItems = [
  {
    id: 1,
    type: "image",
    title: "Anurag Mishra",
    desc: "Driven, innovative, visionary",
    url: img1,
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 2,
    type: "image",
    title: "Dog Puppy",
    desc: "Adorable loyal companion.",
    url: img2,
    span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "Forest Path",
    desc: "Mystical forest trail",
    url: img3,
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2 ",
  },
  {
    id: 4,
    type: "image",
    title: "Falling Leaves",
    desc: "Autumn scenery",
    url: img4,
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
  },
  //   {
  //     id: 5,
  //     type: "video",
  //     title: "Bird Parrot",
  //     desc: "Vibrant feathered charm",
  //     url: {img1},
  //     span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ",
  //   },
  //   {
  //     id: 6,
  //     type: "image",
  //     title: "Beach Paradise",
  //     desc: "Sunny tropical beach",
  //     url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  //     span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 ",
  //   },
  //   {
  //     id: 7,
  //     type: "video",
  //     title: "Shiva Temple",
  //     desc: "Peaceful Shiva sanctuary.",
  //     url: "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4",
  //     span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2 ",
  //   },
];

export function BentoGridGalleryDemo() {
  return (
    <div className="min-h-screen overflow-y-auto">
      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title=""
        description="Drag and explore our curated collection of shots"
      />
    </div>
  );
}
