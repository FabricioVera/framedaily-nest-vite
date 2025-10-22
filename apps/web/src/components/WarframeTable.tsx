import type { WarframeDto } from 'shared/src/dtos/warframe.dto';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
        <Table className="min-w-full border border-gray-700 rounded-xl overflow-hidden">
            <TableHeader className="bg-gray-800">
            <TableRow>
                <TableHead className="px-4 py-2 text-center">Imagen</TableHead>
                <TableHead className="px-4 py-2 text-center">Nombre</TableHead>
                <TableHead className="px-4 py-2 text-center">Prime</TableHead>
                <TableHead className="px-4 py-2 text-center">Tipo</TableHead>
                <TableHead className="px-4 py-2 text-center">Aura</TableHead>
                <TableHead className="px-4 py-2 text-center">Año</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
          {guessedWarframes.map((w) => (
            <TableRow
              key={w.id}
              className="border-t border-gray-700 hover:bg-gray-800 transition"
            >
              <TableCell className="px-4 py-2">
                <Avatar className='w-16 h-16 mx-auto'> 
                    <AvatarImage src={w.wikiaThumbnail || undefined} alt={w.name} />
                    <AvatarFallback>{"No image"}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="px-4 py-2">{w.name}</TableCell>
              <TableCell className="px-4 py-2">{w.isPrime ? "Sí" : "No"}</TableCell>
              <TableCell className="px-4 py-2">{w.type}</TableCell>
              <TableCell className="px-4 py-2">{w.aura}</TableCell>
              <TableCell className="px-4 py-2">{w.releaseYear}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}