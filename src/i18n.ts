import { createI18n } from "vue-i18n";
import { en_US } from "./config/i18n/en_US";
import type { LocalizedContent } from "./types/i18n";

interface OptionsI18n {
    legacy: boolean;
    locale: string;
    messages: { [localeKey: string]: LocalizedContent };
}

const i18n = createI18n<OptionsI18n, "en_US">({
    locale: "en_US",
    messages: {
        en_US,
    },
    allowComposition: true,
});

export default i18n;
