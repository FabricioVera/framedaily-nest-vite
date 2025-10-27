import {
  useState,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useSuggestions } from "@/features/warframes/hooks/useSuggestions";
import type { SuggestionWarframeDto } from "shared/src/dtos/warframe.dto";
import { normalizeString } from "../../utils";

export function useGuessInput(
  onGuess: (
    guess: string
  ) => void | Promise<void>,
  guessedWarframesNames: string[],
  disabled?: boolean
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    all: allWarframes,
    loading,
    error,
  } = useSuggestions<SuggestionWarframeDto>(
    "warframes"
  );

  const [inputValue, setInputValue] =
    useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);
  const [suggestions, setSuggestions] = useState<
    SuggestionWarframeDto[]
  >([]);
  const [showSuggestions, setShowSuggestions] =
    useState(false);
  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);
  const [
    selectedSuggestion,
    setSelectedSuggestion,
  ] = useState(-1);

  // Limpiar sugerencias
  const resetSuggestions = useCallback(() => {
    setSuggestions([]);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
  }, []);

  // Seleccion de sugerencias con teclado
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedSuggestion((prev) =>
        prev <= 0
          ? suggestions.length - 1
          : prev - 1
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedSuggestion((prev) =>
        prev >= suggestions.length - 1
          ? 0
          : prev + 1
      );
    } else if (
      e.key === "Enter" &&
      selectedSuggestion >= 0
    ) {
      setInputValue(
        suggestions[selectedSuggestion].name
      );
      resetSuggestions();
    }
  };

  // Logica de cambio de input y filtro para las sugerencias
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setInputValue(value);
    setErrorMessage(null);

    if (!value.trim()) {
      resetSuggestions();
      return;
    }

    const normalizedValue =
      normalizeString(value);
    const normalizedGuessedNames =
      guessedWarframesNames.map(normalizeString);

    const filtered = allWarframes
      .filter(
        (wf) =>
          normalizeString(wf.name).includes(
            normalizedValue
          ) &&
          !normalizedGuessedNames.includes(
            normalizeString(wf.name)
          )
      )
      .slice(0, 10);

    setSuggestions(filtered);
    // Mostrar solo si existen sugerencias
    setShowSuggestions(filtered.length > 0);
    // Selecciona el primer elemento si hay sugerencias
    setSelectedSuggestion(
      filtered.length > 0 ? 0 : -1
    );
  };

  const handleSuggestionClick = (
    name: string
  ) => {
    setInputValue(name);
    resetSuggestions();
  };

  // Limpieza de input y sugerencias
  const handleClean = () => {
    setInputValue("");
    resetSuggestions();
    setErrorMessage(null);
    inputRef.current?.focus();
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const value = inputValue.trim();
      if (!value || disabled || isSubmitting)
        return;

      const normalizedValue =
        normalizeString(value);
      const normalizedGuessedNames =
        guessedWarframesNames.map(
          normalizeString
        );

      // Validar si existe ese warframe
      const match = allWarframes.find(
        (wf) =>
          normalizeString(wf.name) ===
          normalizedValue
      );
      if (!match) {
        setErrorMessage(
          "No es un Warframe válido."
        );
        return;
      }

      // Si ya fue adivinado
      const alreadyGuessed =
        normalizedGuessedNames.includes(
          normalizedValue
        );
      if (alreadyGuessed) {
        setErrorMessage(
          `${match.name} ya fue adivinado.`
        );
        return;
      }

      // enviar guess
      setIsSubmitting(true);
      try {
        await onGuess(match.name);
        setInputValue("");
        resetSuggestions();

        setTimeout(() => {
          inputRef.current?.focus();
        }, 50);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      inputValue,
      onGuess,
      disabled,
      isSubmitting,
      allWarframes,
      guessedWarframesNames,
      resetSuggestions,
    ]
  );

  const apiError =
    error || loading
      ? error
        ? "Error de API"
        : "Cargando datos..."
      : null;
  const currentErrorMessage =
    errorMessage || apiError;

  // se usa useMemo para utilizar el hook solo cuando una dependencia cambia
  return useMemo(
    () => ({
      inputRef,
      inputValue,
      isSubmitting,
      suggestions,
      showSuggestions,
      selectedSuggestion,
      errorMessage: currentErrorMessage,
      handleChange,
      handleClean,
      handleSubmit,
      handleSuggestionClick,
      handleKeyDown,
    }),
    [
      inputRef,
      inputValue,
      isSubmitting,
      suggestions,
      showSuggestions,
      selectedSuggestion,
      currentErrorMessage,
      handleChange,
      handleClean,
      handleSubmit,
      handleSuggestionClick,
      handleKeyDown,
    ]
  );
}
