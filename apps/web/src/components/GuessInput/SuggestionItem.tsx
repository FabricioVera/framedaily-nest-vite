import type { Suggestion } from "./useGuessInput";

interface Props {
  suggestion: Suggestion;
  onSelect: (name: string) => void;
  className: string;
}

export function SuggestionItem({
  suggestion,
  onSelect,
  className,
}: Props) {
  return (
    <li
      className={`flex items-center gap-3 px-4 py-2 cursor-pointer text-gray-200 hover:bg-gray-700/70 rounded-lg transition-colors ${className}`}
      onClick={() => onSelect(suggestion.name)}
    >
      {suggestion.wikiaThumbnail && (
        <img
          src={suggestion.wikiaThumbnail}
          alt={suggestion.name}
          className="w-8 h-8 object-contain rounded-md bg-gray-800 p-1"
        />
      )}
      <span>{suggestion.name}</span>
    </li>
  );
}
