module.exports = {
    extends: ['airbnb'],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: [2, 4],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'no-unused-vars': 'warn',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'linebreak-style': 0,
        'no-use-before-define': 'warn',
        'class-methods-use-this': 'off',
        'default-param-last': 'off',
        'max-len': ['warn', {
            ignoreComments: true,
            code: 120,
        }],
        'no-param-reassign': 'off',
        'no-undef': 'off',
    },
};
