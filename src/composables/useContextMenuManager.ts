import { Ref } from "vue";
import { SecuritySettingsState } from "~/types/security";

export const useContextMenuManager = (settingsState: Ref<SecuritySettingsState>) => {
    useEventListener(document, "contextmenu", (e) => {
        settingsState.value.fullscreen && e.preventDefault();
    });

    useEventListener(document, "cut", (e) => {
        settingsState.value.fullscreen && e.preventDefault();
    });

    useEventListener(document, "copy", (e) => {
        settingsState.value.fullscreen && e.preventDefault();
    });

    useEventListener(document, "paste", (e) => {
        settingsState.value.fullscreen && e.preventDefault();
    });
};
