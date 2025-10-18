import 'dotenv/config';
import { db } from '../../data-source';
import { warframes } from './warframes.schema';
import fs from 'fs';

async function seedWarframes() {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/warframes.json`, 'utf-8'),
  );

  const values = data.map((wf) => ({
    wikiaThumbnail: wf.wikiaThumbnail,
    name: wf.name,
    type: wf.type,
    aura: wf.aura,
    releaseYear: wf.releaseYear,
    description: wf.description,
    health: wf.health,
    armor: wf.armor,
    shield: wf.shield,
    sprintSpeed: wf.sprintSpeed,
    isPrime: wf.isPrime,
    releaseDate: wf.releaseDate,
    imageName: wf.imageName,
    wikiUrl: wf.wikiaUrl,
  }));

  await db.insert(warframes).values(values).onConflictDoNothing();

  console.log(`✅ Se cargaron ${values.length} warframes en la base de datos.`);
  process.exit(0);
}

seedWarframes().catch((err) => {
  console.error(err);
  process.exit(1);
});
