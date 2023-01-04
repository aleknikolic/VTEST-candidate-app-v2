<script setup lang="tsx">
    import Camera from "simple-vue-camera";
    import { useI18n } from "vue-i18n";
    import VButton from "~/elements/VButton.vue";
    import type { LocalizedContent } from "~/types/i18n";
    import { PageItem, PageType, PageTypeEmit, PageTypeExposedState } from "~/types/page";
    import { NextBtnParams } from "~/types/system";
    import CameraPicto from "~/assets/systemPages/cameraTest/camera.svg";

    const nextBtnConfig = ref<NextBtnParams>({ hidden: true });
    defineEmits<PageTypeEmit>();
    defineProps<{ pageItem: PageItem<PageType.videoTest> }>();
    defineExpose<PageTypeExposedState<PageType.videoTest>>({
        nextBtnConfig,
        getStepPayload: () => ({}),
        extraActionSlot: () => {
            if (!state.isCheckingIssue) {
                return (
                    <VButton 
                        textColor="black" 
                        type="warning" 
                        bordered 
                        round 
                        size="large" 
                        text-size="text-xl" 
                        onClick={ShowCommonIssuePage}
                    >
                        I CAN’T RECORD A VIDEO
                    </VButton>
                );
            }
            return null;
        },
        canTriggerNext: () => {
            if (state.isCheckingIssue) {
                ShowCameraPage();
                return false;
            }
            return true;
        },
    });

    const { t } = useI18n<{ message: LocalizedContent }>();
    const state = reactive({
        isTesting: false,
        isCheckingIssue: false,
    });

    const TestMyCamera = () => {
        state.isTesting = true;
        nextBtnConfig.value.hidden = false;
    };

    const StopAndShow = () => {
        state.isTesting = false;
        nextBtnConfig.value.hidden = true;
    };

    const ShowCommonIssuePage = () => {
        state.isCheckingIssue = true;
        nextBtnConfig.value.text = "Back";
        nextBtnConfig.value.hidden = false;
    };

    const ShowCameraPage = () => {
        state.isCheckingIssue = false;
        nextBtnConfig.value.text = "Next";
        if (!state.isTesting) {
            nextBtnConfig.value.hidden = true;
        }
    };
</script>

<template>
    <NEl v-if="state.isCheckingIssue" tag="div" class="border border-[3px] border-[var(--primary-color)] px-6 pt-3 pb-[60px]">
        <VText type="title-1" class="uppercase mb-2 text-center" color="primary">
            {{ t("systemPages.videoIssues.title") }}
        </VText>
        <VText type="title-2" class="text-center">
            {{ t("general.troubleshooting") }}
        </VText>
        <div class="mt-5">
            <VText type="text-regular-2">
                {{ t("systemPages.videoIssues.basicSteps") }}
            </VText>
            <ul class="list-disc ml-10">
                <li class="">
                    <VText type="text-regular-2">{{ t("systemPages.videoIssues.settingsTip") }}</VText>
                </li>
                <li class="">
                    <VText type="text-regular-2">{{ t("systemPages.videoIssues.browserTip") }}</VText>
                </li>
            </ul>
        </div>
    </NEl>
    <div v-else class="flex flex-col gap-y-10 items-center">
        <div class="text-center font-black uppercase">
            <VText type="title-1" color="primary" class="mb-2">
                {{ t("systemPages.videoCheck.title") }}
            </VText>
            <VText type="title-2">{{ t("systemPages.videoCheck.clickTestCamera") }}</VText>
        </div>
        <NEl tag="div" class="w-[326px] h-[233px] border border-[3px] border-[var(--primary-color)] flex justify-center items-center">
            <Camera v-if="state.isTesting" :resolution="{ width: 326, height: 233 }" />
            <img v-else :src="CameraPicto" alt="" />
        </NEl>
        <!-- <VButton v-if="state.isTesting" type="primary" round size="large" text-size="text-xl" @click="StopAndShow">STOP & SHOW</VButton> -->
        <VButton 
            v-if="!state.isTesting" 
            text-color="black" 
            type="primary" 
            bordered 
            round 
            size="large" 
            text-size="text-xl" 
            @click="TestMyCamera"
        >
            {{ t("systemPages.videoCheck.button") }}
        </VButton>
    </div>
</template>
