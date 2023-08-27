import { defineConfig } from 'vite'
import handlebars from "./vite-plugin-hbs-precompile.js";
import {resolve} from "path";

export default defineConfig({
    build: {
        outDir: resolve(__dirname, 'dist'),
    },
    plugins: [handlebars()],
    server: {
        port: 3000,
        open: true,
    },
})
