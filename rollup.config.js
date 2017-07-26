import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';

export default {
    entry: 'src/Form',
    format: 'umd',
    moduleName: 'jslidate',
    dest: 'dist/jslidate.js',
    plugins: [
      globals(),
      builtins(),
    ],
};
