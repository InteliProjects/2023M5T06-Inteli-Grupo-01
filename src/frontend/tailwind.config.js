/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            height: {
                '240': '240px',
            },
            colors: {
                inteli: {
                    orange: '#FF922B',
                    blue: '#124AED',
                },
                lightBlue: '#8C8895',
                gray: '#5E586B',
                lightGreen: '#14A695',
                green: '#035A50',
                blackGreen: '#05432E',
                yellow: '#C9851E',
                lightPurple: '#A183E3',
                purple: '#2E2640',
                blackPurple: '#161220',
                white: '#F2F2F2',
                lightGray: '#cbcdd1',
                red: '#FF4545',
                danger: '#9B111E',
            },
            fontFamily: {
                inteli: ['Poppins', 'sans-serif'],
            },
            backgroundColor: {
                'inteli-orange': 'var(--inteli-orange)',
                'inteli-blue': 'var(--inteli-blue)',
            },
        },
    },
    plugins: [],
};

