<script setup lang="ts">
    import Camera from "simple-vue-camera";
    import { onMounted, ref, watch } from "vue";
    import VuePictureCropper, { cropper } from "vue-picture-cropper";
    import { VCameraExposedState } from "~/types/system";

    interface Resolution {
        width: number;
        height: number;
    }

    // eslint-disable-next-line no-undef
    const emit = defineEmits(["update:modelValue"]);

    const props = withDefaults(
        defineProps<{
            modelValue: string,
            enableCropper: boolean,
            resolution: Resolution,
            showDefaultButtons: boolean
        }>(),
        {
            modelValue: '',
            enableCropper: true,
            resolution: () => ({ width: 300, height: 300 }),
            showDefaultButtons: true
        }
    )

    const hasValidCameraDevice = ref(true);
    const isCameraLoaded = ref<boolean>(false);
    const camera = ref<InstanceType<typeof Camera>>();

    const rawPhoto = ref<string>("");
    const croppedPhoto = ref<string>("");

    const Clear = () => {
        rawPhoto.value = "";
        croppedPhoto.value = "";
    };

    const TakeSnapshot = () =>
        // eslint-disable-next-line no-async-promise-executor
        new Promise<File>(async (resolve) => {
            const blob = await camera.value?.snapshot();
            blob && resolve(new File([blob as Blob], "filename"));
            const reader = new FileReader();
            reader.readAsDataURL(blob as Blob);
            reader.onloadend = () => {
                const base64data = reader.result as string;
                const base64Image = base64data.split(",")[1];
                rawPhoto.value = `data:image/jpeg;base64,${base64Image}`;
                isCameraLoaded.value = false;
            };
        });

    const CropPhoto = () =>
        new Promise<File>((resolve) => {
            croppedPhoto.value = cropper.getDataURL();
            resolve(cropper.getFile());
        });

    if (!props.enableCropper)
        watch(
            () => rawPhoto.value,
            (value) => emit("update:modelValue", value),
        );
    else
        watch(
            () => croppedPhoto.value,
            (value) => emit("update:modelValue", value),
        );

    onMounted(() => {
        if (props.modelValue) {
            rawPhoto.value = props.modelValue;
            croppedPhoto.value = props.modelValue;
        }
        navigator.mediaDevices.enumerateDevices().then((devices) => {
            hasValidCameraDevice.value = devices.some((device) => device.kind === "videoinput");
        });
    });

    defineExpose<VCameraExposedState>({
        takePhoto: TakeSnapshot,
        cropPhoto: CropPhoto,
        clearPhoto: Clear,
    });
</script>

<template>
    <div>
        <NEl
            tag="div"
            :style="{
                height: `${resolution.height}px`,
                width: !rawPhoto && isCameraLoaded ? `auto` : `${resolution.width}px`,
                border: '4px solid var(--primary-color)',
                borderRadius: '4px',
                overflow: 'hidden',
            }"
        >
            <div v-if="!isCameraLoaded && hasValidCameraDevice && !rawPhoto" class="h-full w-full grid place-items-center">
                <NSpin />
            </div>

            <Camera v-if="!rawPhoto" ref="camera" :resolution="resolution" autoplay @started="isCameraLoaded = true"></Camera>

            <VuePictureCropper
                v-if="enableCropper && rawPhoto && !croppedPhoto"
                :box-style="{ width: `${resolution.width - 8}px`, height: `${resolution.height - 8}px` }"
                :img="rawPhoto"
                :options="{
                    zoomable: false,
                }"
            />

            <img v-if="croppedPhoto || (rawPhoto && !enableCropper)" :src="croppedPhoto" class="w-full h-full" />
        </NEl>

        <NResult
            v-if="!hasValidCameraDevice"
            status="error"
            title="Error"
            description="No camera available. Please check that you have a working camera on your device."
        />

        <div v-if="showDefaultButtons" class="flex gap-2 mt-2">
            <NButton v-if="!croppedPhoto || !rawPhoto" style="width: calc(50% - 0.25rem)" secondary :disabled="!croppedPhoto && !rawPhoto" @click="Clear">
                <template #icon>
                    <NIcon><mdi-trash /></NIcon>
                </template>
                CLEAR
            </NButton>
            <NButton v-if="!rawPhoto" style="width: calc(50% - 0.25rem)" secondary @click="TakeSnapshot">
                <template #icon>
                    <NIcon><mdi-camera /></NIcon>
                </template>
                TAKE PHOTO
            </NButton>
            <NButton v-if="enableCropper && rawPhoto && !croppedPhoto" style="width: calc(50% - 0.25rem)" secondary @click="CropPhoto">
                <template #icon
                    ><NIcon><ic:baseline-save /></NIcon
                ></template>
                SAVE
            </NButton>
            <NButton v-if="croppedPhoto || (rawPhoto && !enableCropper)" class="w-full" secondary @click="Clear">
                <template #icon
                    ><NIcon><mdi-trash /></NIcon
                ></template>
                RESET
            </NButton>
        </div>
    </div>
</template>
