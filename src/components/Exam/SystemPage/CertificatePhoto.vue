<script setup lang="tsx">
    import { useI18n } from "vue-i18n";
    import { useCustomNotification } from "~/composables/useNotification";
    import type { LocalizedContent } from "~/types/i18n";
    import { CandidatePhotoPayload, PageType, PageTypeExposedState, PageTypeProps, SystemPageErrorFlags } from "~/types/page";
    import { NextBtnParams, VCameraExposedState } from "~/types/system";

    const nextBtnConfig = ref<NextBtnParams>({ hidden: true });
    defineProps<{ props: PageTypeProps<PageType.candidatePhoto> }>();
    defineExpose<PageTypeExposedState<PageType.candidatePhoto>>({
        nextBtnConfig,
        getStepPayload: async () => ({ file: await camera.value?.cropPhoto() } as CandidatePhotoPayload),
        onSubmitError: (flags) => {
            if (flags.some((flag) => [SystemPageErrorFlags.MissingFace as string].includes(flag))) {
                useCustomNotification({
                    title: "The uploaded photo does not meet the following requirements:",
                    text: () => (
                        <ul>
                            {flags
                                .filter((flag) => [SystemPageErrorFlags.MissingFace as string].includes(flag))
                                .map((flag) => (
                                    <li>{t(`error_flags.${flag}`)}</li>
                                ))}
                        </ul>
                    ),
                });
            }
        },
    });

    const { t } = useI18n<{ message: LocalizedContent }>();
    const camera = ref<VCameraExposedState>();
    const photoTaken = ref(false);

    const TakePhoto = async () => {
        if (photoTaken.value) {
            await camera.value?.clearPhoto();
            photoTaken.value = false;
        } else {
            await camera.value?.takePhoto();
            nextBtnConfig.value.hidden = false;
            photoTaken.value = true;
        }
    };
</script>

<template>
    <div class="flex flex-col gap-y-3 items-center">
        <div class="text-center">
            <VText type="title-1" color="primary" class="uppercase mb-1">
                {{ t("systemPages.certificatePhoto.title") }}
            </VText>
            <VText type="title-2" class="mb-3">{{ t("systemPages.certificatePhoto.takePhoto") }}</VText>
            <VText type="text-regular-1" class="mb-[80px]">{{ t("systemPages.certificatePhoto.displayPhoto") }}</VText>
        </div>
        <VCamera ref="camera" :show-default-buttons="false" :resolution="{ width: 326, height: 233 }" />
        <VButton type="primary" bordered round size="large" text-size="text-xl" @click="TakePhoto">
            {{ t(photoTaken ? "general.takePhotoAgain" : "general.takePhoto") }}
        </VButton>
    </div>
</template>
