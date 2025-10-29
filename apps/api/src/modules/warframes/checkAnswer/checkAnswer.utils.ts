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

    console.log(type);
    switch (type) {
      case 'year':
        fieldMatches[key as string] = compareYears(guessedValue, actualValue);
        break;
      case 'boolean':
        fieldMatches[key as string] =
          guessedValue === actualValue ? 'exact' : 'incorrect';
        break;
      case 'array':
        if (!Array.isArray(guessedValue) || !Array.isArray(actualValue)) {
          fieldMatches[key as string] = 'incorrect';
          break;
        }
        let matchesCount = 0;
        for (const item of guessedValue) {
          if (actualValue.includes(item)) {
            matchesCount++;
          }
        }
        fieldMatches[key as string] = 'incorrect';

        if (matchesCount > 0) {
          fieldMatches[key as string] = 'partial';
          console.log('partial');
          if (matchesCount === actualValue.length) {
            fieldMatches[key as string] = 'exact';
            console.log('exact');
          }
        }
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
