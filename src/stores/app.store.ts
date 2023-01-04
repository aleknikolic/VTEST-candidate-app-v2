import { darkTheme, enUS, GlobalTheme, GlobalThemeOverrides } from "naive-ui";
import { defineStore } from "pinia";
import { DefaultThemeConfig } from "~/config/themeConfig";
import { BuildThemeOverrides, CustomThemeConfig } from "~/libs/theme/themeManager";

export const useAppStore = defineStore("appStore", () => {
    const businessController = useBusinessController();

    const isDark = ref<boolean>(false);
    const language = ref<typeof enUS>(enUS);
    const isLoading = ref<boolean>(false);
    const isLoadingMessage = ref<string>("");

    const themeConfig = computed<CustomThemeConfig>(() => businessController.examState.themeConfig || DefaultThemeConfig);
    const mappedThemeOverrides = computed(() => BuildThemeOverrides(themeConfig.value));

    const theme = computed<GlobalTheme | null>(() => (isDark.value ? darkTheme : null));
    const themeOverrides = computed<GlobalThemeOverrides>(() => (isDark.value ? mappedThemeOverrides.value.darkTheme : mappedThemeOverrides.value.lightTheme));

    const toggleTheme = () => (isDark.value = !isDark.value);
    const startLoading = (message?: string) => {
        if (message) isLoadingMessage.value = message;
        isLoading.value = true;
    };
    const stopLoading = () => {
        isLoading.value = false;
        isLoadingMessage.value = "";
    };

    const activeLocale = ref<string>("en_US");
    const localesList = ref<string[]>(["en_US"]);

    return {
        isDark,
        language,
        isLoading,
        isLoadingMessage,
        theme,
        themeOverrides,
        themeConfig,
        toggleTheme,
        startLoading,
        stopLoading,
        activeLocale,
        localesList,
    };
});
