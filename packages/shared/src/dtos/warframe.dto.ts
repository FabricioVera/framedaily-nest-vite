export interface WarframeDto {
  id: number;
  wikiaThumbnail: string | null;
  name: string;
  type: string | null;
  isPrime: boolean | null;
  aura: string | null;
  releaseYear: number | null;
  description: string | null;
  health: number | null;
  armor: number | null;
  shield: number | null;
  sprintSpeed: string | null;
  releaseDate: string | null;
  imageName: string | null;
  wikiUrl: string | null;
  createdAt: Date | null;
}
