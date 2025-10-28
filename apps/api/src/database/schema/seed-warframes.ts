import 'dotenv/config';
import { db } from '../../data-source';
import { warframes } from './warframes.schema';
import { abilities } from './abilities.schema';
import fs from 'fs';
import { sql } from 'drizzle-orm';

function getBaseName(name: string): string {
  return name.replace(/\s*Prime\s*$/, '');
}

async function seedWarframes() {
  const data = JSON.parse(
    fs.readFileSync(`${__dirname}/json/Warframes.json`, 'utf-8'),
  );

  await db.delete(abilities);
  await db.delete(warframes);
  await db.execute(sql`ALTER SEQUENCE abilities_id_seq RESTART WITH 1;`);
  await db.execute(sql`ALTER SEQUENCE warframes_id_seq RESTART WITH 1;`);

  const ignoreNames = ['Helminth', 'Voidrig', 'Bonewidow'];
  const processedWarframes = new Set<string>();

  for (const wf of data) {
    // Ignorar tipos y nombres no deseados
    if (wf.type !== 'Warframe' || ignoreNames.includes(wf.name)) continue;

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
        thumbnailUrl: wf.wikiaThumbnail,
        exalted: wf.exalted || [false],
      })
      .onConflictDoNothing()
      .returning({ id: warframes.id });

    const warframeId = inserted?.id;
    if (!warframeId) continue;

    const baseName = getBaseName(wf.name);

    // Evitar duplicar habilidades entre versiones base y Prime
    if (processedWarframes.has(baseName)) {
      console.log(`⏭️  Se omitieron habilidades duplicadas de ${wf.name}.`);
      continue;
    }

    if (wf.abilities && wf.abilities.length > 0) {
      const abilityValues = wf.abilities.map((ab: any) => ({
        warframeId,
        uniqueName: ab.uniqueName,
        name: ab.name,
        description: ab.description,
        thumbnailUrl: '/img/' + ab.imageName,
      }));

      await db.insert(abilities).values(abilityValues).onConflictDoNothing();

      processedWarframes.add(baseName);

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
