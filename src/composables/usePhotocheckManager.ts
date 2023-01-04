import { serialize } from "object-to-formdata";
import { Ref } from "vue";
import { SecurityController } from "~/api/controllers/security.controller";
import { SecuritySettingsState } from "~/types/security";

export const usePhotocheckManager = (settingsState: Ref<SecuritySettingsState>) => {
    const { subscribe: subscribePhotocheckSnapshot, dispatch: dispatchPhotocheckSnapshot } = useEventDispatcher();
    const { pause: StopPhotocheck, resume: StartPhotocheck } = useIntervalFn(dispatchPhotocheckSnapshot, import.meta.env.VITE_ENV_PHOTOCHECK_SNAPSHOT_DELAY, {
        immediate: false,
    });

    watch(
        () => settingsState.value.photocheck,
        (enabled, wasEnabled) => (enabled && !wasEnabled ? StartPhotocheck() : StopPhotocheck()),
    );

    const UploadPhotocheck = (blob: Blob | null) =>
        blob && SecurityController.uploadPhotocheck(serialize({ file: new File([blob], `photocheck_${Date.now()}.jpg`, { type: "image/jpeg" }) }));

    return {
        subscribePhotocheckSnapshot,
        UploadPhotocheck,
    };
};
