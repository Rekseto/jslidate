import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import eslint from 'rollup-plugin-eslint';
import eslintrc from './.eslintrc.json';

export default {
    name: 'JSLidate',
    input: 'src/Form',
    output: {
        file: 'dist/jslidate.js',
        format: 'umd',
    },
    plugins: [
        globals(),
        builtins(),
        eslint(eslintrc),
    ],
};
