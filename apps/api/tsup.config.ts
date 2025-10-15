import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts', 'src/data-source.ts'], // Añadimos data-source al build
  splitting: false,
  sourcemap: true,
  clean: true,
  format: ['cjs'],
  target: 'es2021',
  noExternal: ['ts-node', 'tsconfig-paths'], // Importante para TypeORM CLI
});
