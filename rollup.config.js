import del from 'rollup-plugin-delete'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

export default [
  {
    input: 'src/index.js',
    output: [
      { file: pkg.module, format: 'es' },
      { file: pkg.main, format: 'cjs' },
      {
        name: 'dadaWatermark',
        file: pkg.iife,
        format: 'iife',
      },
    ],
    plugins: [
      del({ targets: 'dist/*' }),
      resolve(),
      commonjs(),
      babel({
        runtimeHelpers: true,
      }),
      terser(),
    ]
  },
]
