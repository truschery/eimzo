import terser from "@rollup/plugin-terser";
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'lib/index.ts',
    output: [
        {
            file: 'dist/client.min.js',
            format: 'es',
            plugins: [
                terser({
                    compress: {
                        drop_console: false,
                        drop_debugger: false,
                        // pure_funcs: ['console.log'],
                        passes: 2
                    },
                    mangle: {
                        toplevel: true,
                        keep_fnames: false,
                    },
                    format: {
                        comments: true
                    }
                })
            ]
        }
    ],
    plugins: [
        typescript({
            tsconfig: './tsconfig.json'
        })
    ],
    external: [
        '@truschery/eimzo-api'
    ]

};