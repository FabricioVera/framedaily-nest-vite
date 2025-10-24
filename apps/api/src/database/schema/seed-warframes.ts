import 'dotenv/config';
import { db } from '../../data-source';
import { warframes } from './warframes.schema';
import { abilities } from './abilities.schema';
import fs from 'fs';

async function seedWarframes() {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/json/Warframes.json`, 'utf-8'),
  );

  for (const wf of data) {
    // Insertamos el Warframe principal
    const [inserted] = await db
      .insert(warframes)
      .values({
        uniqueName: wf.uniqueName,
        name: wf.name,
        type: wf.type,
        isPrime: wf.isPrime,
        aura: wf.aura,
        releaseYear: wf.releaseDate
          ? parseInt(wf.releaseDate.split('-')[0])
          : null,
        releaseDate: wf.releaseDate,
        description: wf.description,
        health: wf.health,
        armor: wf.armor,
        shield: wf.shield,
        sprintSpeed: wf.sprintSpeed,
        polarities: wf.polarities,
        sex: wf.sex,
        imageName: wf.imageName,
        wikiUrl: wf.wikiaUrl,
        wikiaThumbnail: wf.wikiaThumbnail,
        exalted: wf.exalted || [false],
      })
      .onConflictDoNothing()
      .returning({ id: warframes.id });

    const warframeId = inserted?.id;
    if (!warframeId) continue;

    // Insertamos las habilidades si existen
    if (wf.abilities && wf.abilities.length > 0) {
      const abilityValues = wf.abilities.map((ab: any) => ({
        warframeId,
        uniqueName: ab.uniqueName,
        name: ab.name,
        description: ab.description,
        imageName: ab.imageName,
      }));

      await db.insert(abilities).values(abilityValues).onConflictDoNothing();
      console.log(
        `  ✅ Se cargaron ${abilityValues.length} habilidades para ${wf.name}.`,
      );
    }
  }
  console.log(`✅ Se cargaron ${data.length} warframes en la base de datos.`);
  process.exit(0);
}

seedWarframes().catch((err) => {
  console.error(err);
  process.exit(1);
});
