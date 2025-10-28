interface HeroInputProps {
  itemName: string;
  thumbnailUrl: string | undefined;
}

export function HeroInput({
  itemName,
  thumbnailUrl,
}: HeroInputProps) {
  return (
    <section className="relative w-full h-[40vh] md:h-[50vh] flex items-end justify-center overflow-hidden rounded-2xl shadow-lg">
      <img
        className="absolute inset-0 w-full h-full object-cover brightness-75"
        src={thumbnailUrl}
        alt=""
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
      <h1 className="relative z-10 text-4xl md:text-6xl font-bold text-white drop-shadow-lg text-center px-4 pb-12 animate-fade-in">
        {itemName}
      </h1>
    </section>
  );
}
