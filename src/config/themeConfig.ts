import { CustomThemeConfig } from "~/libs/theme/themeManager";

export const DefaultThemeConfig: CustomThemeConfig = {
    colors: {
        primary: "#319795FF",
        secondary: "#FFCB03",
    },
    common: {
        fontFamily: "Arial",
        borderRadius: "6px",
        checkboxSize: "20px",
        radioSize: "20px",
        scrollbarWidth: "5px",
        buttonShape: "rounded",
        timerShape: "rounded",
    },
    accentColor: {
        alertNotification: "primary",
        nextButton: "primary",
        leftButton: "secondary",
        formField: "primary",
        timer: "secondary",
        title: "primary",
        camera: "secondary",
        itemSubject: "primary",
        itemQuestion: "primary",
        itemAnswer: "secondary",
        systemPageContent: "primary",
    },
};
