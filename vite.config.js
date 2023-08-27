import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from './vite-plugin-hbs-precompile.js';

export default defineConfig({
    build: {
        outDir: resolve(__dirname, 'dist'),
    },
    plugins: [handlebars()],
    server: {
        port: 3000,
        open: true,
    },
});
