import type { Scraper } from '../models';
import { charRange, fromRanges } from '../range';
import { origin } from '../utils';
import { naverQuery } from './naver';

const baseUrl = 'https://dict.naver.com/api3/enko/search';

export const Scrap: Scraper = {
  languageTest: fromRanges([charRange('A', 'Z'), charRange('a', 'z')]),
  urlOrigins: [origin(baseUrl)],
  query: naverQuery(baseUrl),
};
