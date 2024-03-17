/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./lib/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // font families are defined here in the config
    // fonts need to be imported in the CSS tab
    fontFamily: {
      // default/main body font
      sans: ['"Open Sans"', 'sans-serif'],
      // heading font for hero titles, section titles, and RTE (Rich Text Editor) elements
      heading: ['Red Rose', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      primary: {
        DEFAULT: '#DD0021',
        50: '#fff1f2',
        100: '#ffe5e7',
        200: '#FF90A1',
        300: '#FF687E',
        400: '#FF3F5C',
        500: '#FF1639',
        600: '#DD0021',
        700: '#A50019',
        800: '#6D0010',
        900: '#350008',
        950: '#4d0514',
      },
      secondary: colors.yellow,
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    opacity: {
      0: '0',
      5: '0.05',
      10: '.1',
      15: '.15',
      20: '.2',
      25: '.25',
      30: '.3',
      35: '.35',
      40: '.4',
      45: '.45',
      50: '.5',
      55: '.55',
      60: '.6',
      65: '.65',
      70: '.7',
      75: '.75',
      80: '.8',
      85: '.85',
      90: '.9',
      95: '.95',
      100: '1',
    },

    extend: {
      maxWidth: {
        prose: '75ch',
      },
      scale: {
        flipped: '-1',
      },
      zIndex: {
        1: '1',
        100: '100',
        1000: '1000',
        10000: '10000',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            'max-width': '75ch',
            '--tw-prose-links': theme('colors.primary[700]'),
            a: {
              'font-weight': '600',
            },
            'a:hover': {
              color: theme('colors.primary[600]'),
            },
            h1: {
              'font-family': theme('fonts.heading'),
              'font-weight': '700',
            },
            h2: {
              'font-family': theme('fonts.heading'),
              'font-weight': '600',
            },
            h3: {
              'font-family': theme('fonts.heading'),
              'font-weight': '600',
            },
            h4: {
              'font-family': theme('fonts.heading'),
              'font-weight': '600',
            },
            // '--tw-prose-invert-body': theme('colors.primary[200]'),
            '--tw-prose-invert-headings': theme('colors.secondary[200]'),
            '--tw-prose-invert-lead': theme('colors.gray[50]'),
            '--tw-prose-invert-links': theme('colors.secondary[300]'),
            // '--tw-prose-invert-bold': theme('colors.white'),
            '--tw-prose-invert-counters': theme('colors.secondary[400]'),
            '--tw-prose-invert-bullets': theme('colors.primary[600]'),
            // '--tw-prose-invert-hr': theme('colors.primary[700]'),
            // '--tw-prose-invert-quotes': theme('colors.primary[100]'),
            '--tw-prose-invert-quote-borders': theme('colors.primary[700]'),
            // '--tw-prose-invert-captions': theme('colors.primary[400]'),
            // '--tw-prose-invert-code': theme('colors.white'),
            // '--tw-prose-invert-pre-code': theme('colors.primary[300]'),
            // '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            // '--tw-prose-invert-th-borders': theme('colors.primary[600]'),
            // '--tw-prose-invert-td-borders': theme('colors.primary[700]'),
          },
        },
        primary: {
          css: {
            '--tw-prose-body': theme('colors.primary[800]'),
            '--tw-prose-headings': theme('colors.primary[900]'),
            '--tw-prose-lead': theme('colors.primary[700]'),
            '--tw-prose-links': theme('colors.primary[900]'),
            '--tw-prose-bold': theme('colors.primary[900]'),
            '--tw-prose-counters': theme('colors.primary[600]'),
            '--tw-prose-bullets': theme('colors.primary[400]'),
            '--tw-prose-hr': theme('colors.primary[300]'),
            '--tw-prose-quotes': theme('colors.primary[900]'),
            '--tw-prose-quote-borders': theme('colors.primary[300]'),
            '--tw-prose-captions': theme('colors.primary[700]'),
            '--tw-prose-code': theme('colors.primary[900]'),
            '--tw-prose-pre-code': theme('colors.primary[100]'),
            '--tw-prose-pre-bg': theme('colors.primary[900]'),
            '--tw-prose-th-borders': theme('colors.primary[300]'),
            '--tw-prose-td-borders': theme('colors.primary[200]'),
          },
        },
        // custom color invert workaround
        'primary-invert': {
          css: {
            'a:hover': {
              color: theme('colors.primary[300]'),
            },
            '--tw-prose-body': theme('colors.primary[50]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.primary[50]'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.primary[200]'),
            '--tw-prose-bullets': theme('colors.primary[400]'),
            '--tw-prose-hr': theme('colors.primary[500]'),
            '--tw-prose-quotes': theme('colors.primary[100]'),
            '--tw-prose-quote-borders': theme('colors.primary[500]'),
            '--tw-prose-captions': theme('colors.primary[300]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.primary[200]'),
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-th-borders': theme('colors.primary[400]'),
            '--tw-prose-td-borders': theme('colors.primary[500]'),
          },
        },
        secondary: {
          css: {
            '--tw-prose-body': theme('colors.secondary[900]'),
            '--tw-prose-headings': theme('colors.secondary[950]'),
            '--tw-prose-lead': theme('colors.primary[600]'),
            '--tw-prose-links': theme('colors.secondary[900]'),
            '--tw-prose-bold': theme('colors.secondary[900]'),
            '--tw-prose-counters': theme('colors.secondary[600]'),
            '--tw-prose-bullets': theme('colors.secondary[400]'),
            '--tw-prose-hr': theme('colors.secondary[500]'),
            '--tw-prose-quotes': theme('colors.secondary[900]'),
            '--tw-prose-quote-borders': theme('colors.secondary[500]'),
            '--tw-prose-captions': theme('colors.secondary[700]'),
            '--tw-prose-code': theme('colors.secondary[200]'),
            '--tw-prose-pre-code': theme('colors.secondary[700]'),
            '--tw-prose-pre-bg': theme('colors.secondary[900]'),
            '--tw-prose-th-borders': theme('colors.secondary[600]'),
            '--tw-prose-td-borders': theme('colors.secondary[500]'),
          },
        },
        // custom color invert workaround
        'secondary-invert': {
          css: {
            'a:hover': {
              color: theme('colors.secondary[300]'),
            },
            '--tw-prose-body': theme('colors.secondary[100]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.secondary[300]'),
            '--tw-prose-links': theme('colors.white'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.secondary[300]'),
            '--tw-prose-bullets': theme('colors.secondary[500]'),
            '--tw-prose-hr': theme('colors.secondary[600]'),
            '--tw-prose-quotes': theme('colors.secondary[100]'),
            '--tw-prose-quote-borders': theme('colors.secondary[600]'),
            '--tw-prose-captions': theme('colors.secondary[400]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.secondary[300]'),
            '--tw-prose-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-th-borders': theme('colors.secondary[500]'),
            '--tw-prose-td-borders': theme('colors.secondary[600]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
