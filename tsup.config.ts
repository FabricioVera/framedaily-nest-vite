import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // Punto de entrada principal
  outDir: "dist", // Carpeta de salida
  format: ["esm", "cjs"], // Formatos a compilar
  sourcemap: true, // Generar mapas de fuente
  clean: true, // Limpia dist antes de compilar
  dts: true, // Generar archivos .d.ts (tipos)
  minify: false, // Puedes ponerlo en true para producción
  target: "node18", // Versión objetivo
});
