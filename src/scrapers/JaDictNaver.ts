import type { Scraper } from '../models';
import { Range, fromRanges } from '../range';
import { origin } from '../utils';
import { naverQuery } from './naver';

const baseUrl = 'https://dict.naver.com/api3/jako/search';

export const Scrap: Scraper = {
  languageTest: fromRanges([
    Range(0x3000, 0x303f),
    Range(0x3040, 0x309f),
    Range(0x30a0, 0x30ff),
    Range(0xff00, 0xff9f),
    Range(0x4e00, 0x9faf),
    Range(0x3400, 0x4dbf),
  ]),
  urlOrigins: [origin(baseUrl)],
  query: naverQuery(baseUrl),
};
