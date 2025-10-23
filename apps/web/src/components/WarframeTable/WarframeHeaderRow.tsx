import { TableHead, TableRow } from "@/components/ui/table";
import type { WarframeDto } from "shared/src/dtos/warframe.dto";

export type Column = {
  key: keyof WarframeDto;
  label: string;
};

interface WarframeHeaderRowProps {
  columns: Column[];
}

export function WarframeHeaderRow({ columns }: WarframeHeaderRowProps) {
    return (
        <TableRow>
            {columns.map((col) => (
                <TableHead key={col.key} className="text-center">
                {col.label}
                </TableHead>
            ))}
        </TableRow>
    )
}