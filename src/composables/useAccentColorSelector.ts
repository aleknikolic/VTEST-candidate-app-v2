import { CustomThemeConfig } from "~/libs/theme/themeManager";
import { DefaultThemeConfig } from "~/config/themeConfig";

const appStore = useAppStore();

export function useAccentColorSelector(key: keyof CustomThemeConfig["accentColor"]) {
    const themeConfig = appStore.themeConfig || DefaultThemeConfig;
    return themeConfig.accentColor[key];
}

export function useThemeProperty(key: keyof CustomThemeConfig["common"]) {
    const themeConfig = appStore.themeConfig || DefaultThemeConfig;
    return themeConfig.common[key];
}
