<script setup lang="ts">
    import { useI18n } from "vue-i18n";
    import type { LocalizedContent } from "~/types/i18n";
    import { PageType, PageTypeEmit, PageTypeExposedState, PageTypeProps } from "~/types/page";
    import InCameraPicto from "~/assets/systemPages/proctoringRules/in-camera.svg";
    import FaceCameraPicto from "~/assets/systemPages/proctoringRules/face-camera.svg";
    import NoFullScreenPicto from "~/assets/systemPages/proctoringRules/no-full-screen.svg";
    import NoPhonePicto from "~/assets/systemPages/proctoringRules/no-phone.svg";
    import NoSupportPicto from "~/assets/systemPages/proctoringRules/no-support.svg";
    import NoOneInRoomPicto from "~/assets/systemPages/proctoringRules/noone-in-room.svg";
    import NoSpeakingPicto from "~/assets/systemPages/proctoringRules/no-speaking.svg";
    import MicrophonePicto from "~/assets/systemPages/proctoringRules/microphone.svg";
    import CameraPicto from "~/assets/systemPages/proctoringRules/camera.svg";

    defineEmits<PageTypeEmit>();
    defineProps<PageTypeProps>();
    defineExpose<PageTypeExposedState<PageType.proctoringRequirements>>({
        getStepPayload: () => ({}),
        canTriggerNext: () => {
            if (currentSlide.value < 5) {
                currentSlide.value += 1;
                return false;
            }
            return true;
        },
    });

    const currentSlide = ref<number>(0);
    const { t } = useI18n<{ message: LocalizedContent }>();
    const steps = ref<any[]>([
        {
            index: 0,
            title: "ENSURE YOU STAY VISIBLE",
            content: "If you don’t respect this requirement your exam results may not be certified ",
            images: [
                {
                    title: "Stay in the camera’s field",
                    src: InCameraPicto,
                },
                {
                    title: "Stay facing the camera",
                    src: FaceCameraPicto,
                },
            ],
        },
        {
            index: 1,
            title: "DO NOT LEAVE THE FULL-SCREEN ",
            content: "If you don’t respect this requirement your exam results may not be certified ",
            images: [
                {
                    src: NoFullScreenPicto,
                },
            ],
        },
        {
            index: 2,
            title: "DO NOT USE ANY EXTERNAL SUPPORT ",
            content: "If you don’t respect this requirementyour exam results may not be certified ",
            images: [
                {
                    src: NoPhonePicto,
                },
                {
                    src: NoSupportPicto,
                },
            ],
        },
        {
            index: 3,
            title: "DO NOT ALLOW ANY ONE ELSE IN THE ROOM",
            content: "If you don’t respect this requirementyour exam results may not be certified ",
            images: [
                {
                    src: NoOneInRoomPicto,
                },
            ],
        },
        {
            index: 4,
            title: "DO NOT SPEAK WHEN NOT REQUIRED",
            content: "If you don’t respect this requirementyour exam results may not be certified ",
            images: [
                {
                    src: NoSpeakingPicto,
                },
            ],
        },
        {
            index: 5,
            title: "KEEP YOU CAMERA AND MICROPHONE UP AND RUNNING ",
            content: "If you don’t respect this requirementyour exam results may not be certified ",
            images: [
                {
                    src: MicrophonePicto,
                },
                {
                    src: CameraPicto,
                },
            ],
        },
    ]);
    const currentStep = computed(() => steps.value[currentSlide.value]);
</script>

<template>
    <div class="flex justify-center w-full">
        <Transition name="slide-fade-reverse" mode="out-in">
            <SlideItem
                v-if="currentSlide === 0"
                :images="[
                    { title: t('systemPages.proctoringRequirements.stayInCameraField'), src: InCameraPicto },
                    { title: t('systemPages.proctoringRequirements.stayFacingCamera'), src: FaceCameraPicto },
                ]"
                :title="t('systemPages.proctoringRequirements.stayVisible')"
                :content="t('systemPages.proctoringRequirements.stayVisibleContent')"
            >
            </SlideItem>
            <SlideItem
                v-else-if="currentSlide === 1"
                :images="[
                    {
                        src: NoFullScreenPicto,
                    },
                ]"
                :title="t('systemPages.proctoringRequirements.stayInFullscreen')"
                :content="t('systemPages.proctoringRequirements.stayInFullscreenContent')"
            >
            </SlideItem>
            <SlideItem
                v-else-if="currentSlide === 2"
                :images="[
                    {
                        src: NoPhonePicto,
                    },
                    {
                        src: NoSupportPicto,
                    },
                ]"
                :title="t('systemPages.proctoringRequirements.noExternalSupport')"
                :content="t('systemPages.proctoringRequirements.noExternalSupportContent')"
            >
            </SlideItem>
            <SlideItem
                v-else-if="currentSlide === 3"
                :images="[
                    {
                        src: NoOneInRoomPicto,
                    },
                ]"
                :title="t('systemPages.proctoringRequirements.noOneElse')"
                :content="t('systemPages.proctoringRequirements.noOneElseContent')"
            ></SlideItem>
            <SlideItem
                v-else-if="currentSlide === 4"
                :images="[
                    {
                        src: NoSpeakingPicto,
                    },
                ]"
                :title="t('systemPages.proctoringRequirements.noSpeaking')"
                :content="t('systemPages.proctoringRequirements.noSpeakingContent')"
            ></SlideItem>
            <SlideItem
                v-else-if="currentSlide === 5"
                :images="[
                    {
                        src: MicrophonePicto,
                    },
                    {
                        src: CameraPicto,
                    },
                ]"
                :title="t('systemPages.proctoringRequirements.cameraMicrophoneOn')"
                :content="t('systemPages.proctoringRequirements.cameraMicrophoneOnContent')"
            ></SlideItem>
        </Transition>
    </div>
</template>
