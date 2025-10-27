import type { SuggestionWarframeDto } from "shared/src/dtos/warframe.dto";

interface Props {
  suggestion: SuggestionWarframeDto;
  onSelect: (name: string) => void;
  isSelected: boolean;
}

export function SuggestionItem({
  suggestion,
  onSelect,
  isSelected,
}: Props) {
  const selectedClass = isSelected
    ? "bg-teal-700"
    : "";

  return (
    <li
      className={`flex items-center gap-3 px-4 py-2 cursor-pointer text-gray-200 hover:bg-gray-700/70 rounded-lg transition-colors ${selectedClass}`}
      onClick={() => onSelect(suggestion.name)}
    >
      {suggestion.wikiaThumbnail && (
        <img
          src={suggestion.wikiaThumbnail}
          alt={suggestion.name}
          className="w-8 h-8 object-contain rounded-md bg-gray-800 p-1"
          loading="lazy"
        />
      )}
      <span>{suggestion.name}</span>
    </li>
  );
}
