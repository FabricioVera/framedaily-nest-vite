export interface Character {
  id: number;
  name: string;
  gender: 'Hombre' | 'Mujer';
  aura: string;
  image: string;
}

export const characters: Character[] = [
  {
    id: 1,
    name: 'Excalibur',
    gender: 'Hombre',
    aura: 'Madurai',
    image: 'https://i.imgur.com/abc123.jpg',
  },
  {
    id: 2,
    name: 'Ash',
    gender: 'Hombre',
    aura: 'Madurai',
    image: 'https://i.imgur.com/xyz456.jpg',
  },
  {
    id: 3,
    name: 'Protea',
    gender: 'Mujer',
    aura: 'Omni',
    image: 'https://i.imgur.com/def789.jpg',
  },
];
