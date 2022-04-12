import { URL, fileURLToPath } from 'node:url';
import { writeFile, readFile } from 'node:fs/promises';

import { compileBundleOptions } from '@swc/core/spack.js';
import type { OutputConfig } from '@swc/core/spack.js';
import { bundle } from '@swc/core';
import JSZip from 'jszip';

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url));

const options = compileBundleOptions({
  mode: 'production',
  target: 'browser',
  entry: {
    index: resolve('./src/index.ts'),
    manifest: resolve('./src/manifest.ts'),
  },
  output: undefined as unknown as OutputConfig,
  module: {},

  options: {
    jsc: {
      baseUrl: resolve('./src/'),
      parser: {
        syntax: 'typescript',
        tsx: true,
        decorators: false,
        dynamicImport: false,
      },
      transform: {
        react: {
          runtime: 'automatic',
          importSource: 'jsx',
          useBuiltins: true,
        },
      },
      paths: {
        'jsx/*': ['jsx/*'],
      },
      target: 'es2021',
    },
    module: { type: 'es6', strict: true, strictMode: true, noInterop: true },
  },
});

const execute = (source: string | Buffer) =>
  import(
    'data:application/javascript;base64,' +
      Buffer.from(source).toString('base64')
  );

const main = async () => {
  const { index: indexCode, manifest: manifestCode } = await options.then(
    bundle
  );
  if (indexCode == null || manifestCode == null) return;

  const manifest = (
    (await execute(manifestCode.code)) as typeof import('./src/manifest')
  ).manifest;

  const zip = new JSZip();
  zip.file('manifest.json', JSON.stringify(manifest));
  zip.file('index.js', indexCode.code);

  for (const path of Object.values(manifest.icons)) {
    zip.file(path, await readFile(resolve('./' + path)));
  }

  const buffer = await zip.generateAsync({
    type: 'nodebuffer',
    compression: 'STORE',
  });

  await writeFile(resolve('./dist.zip'), buffer);
};
main();
