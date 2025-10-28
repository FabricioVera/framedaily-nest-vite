import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  WarframeGuessedRow,
  type WarframeWithMatch,
} from "./WarframeGuessedRow";
import { WARFRAME_COMPARISON_CONFIG } from "shared/src";

interface WarframeTableProps {
  guessedWarframes: WarframeWithMatch[];
}

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
        <TableHeader className="bg-accent">
          <TableRow>
            {WARFRAME_COMPARISON_CONFIG.map(
              ({ key, label }) => (
                <TableHead
                  key={key}
                  className="text-center"
                >
                  {label}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>

        <TableBody>
          {guessedWarframes.map((warframe) => (
            <WarframeGuessedRow
              key={warframe.id}
              warframe={warframe}
            ></WarframeGuessedRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
