import { useState } from "react";
import { GuessInput } from "../components/GuessInput/GuessInput";
import { WarframeTable } from "../components/WarframeTable/WarframeTable";
import type { WarframeDto } from "shared/src/dtos/warframe.dto";
import { CorrectWarframeCard } from "../components/CorrectWarframeCard";
import { useDailyObject } from "../features/warframes/hooks/useDailyObject";
import { useSuggestions } from "../features/warframes/hooks/useSuggestions";
import type { SuggestionItemDto } from "shared/src";
import type { WarframeWithMatch } from "../components/WarframeTable/WarframeGuessedRow";

function GuessTheWarframe() {
  const {
    all: allWarframes,
    loading: loadingSuggestions,
    error: errorSuggestions,
  } = useSuggestions("warframes");
  const {
    dailyObject: dailyWarframe,
    loading,
    error,
  } = useDailyObject<WarframeDto>("warframes");
  const [guessedWarframes, setGuessedWarframes] = useState<WarframeWithMatch[]>(
    []
  );
  const [isCorrect, setIsCorrect] = useState<boolean | undefined>(false);

  const handleGuess = async (guessName: string) => {
    if (!dailyWarframe) return;

    const response = await fetch("http://localhost:3000/warframes/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: dailyWarframe.id,
        guess: guessName,
      }),
    });

    const data: WarframeWithMatch = await response.json();

    setGuessedWarframes((prev) => [data, ...prev]);
    if (data.correct) setIsCorrect(true);
  };

  if (loading || loadingSuggestions)
    return <p className="text-gray-400">Cargando Warframe del día...</p>;
  if (error || errorSuggestions)
    return <p className="text-red-400">Error: {error}</p>;

  return (
    <main className="bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col items-center min-h-screen w-screen overflow-x-hidden m-0 p-8">
      <h1 className="text-3xl font-bold mb-6">Adivina el Warframe del Día</h1>

      {isCorrect && dailyWarframe && (
        <CorrectWarframeCard warframe={dailyWarframe} />
      )}

      <GuessInput<SuggestionItemDto>
        onGuess={handleGuess}
        disabled={isCorrect}
        allElements={allWarframes}
        guessedNames={guessedWarframes.map((wf) => wf.name)}
        placeholder="Escribe el nombre del Warframe de hoy"
      />

      <WarframeTable guessedWarframes={guessedWarframes} />
    </main>
  );
}

export default GuessTheWarframe;
