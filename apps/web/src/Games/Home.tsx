// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  ShovelIcon,
  SparklesIcon,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#00081f] text-[#f6f6f6] p-6">
      <h1 className="text-5xl font-bold mb-4 text-[#ddc57d]">
        FrameDaily
      </h1>
      <p className="text-lg text-[#c8c8c8] mb-8 text-center max-w-xl">
        Bienvenido a FrameDaily, tu juego diario
        para adivinar Warframes y sus habilidades.
        ¡Diviértete y desafía tu memoria cada día!
      </p>

      <div className="flex flex-col md:flex-row gap-6">
        <Link
          to="/warframes"
          className="flex items-center gap-2 px-6 py-3 rounded-md bg-[#131f45] hover:bg-[#145e80] text-white font-semibold transition-all"
        >
          <ShovelIcon className="w-5 h-5" />
          Jugar Warframes
        </Link>

        <Link
          to="/abilities"
          className="flex items-center gap-2 px-6 py-3 rounded-md bg-[#290a2d94] hover:bg-[#ddc57d] text-[#f6f6f6] font-semibold transition-all"
        >
          <SparklesIcon className="w-5 h-5" />
          Jugar Habilidades
        </Link>
      </div>
    </div>
  );
}
