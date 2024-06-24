/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary : '#38908F',
                lagoon: '#B2EBE0',
                hippie: '#5E96AE',
                melon: '#FFBFA3',
                copper: '#E08963',
            },
        },
    },
    plugins: [],
}
