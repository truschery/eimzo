import terser from "@rollup/plugin-terser";

export default {
    input: 'src/index.js',
    output: [
        {
            file: 'dist/client.min.js',
            format: 'es',
            plugins: [
                terser({
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        pure_funcs: ['console.log'],
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

};