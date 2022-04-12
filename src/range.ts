type Range = { readonly start: number; readonly end: number };

export const Range = (start: number, end: number): Range => ({ start, end });

export const charRange = (start: string, end: string): Range => ({
  start: start.codePointAt(0) || 0,
  end: end.codePointAt(0) || 0,
});

export const fromRanges = (ranges: readonly Range[]) => {
  const charTest = (char: number): boolean =>
    ranges.some(({ start, end }) => start <= char && char <= end);

  return (word: string): boolean => {
    for (const char of word) {
      if (charTest(char.codePointAt(0)!)) return true;
    }

    return false;
  };
};
