//@ ts-nocheck
import {PluginOption} from "vite";
import Handlebars from 'handlebars';

export default function handlebars(): PluginOption {
    const testRegExp = /\.hbs$|\.handlebars$/;
    return {
        name: 'vite-plugin-hbs-precompile',
        transform(src, id) {
            if (!testRegExp.test(id)) {
                return;
            }

            // language=javascript
            const code = `
                import Handlebars from 'handlebars/dist/handlebars.runtime.js';

                export default Handlebars.template(${Handlebars.precompile(src)});
            `
            return {
                code
            }
        }
    }
}
