import {
  Table,
  TableHeader,
  TableBody,
} from "@/components/ui/table";
import {
  WarframeHeaderRow,
  type Column,
} from "./WarframeHeaderRow";
import {
  WarframeGuessedRow,
  type WarframeWithMatch,
} from "./WarframeGuessedRow";

interface WarframeTableProps {
  guessedWarframes: WarframeWithMatch[];
}

const warframeColumns: Column[] = [
  { key: "thumbnailUrl", label: "Imagen" },
  { key: "name", label: "Nombre" },
  { key: "sex", label: "Genero" },
  { key: "isPrime", label: "Prime" },
  { key: "type", label: "Tipo" },
  { key: "aura", label: "Aura" },
  { key: "releaseYear", label: "Año" },
];

export function WarframeTable({
  guessedWarframes,
}: WarframeTableProps) {
  if (guessedWarframes.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-4">
        Aún no has adivinado ningún Warframe.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto w-full max-w-4xl mt-5 rounded-md border-gray-700 border">
      <Table className="min-w-full">
        <TableHeader>
          <WarframeHeaderRow
            columns={warframeColumns}
          />
        </TableHeader>

        <TableBody>
          <WarframeGuessedRow
            guessedWarframes={guessedWarframes}
            columns={warframeColumns}
          ></WarframeGuessedRow>
        </TableBody>
      </Table>
    </div>
  );
}
