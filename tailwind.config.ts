import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        "neutral-light": "var(--color-neutral-light)",
        "neutral-white": "var(--color-neutral-white)",
        "neutral-black": "var(--color-neutral-black)",
        "color-primary": "var(--color-text-primary)",
        "color-secondary": "var(--color-text-secondary)",
        "color-on-primary-bg": "var(--color-text-on-primary)",
        "color-on-secondary-bg": "var(--color-text-on-secondary)",
        "background-primary": "var(--color-background-primary)",
        "background-secondary": "var(--color-background-secondary)",
        "background-accent": "var(--color-background-accent)",
        accent: "var(--color-accent)",
        success: "var(--color-success)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",
        info: "var(--color-info)",
      },
    },
  },
  plugins: [],
} satisfies Config;
