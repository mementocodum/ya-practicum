import { defineConfig } from 'vite'
import handlebars from "./vite-plugin-hbs-precompile.js";
import {resolve} from "path";

export default defineConfig({
    root: resolve(__dirname, 'static'),
    build: {
        outDir: resolve(__dirname, 'build'),
    },
    plugins: [handlebars()],
    server: {
        port: 3000,
    },
})
