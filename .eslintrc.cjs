module.exports = {
    parser: "vue-eslint-parser",
    parserOptions: {
        parser: "@typescript-eslint/parser",
    },

    extends: [
        "@nuxtjs/eslint-config-typescript",
        "plugin:prettier/recommended",
    ],

    rules: {
        "prettier/prettier": [
            "error",
            {
                singleQuote: false,
                useTabs: false,
                tabWidth: 4,
            },
        ],
    },
};
