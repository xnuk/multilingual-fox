import { transformFile } from '@swc/core';
import { writeFile } from 'node:fs/promises';

const [path, out] = process.argv.slice(2);
if (path != null && out != null) {
  transformFile(path, {
    jsc: {
      target: 'es2021',
    },
  }).then((v) => writeFile(out, v.code));
}
