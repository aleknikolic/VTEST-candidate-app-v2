import { defineStore } from "pinia";
import { useContextMenuManager } from "~/composables/useContextMenuManager";
import { SecuritySettingsState } from "~/types/security";

export const useSecurityController = defineStore("securityController", () => {
    const settingsState = ref<SecuritySettingsState>({
        allowPause: false,
        fullscreen: false,
        photocheck: false,
        audioCheck: false,
        block: false,
    });

    function SetSettings(settings: SecuritySettingsState) {
        settingsState.value = settings;
    }

    const { UploadPhotocheck, subscribePhotocheckSnapshot } = usePhotocheckManager(settingsState);
    const { isFullscreen } = useFullscreenManager(settingsState);
    const { isWindowFocused } = useWindowFocusManager(settingsState);
    useContextMenuManager(settingsState);

    return {
        settingsState: computed(() => settingsState.value),
        isFullscreen,
        isWindowFocused,
        UploadPhotocheck,
        subscribePhotocheckSnapshot,
        SetSettings,
    };
});
