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
import {ArrowUp, ArrowDown} from 'lucide-react';

interface WarframeWithMatch extends WarframeDto {
  correct?: boolean;
  fieldMatches?: {
    name?: boolean;
    type?: boolean;
    aura?: boolean;
    releaseYear?: string;
    isPrime?: boolean;
  };
}

interface WarframeTableProps {
    guessedWarframes: WarframeWithMatch[];
}

export function WarframeTable({ guessedWarframes }: WarframeTableProps) {
    if (guessedWarframes.length === 0) {
        return (
            <p className="text-gray-400 text-center mt-4">Aún no has adivinado ningún Warframe.</p>
        );
    }

    const getCellClass = (match?: boolean) => 
      match ? "bg-teal-700 text-white" : "bg-red-800 text-white opacity-80";

    const getYearIcon = (comparison?: string) => {
      if (comparison === 'lower') return <ArrowDown className="inline-block ml-1 text-white" size={16} />;
      if (comparison === 'higher') return <ArrowUp className="inline-block ml-1 text-white" size={16} />;
      return null;
    }

    return (
        <div className="overflow-x-auto w-full max-w-4xl mt-5">
        <Table className="min-w-full border border-gray-700 rounded-xl">
            <TableHeader className="bg-gray-300">
            <TableRow>
                <TableHead className="text-center">Imagen</TableHead>
                <TableHead className="text-center">Nombre</TableHead>
                <TableHead className="text-center">Prime</TableHead>
                <TableHead className="text-center">Tipo</TableHead>
                <TableHead className="text-center">Aura</TableHead>
                <TableHead className="text-center">Año</TableHead>
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
                    <AvatarFallback className='text-black'>{"No image"}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className={`${getCellClass(w.fieldMatches?.name)} text-center`}>{w.name}</TableCell>
              <TableCell className={`${getCellClass(w.fieldMatches?.isPrime)} text-center`}>{w.isPrime ? "Sí" : "No"}</TableCell>
              <TableCell className={`${getCellClass(w.fieldMatches?.type)} text-center`}>{w.type}</TableCell>
              <TableCell className={`${getCellClass(w.fieldMatches?.aura)} text-center`}>{w.aura}</TableCell>
              <TableCell className={` 
              px-4 py-2 relative text-center 
              ${w.fieldMatches?.releaseYear === 'lower' || w.fieldMatches?.releaseYear === 'higher' ? 'bg-red-800 text-white opacity-80': ''}
              ${w.fieldMatches?.releaseYear === 'equal' ? 'bg-teal-700 text-white' : ''}
              `}>
              {w.releaseYear}
              {getYearIcon(w.fieldMatches?.releaseYear)}
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}