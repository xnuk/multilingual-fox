import type { Scraper } from '../models';
import { Range, fromRanges } from '../range';
import { origin } from '../utils';
import { naverQuery } from './naver';

const baseUrl = 'https://dict.naver.com/api3/zhko/search';

export const Scrap: Scraper = {
  languageTest: fromRanges([
    Range(0x4e00, 0x9fff),
    Range(0x3400, 0x4dbf),
    Range(0x20000, 0x2a6df),
    Range(0x2a700, 0x2b73f),
    Range(0x2b740, 0x2b81f),
    Range(0x2b820, 0x2ceaf),
    Range(0xf900, 0xfaff),
    Range(0x3300, 0x33ff),
    Range(0xfe30, 0xfe4f),
    Range(0xf900, 0xfaff),
    Range(0x2f800, 0x2fa1f),
  ]),
  urlOrigins: [origin(baseUrl)],
  query: naverQuery(baseUrl),
};
