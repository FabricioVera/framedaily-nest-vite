import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useGuessInput } from "./useGuessInput";
import { SuggestionList } from "./SuggestionList";

interface GuessInputProps {
  onGuess: (
    guess: string
  ) => void | Promise<void>;
  disabled?: boolean;
}

export function GuessInput({
  onGuess,
  disabled,
}: GuessInputProps) {
  const {
    inputValue,
    isSubmitting,
    suggestions,
    showSuggestions,
    selectedSuggestion,
    handleChange,
    handleClean,
    handleSubmit,
    handleSuggestionClick,
    handleKeyDown,
  } = useGuessInput(onGuess, disabled);

  return (
    <div className="w-full max-w-md relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center gap-3 bg-gray-900/40 backdrop-blur-md p-5 rounded-2xl shadow-md border border-gray-700"
      >
        <Input
          type="text"
          value={inputValue}
          autoComplete="off"
          disabled={disabled || isSubmitting}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Escribe el nombre del Warframe..."
        />
        {inputValue !== "" ? (
          <X onClick={handleClean} />
        ) : null}
        <Button
          type="submit"
          disabled={disabled || isSubmitting}
        >
          {isSubmitting
            ? "Comprobando..."
            : "Adivinar"}
        </Button>
      </form>
      <SuggestionList
        show={showSuggestions}
        suggestions={suggestions}
        selectedSuggestion={selectedSuggestion}
        onSelect={handleSuggestionClick}
      />
    </div>
  );
}
