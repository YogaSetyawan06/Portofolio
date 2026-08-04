/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "var(--black)",
        white: "var(--white)",
        gray: {
          100: "var(--gray-100)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
        },
        accent: {
          green: "var(--accent-green)",
        },
        body: "var(--text-body)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: [
          "clamp(2.5rem, 5vw, 4rem)",
          { lineHeight: "1.08", fontWeight: "800" },
        ],
        section: [
          "clamp(1.75rem, 3.5vw, 3rem)",
          { lineHeight: "1.15", fontWeight: "800" },
        ],
        "section-lg": [
          "clamp(2rem, 4vw, 3.5rem)",
          { lineHeight: "1.1", fontWeight: "800" },
        ],
        "footer-big": [
          "clamp(8rem, 18vw, 20rem)",
          { lineHeight: "0.85", fontWeight: "900" },
        ],
      },
      borderRadius: {
        pill: "99px",
        card: "14px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(0,0,0,0.06)",
        navbar: "0 2px 16px rgba(0,0,0,0.08)",
      },
      backdropBlur: {
        navbar: "12px",
      },
    },
  },
  plugins: [],
};
