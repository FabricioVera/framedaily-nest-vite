import type { WarframeDto } from 'shared';
import { WARFRAME_COMPARISON_CONFIG, ComparisonResult } from 'shared';

export function compareWarframes(
  guessed: WarframeDto,
  actual: WarframeDto,
): Record<string, ComparisonResult> {
  const fieldMatches: Record<string, ComparisonResult> = {};

  for (const { key, type } of WARFRAME_COMPARISON_CONFIG) {
    const guessedValue = guessed[key];
    const actualValue = actual[key];

    if (guessedValue === undefined || actualValue === undefined) continue;

    switch (type) {
      case 'year':
        fieldMatches[key as string] = compareYears(guessedValue, actualValue);
        break;
      case 'boolean':
        fieldMatches[key as string] =
          guessedValue === actualValue ? 'exact' : 'incorrect';
        break;
      case 'exact':
      default:
        fieldMatches[key as string] =
          normalize(guessedValue) === normalize(actualValue)
            ? 'exact'
            : 'incorrect';
        break;
    }
  }

  return fieldMatches;
}

function normalize(value: unknown): string {
  return value?.toString().trim().toLowerCase() ?? '';
}

function compareYears(a: unknown, b: unknown): ComparisonResult {
  if (typeof a !== 'number' || typeof b !== 'number') return 'incorrect';
  if (a === b) return 'exact';
  return a < b ? 'higher' : 'lower';
}
