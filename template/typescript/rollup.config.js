import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import postcss from 'rollup-plugin-postcss';
import atImport from 'postcss-import';
import cssvariables from 'postcss-css-variables';
import nested from 'postcss-nested';
import external from 'rollup-plugin-peer-deps-external';

import pkg from './package.json';

export default {
  input: './src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    resolve(),
    commonjs(),
    postcss({
      extract: true,
      plugins: [atImport(), nested(), cssvariables()]
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    })
  ]
};
