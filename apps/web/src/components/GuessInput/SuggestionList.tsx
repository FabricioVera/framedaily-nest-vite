import { SuggestionItem } from "./SuggestionItem";
import type { SuggestionItemDto } from "shared/src/index";

interface Props {
  show: boolean;
  suggestions: SuggestionItemDto[];
  selectedSuggestion: number;
  onSelect: (name: string) => void;
}

export function SuggestionList({
  show,
  suggestions,
  selectedSuggestion,
  onSelect,
}: Props) {
  if (!show || suggestions.length === 0)
    return null;

  return (
    <ul className="absolute left-0 right-0 mt-2 bg-gray-900/95 border border-gray-700 rounded-xl shadow-lg backdrop-blur-md z-50 max-h-64 overflow-y-auto">
      {suggestions.map((s, i) => (
        <SuggestionItem
          key={s.name}
          suggestion={s}
          onSelect={onSelect}
          isSelected={selectedSuggestion === i}
        />
      ))}
    </ul>
  );
}
