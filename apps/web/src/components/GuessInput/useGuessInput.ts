import { useState, useCallback } from "react";
import { useSuggestions } from "../../features/warframes/hooks/useSuggestions";

export interface Suggestion {
  name: string;
  wikiaThumbnail?: string;
}

export function useGuessInput(
  onGuess: (
    guess: string
  ) => void | Promise<void>,
  disabled?: boolean
) {
  const { allWarframes, loading, error } =
    useSuggestions<Suggestion[]>("warframes");
  const [inputValue, setInputValue] =
    useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [suggestions, setSuggestions] = useState<
    Suggestion[]
  >([]);
  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const [
    selectedSuggestion,
    setSelectedSuggestion,
  ] = useState(-1);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    console.log(e);
    if (
      selectedSuggestion >= suggestions.length
    ) {
      setSelectedSuggestion(-1);
      return;
    }

    if (
      e.key === "ArrowUp" &&
      selectedSuggestion >= 0
    ) {
      e.preventDefault();
      setSelectedSuggestion((prev) => prev - 1);
    } else if (
      e.key === "ArrowDown" &&
      selectedSuggestion < suggestions.length - 1
    ) {
      setSelectedSuggestion((prev) => prev + 1);
    } else if (
      e.key === "Enter" &&
      selectedSuggestion >= 0
    ) {
      setInputValue(
        suggestions[selectedSuggestion].name
      );
      setShowSuggestions(false);
      setSuggestions([]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const filtered = allWarframes.filter((wf) =>
      wf.name
        .toLowerCase()
        .includes(
          value.toLowerCase(),
          -value.length
        )
    );

    setSuggestions(filtered.slice(0, 10));
    setShowSuggestions(true);
  };

  const handleClean = () => {
    setInputValue("");
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
  };

  const handleSuggestionClick = (
    name: string
  ) => {
    setInputValue(name);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!inputValue.trim() || disabled) return;
      setIsSubmitting(true);
      try {
        await onGuess(inputValue.trim());
        setInputValue("");
      } finally {
        setIsSubmitting(false);
      }
    },
    [inputValue, onGuess, disabled]
  );

  return {
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
  };
}
