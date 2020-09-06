import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import buble from '@rollup/plugin-buble'; // Transpile/polyfill with reasonable browser support
import typescript from 'rollup-plugin-typescript';
export default {
    input: 'src/wrapper.js', // Path relative to package.json
    output: {
        name: 'Box',
        exports: 'named',
                
        globals: {
            "vue": "vue",
            "vue-property-decorator": "vue-property-decorator",

        },

    },
    plugins: [
        typescript({
            tsconfig: false,
            importHelpers: true,
            experimentalDecorators: true,
            module: 'esnext'
          }),
        commonjs(),
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
            defaultLang: 'ts'
        }),

        buble(), // Transpile to ES5
    ],
    external: [
        "vue", 
        "vue-property-decorator",
    ],
};