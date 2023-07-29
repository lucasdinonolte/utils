import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
  input: './main.js',
  output: {
    file: './dist/bundle.js',
    format: 'esm',
  },
  plugins: [peerDepsExternal()],
}
