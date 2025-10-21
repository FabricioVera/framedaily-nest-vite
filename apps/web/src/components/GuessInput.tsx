import { useState } from "react";

interface GuessInputProps {
  onGuess: (guess: string) => void;
  disabled?: boolean;
}

export function GuessInput({ onGuess, disabled }: GuessInputProps) {
    const [inputValue, setInputValue] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGuess(inputValue);
        setInputValue("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex gap-3 mb-8 w-full max-w-md justify-center"
        >
            <input
                type="text"
                value={inputValue}
                disabled={disabled}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe el nombre del Warframe..."
                className="grow p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                disabled={disabled}
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
            Adivinar
            </button>
        </form>
    );
}
