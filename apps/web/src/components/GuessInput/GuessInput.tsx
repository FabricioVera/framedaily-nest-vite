import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useGuessInput } from "./useGuessInput";
import { SuggestionList } from "./SuggestionList";
import type { SuggestionItemDto } from "shared/src";

interface GuessInputProps<
  T extends SuggestionItemDto
> {
  onGuess: (
    guess: string
  ) => void | Promise<void>;
  disabled?: boolean;
  allElements: T[];
  guessedNames: string[];
  placeholder: string;
}

export function GuessInput<
  T extends SuggestionItemDto
>({
  onGuess,
  disabled,
  allElements,
  guessedNames,
  placeholder,
}: GuessInputProps<T>) {
  const {
    inputRef,
    inputValue,
    isSubmitting,
    suggestions,
    showSuggestions,
    selectedSuggestion,
    errorMessage,
    handleChange,
    handleClean,
    handleSubmit,
    handleSuggestionClick,
    handleKeyDown,
  } = useGuessInput(
    onGuess,
    allElements,
    guessedNames,
    disabled
  );

  const isDisabled = disabled || isSubmitting;

  return (
    <div className="w-full max-w-md relative">
      {errorMessage && (
        <p className="text-red-400 text-sm mb-2 p-2">
          {errorMessage}
        </p>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-row items-center gap-3 bg-gray-900/40 backdrop-blur-md p-5 rounded-2xl shadow-md border border-gray-700"
      >
        <Input
          ref={inputRef}
          type="text"
          value={inputValue}
          autoComplete="off"
          disabled={isDisabled}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
        {inputValue !== "" && (
          <X
            onClick={handleClean}
            aria-label="Clear input"
          />
        )}
        <Button
          type="submit"
          disabled={isDisabled || !inputValue}
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
