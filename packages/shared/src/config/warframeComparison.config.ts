import type { WarframeDto } from "../dtos/warframe.dto";

export type ComparisonResult =
  | "exact"
  | "incorrect"
  | "higher"
  | "lower"
  | "boolean_match"
  | "boolean_mismatch";

export type ComparisonType =
  | "exact"
  | "year"
  | "boolean";

export interface FieldConfig<T> {
  key: keyof T;
  type: ComparisonType;
  label?: string;
  displayType?:
    | "text"
    | "boolean"
    | "year"
    | "image";
  isComparable?: boolean;
}

export const WARFRAME_COMPARISON_CONFIG: FieldConfig<WarframeDto>[] =
  [
    {
      key: "thumbnailUrl",
      type: "exact",
      label: "Imagen",
      displayType: "image",
      isComparable: false,
    },
    {
      key: "name",
      type: "exact",
      label: "Nombre",
      displayType: "text",
      isComparable: true,
    },
    {
      key: "aura",
      type: "exact",
      label: "Aura",
      displayType: "text",
      isComparable: true,
    },
    {
      key: "isPrime",
      type: "boolean",
      label: "Prime",
      displayType: "boolean",
      isComparable: true,
    },
    {
      key: "releaseYear",
      type: "year",
      label: "Año",
      displayType: "year",
      isComparable: true,
    },
    {
      key: "sex",
      type: "exact",
      label: "Sexo",
      displayType: "text",
      isComparable: true,
    },
    {
      key: "exalted",
      type: "boolean",
      label: "Exaltado",
      displayType: "boolean",
      isComparable: true,
    },
  ];
