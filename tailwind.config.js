module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#D2E9FD',
          200: '#A6D1FB',
          300: '#78B2F5',
          400: '#5695EC',
          500: '#226BE0',
          600: '#1852C0',
          700: '#1149A1',
          800: '#0A2A81',
          900: '#061D6B',
        },
        secondary: {
          100: '#D3FCFD',
          200: '#A9F4FC',
          300: '#7CE2F6',
          400: '#5ACCED',
          500: '#28ABE2',
          600: '#1D86C2',
          700: '#1465A2',
          800: '#0C4883',
          900: '#07336C',
        },
        success: {
          100: '#E9FBD3',
          200: '#CFF8A9',
          300: '#A9EB7B',
          400: '#83D858',
          500: '#50BF28',
          600: '#37A41D',
          700: '#228914',
          800: '#126E0C',
          900: '#075B08',
        },
        info: {
          100: '#F9E0FD',
          200: '#F1C2FC',
          300: '#E1A1F8',
          400: '#D088F2',
          500: '#b662ea',
          600: '#8F47C9',
          700: '#6C31A8',
          800: '#4C1F87',
          900: '#361270',
        },
        warning: {
          100: '#FFF9CD',
          200: '#FFF29B',
          300: '#FFE96A',
          400: '#FFE045',
          500: '#FFD107',
          600: '#DBAF05',
          700: '#B78F03',
          800: '#937002',
          900: '#7A5A01',
        },
        danger: {
          100: '#FFEBD3',
          200: '#FFD2A8',
          300: '#FFB37C',
          400: '#FF955C',
          500: '#FF6326',
          600: '#DB441B',
          700: '#B72A13',
          800: '#93160C',
          900: '#7A0807',
        },
      },
      backgroundImage: (theme) => ({
        mobile: "url('./src/assets/mobile.png')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
