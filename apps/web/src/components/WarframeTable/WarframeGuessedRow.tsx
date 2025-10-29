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
import { Skeleton } from "../ui/skeleton";
import {
  WARFRAME_COMPARISON_CONFIG,
  type ComparisonResult,
} from "shared/src";

export interface WarframeWithMatch
  extends WarframeDto {
  correct?: boolean;
  fieldMatches?: Record<string, ComparisonResult>;
}

interface WarframeGuessedRowProps {
  warframe: WarframeWithMatch;
}

export function WarframeGuessedRow({
  warframe,
}: WarframeGuessedRowProps) {
  const getCellClass = (
    match?: ComparisonResult
  ) => {
    if (match === "exact")
      return "bg-teal-700 text-white";
    if (
      match === "incorrect" ||
      match === "lower" ||
      match === "higher"
    )
      return "bg-red-800 text-white opacity-80";
    if (match === "partial")
      return "bg-amber-200 text-white";
    return "";
  };

  const getYearIcon = (
    comparison?: ComparisonResult
  ) => {
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
    <TableRow className="border-t border-gray-700 hover:bg-gray-800 transition">
      {WARFRAME_COMPARISON_CONFIG.map((col) => {
        const value = (warframe as any)[col.key];
        const match =
          warframe.fieldMatches?.[
            col.key as string
          ];

        const content = (() => {
          switch (col.displayType) {
            case "image":
              return (
                <Avatar className="w-16 h-16 mx-auto">
                  <AvatarImage
                    src={value || undefined}
                    alt={warframe.name}
                  />
                  <AvatarFallback className="text-black bg-transparent">
                    {
                      <Skeleton className="rounded-full w-full h-full" />
                    }
                  </AvatarFallback>
                </Avatar>
              );
            case "boolean":
              const displayBool =
                value === true ? "Sí" : "No";
              return displayBool;
            case "array":
              return value.join(", ");
            case "year":
              return (
                <>
                  {value ?? "-"}
                  {getYearIcon(match)}
                </>
              );
            case "text":
            default:
              return value ?? "-";
          }
        })();

        const cellClass = col.isComparable
          ? getCellClass(match)
          : "";

        return (
          <TableCell
            key={col.key}
            className={`px-4 py-2 text-center ${cellClass}`}
          >
            {content}
          </TableCell>
        );
      })}
    </TableRow>
  );
}
