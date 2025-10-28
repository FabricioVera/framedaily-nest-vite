import { useState } from "react";
import { useDailyObject } from "../features/warframes/hooks/useDailyObject";
import type { AbilitiesDto } from "shared/src/dtos/abilities.dto";
import { useSuggestions } from "../features/warframes/hooks/useSuggestions";
import type { SuggestionItemDto } from "shared/src";
import { GuessInput } from "../components/GuessInput/GuessInput";

function GuessAbilityByPicture() {
  const {
    all: allAbilities,
    loading: loadingSuggestions,
    error: errorSuggestions,
  } = useSuggestions("abilities");
  const [guessedWarframes, setGuessedWarframes] =
    useState<
      (AbilitiesDto & { correct?: boolean })[]
    >([]);
  const [isCorrect, setIsCorrect] = useState<
    boolean | undefined
  >(false);
  const {
    dailyObject: dailyAbility,
    loading,
    error,
  } = useDailyObject<AbilitiesDto>("abilities");

  const handleGuess = async (
    guessName: string
  ) => {
    if (!dailyAbility) return;

    const response = await fetch(
      "http://localhost:3000/warframes/guess",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: dailyAbility.id,
          guess: guessName,
        }),
      }
    );

    const data: AbilitiesDto & {
      correct?: boolean;
    } = await response.json();
    setGuessedWarframes((prev) => [
      data,
      ...prev,
    ]);
    if (data.correct) setIsCorrect(true);
  };

  return (
    <div>
      <GuessInput<SuggestionItemDto>
        onGuess={handleGuess}
        disabled={isCorrect}
        allElements={allAbilities}
        guessedNames={guessedWarframes.map(
          (wf) => wf.name
        )}
        placeholder="Escribe el nombre del Warframe de hoy"
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {dailyAbility && (
        <div>
          <h2>
            Daily Ability: {dailyAbility.name}
          </h2>
          <p>{dailyAbility.description}</p>
        </div>
      )}
    </div>
  );
}

export default GuessAbilityByPicture;
