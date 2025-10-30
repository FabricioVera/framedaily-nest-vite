import { motion } from "framer-motion";

interface HeroInputProps {
  itemName: string;
  thumbnailUrl: string | undefined;
  selectDirection: number;
}

export function HeroInput({
  itemName,
  thumbnailUrl,
  selectDirection,
}: HeroInputProps) {
  const h1Variants = {
    initial: (selectDirection: number) => ({
      y: selectDirection > 0 ? 40 : -40,
    }),
    center: {
      y: 0,
    },
    exit: (selectDirection: number) => ({
      y: selectDirection > 0 ? -40 : 40,
    }),
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
      className="relative w-auto h-[40vh] md:h-[50vh] flex items-end justify-center overflow-hidden rounded-2xl shadow-lg mb-5 bg-sidebar"
    >
      <img
        className="absolute inset-0 w-full h-full object-cover brightness-75 mask-fade-bottom"
        src={thumbnailUrl}
        alt=""
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

      <motion.h1
        custom={selectDirection}
        variants={h1Variants}
        initial="initial"
        animate="center"
        exit="exit"
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
        className="relative z-10 text-4xl md:text-6xl font-bold text-white drop-shadow-lg text-center px-4 pb-12 animate-fade-in css-3d-text"
      >
        {itemName}
      </motion.h1>
    </motion.section>
  );
}
