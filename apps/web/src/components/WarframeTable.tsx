import type { WarframeDto } from 'shared/src/dtos/warframe.dto';

interface WarframeTableProps {
    guessedWarframes: WarframeDto[];
}

export function WarframeTable({ guessedWarframes }: WarframeTableProps) {
    if (guessedWarframes.length === 0) {
        return (
            <p className="text-gray-400 text-center mt-4">Aún no has adivinado ningún Warframe.</p>
        );
    }

    return (
        <div className="overflow-x-auto w-full max-w-4xl">
        <table className="min-w-full border border-gray-700 rounded-xl overflow-hidden">
            <thead className="bg-gray-800">
            <tr>
                <th className="px-4 py-2 text-left">Imagen</th>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Prime</th>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Aura</th>
                <th className="px-4 py-2 text-left">Año</th>
            </tr>
            </thead>
            <tbody>
          {guessedWarframes.map((w) => (
            <tr
              key={w.id}
              className="border-t border-gray-700 hover:bg-gray-800 transition"
            >
              <td className="px-4 py-2">
                <img
                  src={w.wikiaThumbnail || undefined}
                  alt={w.name}
                  className="w-16 h-16 object-contain rounded-md"
                />
              </td>
              <td className="px-4 py-2">{w.name}</td>
              <td className="px-4 py-2">{w.isPrime ? "Sí" : "No"}</td>
              <td className="px-4 py-2">{w.type}</td>
              <td className="px-4 py-2">{w.aura}</td>
              <td className="px-4 py-2">{w.releaseYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}