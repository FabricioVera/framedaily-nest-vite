import type { WarframeDto } from "shared/src/dtos/warframe.dto";

interface Props {
  warframe: WarframeDto;
}

export function CorrectWarframeCard({ warframe }: Props) {
  return (
    <div className="mt-10 text-center">
      <h2 className="text-2xl font-semibold mb-3 text-green-400">
        ¡Correcto! Era {warframe.name} 🎉
      </h2>
      <img
        src={warframe.wikiaThumbnail || undefined}
        alt={warframe.name}
        className="w-48 rounded-xl mx-auto shadow-lg"
      />
    </div>
  );
}
