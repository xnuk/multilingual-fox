import { Scrap as EndicNaver } from './scrapers/EndicNaver';
import { Scrap as ZhDictNaver } from './scrapers/ZhDictNaver';
import { Scrap as JaDictNaver } from './scrapers/JaDictNaver';
import type { Scraper } from './models';

const scrapers: readonly Scraper[] = [EndicNaver, ZhDictNaver, JaDictNaver];

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
