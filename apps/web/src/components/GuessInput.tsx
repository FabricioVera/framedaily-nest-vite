import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";

interface GuessInputProps {
  onGuess: (guess: string) => void | Promise<void>;
  disabled?: boolean;
}

export function GuessInput({ onGuess, disabled }: GuessInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 bg-gray-900/40 backdrop-blur-md p-5 rounded-2xl shadow-md border border-gray-700">
        <Input
          type="text"
          value={inputValue}
          disabled={disabled || isSubmitting}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe el nombre del Warframe..."
          required
        />
        <Button type="submit" disabled={disabled || isSubmitting}>
          {isSubmitting ? "Comprobando..." : "Adivinar"}
        </Button>
      </form>
    </div>
  );
}
