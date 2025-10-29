export interface WarframeDto {
  id: number;
  uniqueName: string | null;
  name: string;
  passive: string | null;
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
  polarities: string[] | null;
  sex: string | null;
  imageName: string | null;
  thumbnailUrl: string | null;
  wikiUrl: string | null;
  exalted: string[] | null;
  hasExalted: boolean | null;
  themes: string[] | null;
  progenitor: string | null;
  playstyle: string[] | null;
  codexSecret: boolean | null;
  createdAt: Date | null;
}
