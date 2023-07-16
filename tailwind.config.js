/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
        extend: {},
    },

    /** @type {import('rippleui').Config} */
    rippleui: {
        themes: ["light"],
        removeThemes: ["dark"],
    },

    plugins: [require("rippleui")],
};
