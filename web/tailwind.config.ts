import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'black1': '#181C24',
        'blue1': '#11306F',
        'purple1': '#6B46E6',
        'pink1': '#E55D7D',
        'yellow1': '#E7A856',
        'white1': '#FDFCFC',
        'red1': '#F44336'
        },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};
export default config;
