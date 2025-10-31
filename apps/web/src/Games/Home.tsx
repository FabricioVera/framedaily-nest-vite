import { Link } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import { useState } from "react";

const menuItems = [
  {
    menuImg: "/img1",
    menuTitle: "Próximamente",
    className: "row-span-2 col-start-1 row-start-2",
    link: "/",
  },
  {
    menuImgBg: "menuImg/WarframeBackground.png",
    menuImg: "menuImg/WarframeOnly2.png",
    menuTitle: "Warframes",
    className: "col-span-2 row-span-3 col-start-2 row-start-2",
    link: "/guess-the-warframe",
  },
  {
    menuImg: "/img3",
    menuTitle: "Habilidades",
    className: "col-span-2 row-span-3 col-start-4 row-start-2",
    link: "/guess-abilities-by-picture",
  },
  {
    menuImg: "/img4",
    menuTitle: "img 4",
    className: "row-span-2 col-start-6 row-start-2",
    link: "",
  },
  {
    menuImg: "/img5",
    menuTitle: "img 5",
    className: "col-span-4 col-start-2 row-start-5",
    link: "",
  },
  {
    menuImg: "/img6",
    menuTitle: "img 6",
    className: "row-span-2 col-start-1 row-start-4",
    link: "",
  },
  {
    menuImg: "/img7",
    menuTitle: "img 7",
    className: "row-span-2 col-start-6 row-start-4",
    link: "",
  },
];

export default function Home() {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <main className="bg-theme-background">
      <div className="grid grid-cols-6 grid-rows-[0.5fr_1fr_1fr_1fr_1fr] gap-4 p-8 w-screen min-h-screen ">
        <div className="col-span-6 col-start-1 row-start-1 text-center">
          <h1 className="text-theme-secondary-accent font-black text-6xl css-3d-text">
            FrameDaily
          </h1>
        </div>
        {menuItems.map((item) => (
          <Link
            to={item.link}
            className={`${item.className}`}
            draggable="false"
          >
            <MenuCard
              key={item.menuTitle}
              menuImgBg={item.menuImgBg}
              menuImg={item.menuImg}
              menuTitle={item.menuTitle}
              hovered={hovered}
              setHovered={setHovered}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
