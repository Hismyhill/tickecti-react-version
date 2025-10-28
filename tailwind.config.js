import sharedConfig from "../shared-assets/tailwind.config.js";

/** @type {import('@tailwindcss/vite').Config} */
export default {
  ...sharedConfig,
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      ...sharedConfig.theme.extend,
      zIndex: {
        9999: "9999",
      },
      // React-specific animation overrides
      animation: {
        ...sharedConfig.theme.extend.animation,
        "modal-fade-in": "modalFadeIn 0.2s ease-out",
        "modal-slide-in": "modalSlideIn 0.3s ease-out",
      },
      keyframes: {
        ...sharedConfig.theme.extend.keyframes,
        modalFadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        modalSlideIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.95) translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
      },
    },
  },
};
