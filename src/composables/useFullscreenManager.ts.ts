import { Ref } from "vue";
import { SecurityController } from "~/api/controllers/security.controller";
import router from "~/router";
import { SecuritySettingsState } from "~/types/security";

export const useFullscreenManager = (settingsState: Ref<SecuritySettingsState>) => {
    const { isFullscreen, enter: enterFullscreen, exit: exitFullscreen } = useFullscreen();

    watch(
        () => settingsState.value.fullscreen,
        (fullscreen) => (fullscreen && !isFullscreen.value ? enterFullscreen() : exitFullscreen()),
    );

    useEventListener(document, "fullscreenchange", async (e) => {
        if (!isFullscreen.value && settingsState.value.fullscreen) {
            const businessController = useBusinessController();

            SecurityController.declareInfraction("fullscreen");
            router.push({ name: "exam.exitFullscreen" });
            businessController.EndSession();
        }
    });

    return { isFullscreen };
};
