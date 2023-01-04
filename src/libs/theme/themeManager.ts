import { deepmerge } from "deepmerge-ts";
import tinycolor from "tinycolor2";

export interface CustomThemeConfig {
    colors: { [key: string]: string };
    common: {
        fontFamily: string;
        borderRadius: `${number}px`;
        checkboxSize: `${number}px`;
        radioSize: `${number}px`;
        scrollbarWidth: `${number}px`;
        buttonShape: "rounded" | "square";
        timerShape: "rounded" | "square";
    };
    accentColor: {
        alertNotification: string;
        nextButton: string;
        leftButton: string;
        formField: string;
        timer: string;
        title: string;
        camera: string;
        itemSubject: string;
        itemQuestion: string;
        itemAnswer: string;
        systemPageContent: string;
    };
}

export function BuildColorSet(color: string) {
    return [
        color, // main
        tinycolor(color).lighten(10).desaturate(15).toString(), // hover
        tinycolor(color).darken(5).desaturate(10).toString(), // pressed
        tinycolor(color).lighten(10).desaturate(15).toString(), // suppl
    ];
}

export function BuildThemeOverrides(themeConfig: CustomThemeConfig, primaryColorSource = "primary") {
    const [primaryColor, primaryColorHover, primaryColorPressed, primaryColorSuppl] = BuildColorSet(
        themeConfig.colors?.[primaryColorSource] ?? themeConfig.colors.primary,
    );

    const _default = {
        common: {
            primaryColor,
            primaryColorHover,
            primaryColorPressed,
            primaryColorSuppl,
            scrollbarWidth: themeConfig.common.scrollbarWidth,
            fontFamily: themeConfig.common.fontFamily,
            borderRadius: themeConfig.common.borderRadius,
            heightTiny: "26px",
            heightSmall: "32px",
            heightMedium: "38px",
            heightLarge: "44px",
            heightHuge: "50px",
        },
        DataTable: { borderRadius: themeConfig.common.borderRadius },
        TableHeader: { borderRadius: themeConfig.common.borderRadius },
        Alert: { padding: "5px 8px" },
        Tag: { borderRadius: themeConfig.common.borderRadius },
        Checkbox: { sizeLarge: themeConfig.common.checkboxSize },
        Radio: { radioSizeLarge: themeConfig.common.radioSize },
    };

    const _light = { common: { bodyColor: "#f7f7f7" } };

    const _dark = {
        common: {
            bodyColor: "rgba(29, 30, 39, 1)",
            cardColor: "rgba(40, 41, 54, 1)",
            modalColor: "rgba(40, 41, 54, 1)",
            popoverColor: "rgba(41, 41, 54, 1)",
        },
        Input: { color: "rgba(62, 64, 83, 1)" },
        InternalSelection: { color: "rgba(62, 64, 83, 1)" },
        ColorPicker: { color: "rgba(62, 64, 83, 1)" },
        Slider: { fillColor: "rgba(185, 38, 180, 1)" },
        Card: { colorEmbedded: "rgba(49, 51, 65, 1)" },
    };

    return {
        darkTheme: deepmerge(_default, _dark),
        lightTheme: deepmerge(_default, _light),
    };
}
