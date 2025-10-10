import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{astro,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
