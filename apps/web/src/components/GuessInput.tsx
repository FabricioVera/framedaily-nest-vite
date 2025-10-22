import { useState } from "react";
import { Button } from "./ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";


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
        <div className="w-full max-w-md">
            <form onSubmit={handleSubmit}>   
                <Field orientation="horizontal">
                    <Input
                        type="text"
                        value={inputValue}
                        disabled={disabled}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Escribe el nombre del Warframe..."
                        required
                    />
                    <Button
                        type="submit"
                        disabled={disabled}
                    >
                    Adivinar
                    </Button>
                </Field>
            </form>
        </div>
    );
}
