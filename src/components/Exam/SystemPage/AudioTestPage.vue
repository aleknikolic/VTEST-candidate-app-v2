<script setup lang="tsx">
    import { useI18n } from "vue-i18n";
    import VButton from "~/elements/VButton.vue";
    import type { LocalizedContent } from "~/types/i18n";
    import { PageItem, PageType, PageTypeEmit, PageTypeExposedState } from "~/types/page";

    const nextBtnConfig = ref({});
    defineProps<{ pageItem: PageItem<PageType.audioTest> }>();
    defineEmits<{ emit: PageTypeEmit }>();
    defineExpose<PageTypeExposedState<PageType.audioTest>>({
        nextBtnConfig,
        getStepPayload: () => ({}),
        extraActionSlot: () => {
            if (isCommonIssue.value) return;
            return (
                <VButton textColor="black" type="warning" bordered round onClick={OnExtraBtn}>
                    I can't hear the audio
                </VButton>
            );
        },
        canTriggerNext: () => {
            if (isCommonIssue.value) {
                isCommonIssue.value = false;
                nextBtnConfig.value = {};
                return false;
            }
            return true;
        },
    });
    
    const isCommonIssue = ref(false);
    const { t } = useI18n<{ message: LocalizedContent }>();

    function OnExtraBtn() {
        isCommonIssue.value = true;
        nextBtnConfig.value = {
            text: "Start Again",
        };
    }
</script>

<template>
    <div class="p-b-5">
        <div class="text-center font-black">
            <VText type="title-1" color="primary" class="uppercase mb-2">
                {{ t("systemPages.audioCheck.title") }}
            </VText>
            <VText type="title-2">{{ t("systemPages.audioCheck.clickPlay") }}</VText>
        </div>
        <div class="column text-center font-bold"></div>
    </div>
    <div v-if="!isCommonIssue" class="p-2 text-center">
        <VText type="text-strong-2" color="primary" class="mb-4">
            {{ t("general.playAudio") }}
        </VText>
        <VPlayAudioButton :stroke-width="5" :icon-size="100" :audio-src="pageItem.props.audioUrl" :circle-width="100" />
    </div>
    <div v-else class="flex justify-center mt-5">
        <!-- TODO: needs to be translatable, content needs to be moved to the page itself -->
        <div class="page-content" v-html="pageItem.props.issuesContent"></div>
    </div>
</template>

<style>
    .page-content p {
        font-size: 1rem !important;
    }
    .page-content ul {
        list-style: disc;
        padding-left: 35px;
        padding-top: 15px;
    }
    .page-content ul li {
        font-size: 1rem;
    }
</style>
