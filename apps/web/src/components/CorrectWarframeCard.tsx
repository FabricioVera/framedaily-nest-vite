import type { WarframeDto } from "shared/src/dtos/warframe.dto";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

interface Props {
  warframe: WarframeDto;
}

export function CorrectWarframeCard({
  warframe,
}: Props) {
  return (
    <Card className="m-5 p-5 text-center bg-emerald-900">
      <CardHeader>
        <CardTitle className="text-white">
          ¡Has adivinado el Warframe del día!
        </CardTitle>
      </CardHeader>
      <CardDescription className="text-2xl font-semibold mb-3 text-green-300">
        ¡Correcto! Era {warframe.name}
      </CardDescription>
      <CardContent>
        <Avatar className="w-52 h-52 mx-auto">
          <AvatarImage
            src={
              warframe.thumbnailUrl || undefined
            }
            alt={warframe.name}
          />
          <AvatarFallback>
            {"No image"}
          </AvatarFallback>
        </Avatar>
      </CardContent>
    </Card>
  );
}
