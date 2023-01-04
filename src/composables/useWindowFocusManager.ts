import { serialize } from "object-to-formdata";
import { Ref } from "vue";
import { SecurityController } from "~/api/controllers/security.controller";
import { SecuritySettingsState } from "~/types/security";

export const useWindowFocusManager = (settingsState: Ref<SecuritySettingsState>) => {
    const isWindowFocused = useWindowFocus();
    watch(
        () => isWindowFocused.value,
        (isFocused) => {
            if (isFocused || !settingsState.value.fullscreen) return;
            console.log("WARNING::SECURITY -> WINDOW HAS BEEN UNFOCUSED");
        },
    );

    return {
        isWindowFocused,
    };
};
