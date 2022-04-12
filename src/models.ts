export interface Content {
  title: string;
  part?: string;
  pronounce?: string;
  description?: string;
  example?: {
    sentence: string;
    meaning: string;
  };
}

export enum Languages {
  English,
  Chinese,
  Japanese,
  Undefined,
}

export interface Scraper {
  languageTest: (word: string) => boolean;
  urlOrigins: readonly `http${'' | 's'}://${string}`[];
  query: (word: string) => Promise<readonly Content[]>;
}
