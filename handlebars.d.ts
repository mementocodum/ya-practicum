declare module "*.hbs" {
    import { TemplateDelegate } from 'handlebars';

    declare const template: TemplateDelegate;


    export default template;
}

declare module '*.svg' {
    const value: string;
    export default value;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}


declare module '*.module.scss';
