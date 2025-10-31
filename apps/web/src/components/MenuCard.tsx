import { useState } from "react";
import { motion } from "framer-motion";

interface menuCardProps {
  menuImg: string;
  menuImgBg: string | undefined;
  menuTitle: string;
  hovered: string | null;
  setHovered: React.Dispatch<React.SetStateAction<string | null>>;
}

function MenuCard({
  menuImg,
  menuImgBg,
  menuTitle,
  hovered,
  setHovered,
}: menuCardProps) {
  const [mouseDistance, setMouseDistance] = useState({
    distanceX: 0,
    distanceY: 0,
  });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { currentTarget, clientX, clientY } = e;
    const rect = currentTarget.getBoundingClientRect();

    // Posicion del mouse dentro de la carta

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Posicion centro de la carta
    const midX = rect.width / 2;
    const midY = rect.height / 2;

    // Calcular la rotación en base a la distancia del centro al mouse y se normaliza dividiendo por la posicion del centro
    const distanceX = (y - midY) / midY;
    const distanceY = (x - midX) / midX;

    setMouseDistance({ distanceX, distanceY });
    setHovered(menuTitle);
  };

  const handleMouseLeave = () => {
    setMouseDistance({ distanceX: 0, distanceY: 0 });
    setHovered(null);
  };

  const isDimmed = hovered !== null && hovered !== menuTitle;
  const movementScale = 10;
  const movementBgFrontRatio = 2;

  return (
    <div
      className={`relative h-full w-full overflow-hidden bg-theme-terciary border border-theme-text group/card group-hover/card:border-theme-secondary-accent
        ${
          isDimmed ? "opacity-40 scale-[0.98]" : "opacity-100 scale-100"
        } transition-all duration-300`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.img
        custom={mouseDistance}
        animate={{
          x: mouseDistance.distanceY * movementScale * movementBgFrontRatio,
          y: mouseDistance.distanceX * movementScale * movementBgFrontRatio,
          scale: 1.2,
        }}
        transition={{
          duration: 0.1,
        }}
        src={menuImgBg}
        alt=""
        className="w-full h-full object-cover aspect-auto absolute"
      />
      <motion.img
        custom={mouseDistance}
        animate={{
          x: mouseDistance.distanceY * movementScale,
          y: mouseDistance.distanceX * movementScale,
          scale: 1.2,
        }}
        transition={{
          duration: 0.1,
        }}
        src={menuImg}
        alt=""
        className="w-auto h-[90%] right-0 bottom-0 object-fit object-bottom-right absolute"
      />
      <div className="w-full absolute bottom-0 p-2 bg-theme-text text-theme-background group-hover/card:bg-theme-secondary-accent">
        {menuTitle}
      </div>
    </div>
  );
}

export default MenuCard;
