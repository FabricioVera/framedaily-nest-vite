import 'dotenv/config';
import { db } from '../../data-source';
import { warframes } from './warframes.schema';
import { abilities } from './abilities.schema';
import { createReadStream } from 'fs';
import { sql } from 'drizzle-orm';

import { parser } from 'stream-json/Parser';
import { streamArray } from 'stream-json/streamers/StreamArray';

function getBaseName(name: string): string {
  return name.replace(/\s*Prime\s*$/, '');
}

async function seedWarframes() {
  console.log('Borrando datos antiguos...');
  await db.delete(abilities);
  await db.delete(warframes);
  await db.execute(sql`ALTER SEQUENCE abilities_id_seq RESTART WITH 1;`);
  await db.execute(sql`ALTER SEQUENCE warframes_id_seq RESTART WITH 1;`);
  console.log('Datos antiguos borrados.');

  const ignoreNames = ['Helminth', 'Voidrig', 'Bonewidow'];
  const processedWarframes = new Set<string>();

  console.log('Iniciando streaming del archivo JSON...');
  const stream = createReadStream(`${__dirname}/json/Warframes_final.json`)
    .pipe(parser())
    .pipe(streamArray());

  let warframeCount = 0;

  for (const chunk of stream) {
    const wf = chunk.value; // 'wf' es ahora un solo objeto Warframe del array
    warframeCount++;
    // Ignorar tipos y nombres no deseados
    if (wf.type !== 'Warframe' || ignoreNames.includes(wf.name)) continue;

    const [inserted] = await db
      .insert(warframes)
      .values({
        uniqueName: wf.uniqueName,
        name: wf.name,
        passive: wf.passive,
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
        hasExalted: wf.exalted ? true : false,
        themes: wf.themes || null,
        progenitor: wf.progenitor,
        playstyle: wf.playstyle || null,
        codexSecret: wf.codexSecret || false,
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
        cardThumbnailUrl: 'https://wiki.warframe.com/images/' + ab.cardImage,
        augments: ab.augments,
      }));

      await db.insert(abilities).values(abilityValues).onConflictDoNothing();

      processedWarframes.add(baseName);

      console.log(
        `  ✅ Se cargaron ${abilityValues.length} habilidades para ${wf.name}.`,
      );
    }
  }

  process.exit(0);
}

seedWarframes().catch((err) => {
  console.error(err);
  process.exit(1);
});
