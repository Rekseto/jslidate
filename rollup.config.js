import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
    entry: 'src/DataTraffic.js',
    format: 'umd',
    moduleName: 'DataTraffic',
    dest: 'app/static/datatraffic.js',
    plugins: [
      globals(),
      builtins(),
    ],
};
