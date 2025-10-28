import {
  TableRow,
  TableCell,
} from "@/components/ui/table";
import type { WarframeDto } from "shared/src/dtos/warframe.dto";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { Column } from "./WarframeHeaderRow";

export interface WarframeWithMatch
  extends WarframeDto {
  correct?: boolean;
  fieldMatches?: {
    name?: boolean;
    type?: boolean;
    aura?: boolean;
    releaseYear?: string;
    isPrime?: boolean;
  };
}

interface WarframeGuessedRowProps {
  guessedWarframes: WarframeWithMatch[];
  columns: Column[];
}

export function WarframeGuessedRow({
  guessedWarframes,
  columns,
}: WarframeGuessedRowProps) {
  const getCellClass = (
    match?: boolean | string
  ) => {
    if (match === true || match === "equal")
      return "bg-teal-700 text-white";
    if (
      match === false ||
      match === "lower" ||
      match === "higher"
    )
      return "bg-red-800 text-white opacity-80";
    return "";
  };

  const getYearIcon = (comparison?: string) => {
    if (comparison === "lower")
      return (
        <ArrowDown
          className="inline-block ml-1 text-white"
          size={16}
        />
      );
    if (comparison === "higher")
      return (
        <ArrowUp
          className="inline-block ml-1 text-white"
          size={16}
        />
      );
    return null;
  };
  return (
    <>
      {guessedWarframes.map((w) => (
        <TableRow
          key={w.id}
          className="border-t border-gray-700 hover:bg-gray-800 transition"
        >
          <TableCell className="px-4 py-2">
            <Avatar className="w-16 h-16 mx-auto">
              <AvatarImage
                src={w.thumbnailUrl || undefined}
                alt={w.name}
              />
              <AvatarFallback className="text-black">
                {"No image"}
              </AvatarFallback>
            </Avatar>
          </TableCell>
          {columns
            .filter(
              (col) => col.key !== "thumbnailUrl"
            )
            .map((col) => {
              const match = (
                w.fieldMatches as any
              )?.[col.key];
              const value = (w as any)[col.key];

              const displayValue =
                col.key === "isPrime"
                  ? value
                    ? "Sí"
                    : "No"
                  : value ?? "-";
              return (
                <TableCell
                  key={col.key}
                  className={`px-4 py-2 text-center ${getCellClass(
                    match
                  )}`}
                >
                  {displayValue}
                  {col.key === "releaseYear" &&
                    getYearIcon(match)}
                </TableCell>
              );
            })}
        </TableRow>
      ))}
    </>
  );
}
