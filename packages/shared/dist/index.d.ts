interface WarframeDto {
    id: number;
    uniqueName: string | null;
    name: string;
    type: string | null;
    isPrime: boolean | null;
    aura: string | null;
    releaseYear: number | null;
    description: string | null;
    health: number | null;
    armor: number | null;
    shield: number | null;
    sprintSpeed: string | null;
    releaseDate: string | null;
    polarities: string[] | null;
    sex: string | null;
    imageName: string | null;
    thumbnailUrl: string | null;
    wikiUrl: string | null;
    exalted: string[] | null;
    createdAt: Date | null;
}

interface SuggestionItemDto {
    name: string;
    thumbnailUrl?: string;
}

interface AbilitiesDto {
    id: number;
    uniqueName: string;
    name: string;
    description: string | null;
    imageName: string | null;
}

type ComparisonResult = "exact" | "incorrect" | "higher" | "lower" | "boolean_match" | "boolean_mismatch";
type ComparisonType = "exact" | "year" | "boolean";
interface FieldConfig<T> {
    key: keyof T;
    type: ComparisonType;
    label?: string;
    displayType?: "text" | "boolean" | "year" | "image";
    isComparable?: boolean;
}
declare const WARFRAME_COMPARISON_CONFIG: FieldConfig<WarframeDto>[];

export { type AbilitiesDto, type ComparisonResult, type ComparisonType, type FieldConfig, type SuggestionItemDto, WARFRAME_COMPARISON_CONFIG, type WarframeDto };
