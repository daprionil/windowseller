/** @type {import('tailwindcss').Config} */
export default {
    content: [
        '*.{html,js,jsx}',
        '**/*.{html,js,jsx}',
        '**/**/*.{html,js,jsx}',
        '../index.html'
    ],
    theme: {
        extend: {
            backgroundColor:{
                'thirdyellow':'rgb(77, 69, 61)'
            }
        },
    },
    plugins: [],
}

