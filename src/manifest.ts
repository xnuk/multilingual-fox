import { origins } from './dictionary';

export const manifest = {
  manifest_version: 2,
  name: 'Multilingual Fox',
  version: '0.4.0',
  description: 'A simple dictionary extension for firefox',
  icons: {
    '48': 'icons/icon-48.png',
    '64': 'icons/icon-64.png',
    '96': 'icons/icon-96.png',
    '128': 'icons/icon-128.png',
  },

  permissions: origins
    .map((path) => path + '/*')
    .sort()
    .filter((curr, index, arr) => arr[index - 1] !== curr),

  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['index.js'],
    },
  ],
} as const;
