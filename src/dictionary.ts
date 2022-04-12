import { Scrap as EndicNaver } from './scrapers/EndicNaver';
import type { Scraper } from './models';

// const chineseRegex =
//   /[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;
// const japaneseRegex =
//   /[\u3000-\u303f]|[\u3040-\u309f]|[\u30a0-\u30ff]|[\uff00-\uff9f]|[\u4e00-\u9faf]|[\u3400-\u4dbf]/;
//

const scrapers: readonly Scraper[] = [EndicNaver];

const findScraper = (
  scrapers: readonly Scraper[],
  word: string
): Scraper | null =>
  scrapers.find(({ languageTest }) => languageTest(word)) || null;

export const query = (word: string) => {
  const scraper = findScraper(scrapers, word);
  return scraper == null ? null : scraper.query(word);
};

export const origins = scrapers.map((v) => v.urlOrigins).flat();
