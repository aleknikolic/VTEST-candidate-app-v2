import defaultTheme from "windicss/defaultTheme";
import { defineConfig } from "windicss/helpers";

export default defineConfig({
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#008899",
                secondary: "#048B9A",
                warning: "orange",
            },
            fontFamily: {
                sans: ["Arial Black", ...defaultTheme.fontFamily.sans],
            },
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            ul: "1536px",
        },
    },
    variants: {
        scrollbar: ["rounded", "dark"],
    },
});
