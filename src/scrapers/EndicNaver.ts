import type { Scraper } from '../models';
import { charRange, fromRanges } from '../range';
import { origin } from '../utils';

const baseUrl = 'https://dict.naver.com/api3/enko/search';

type ResponseData =
  | typeof import('../samples/en.1.json')
  | typeof import('../samples/en.2.json')
  | typeof import('../samples/en.3.json');

const query: Scraper['query'] = async (word) => {
  const url = baseUrl + '?' + new URLSearchParams({ query: word }).toString();
  const data: ResponseData = await fetch(url).then((v) => v.json());

  const listMap = data.searchResultMap.searchResultListMap;

  return listMap.WORD.items.flatMap((item) => {
    const title = item.expEntry;

    const pronounce = item.searchPhoneticSymbolList
      .map(({ symbolType, symbolValue }) => {
        if (symbolValue == null) return null;
        if (symbolType == null) return `[${symbolValue}]`;
        return `${symbolType} [${symbolValue}]`;
      })
      .filter((v): v is Exclude<typeof v, null> => v != null)
      .join(' / ');

    return item.meansCollector.flatMap((item) => {
      const part = item.partOfSpeech || undefined;

      return item.means.map((mean) => {
        const description = mean.value;
        const sentence = mean.exampleOri;
        const meaning = mean.exampleTrans;
        const example =
          sentence != null && meaning != null
            ? { sentence, meaning }
            : undefined;

        return { title, part, pronounce, description, example };
      });
    });
  });
};

export const Scrap: Scraper = {
  languageTest: fromRanges([charRange('A', 'Z'), charRange('a', 'z')]),
  urlOrigins: [origin(baseUrl)],
  query,
};
