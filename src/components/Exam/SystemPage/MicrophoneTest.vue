<script setup lang="tsx">
    import { defineProps } from "vue";
    import { useI18n } from "vue-i18n";
    import type { LocalizedContent } from "~/types/i18n";
    import { PageType, PageTypeEmit, PageTypeExposedState, PageTypeProps } from "~/types/page";

    defineProps<{ props: PageTypeProps<PageType.microphoneTest> }>();
    defineEmits<{ emit: PageTypeEmit }>();
    defineExpose<PageTypeExposedState<PageType.microphoneTest>>({
        nextBtnConfig: {
            text: "SPEAK",
        },
        getStepPayload: () => ({}),
        extraActionSlot: () => <div></div>,
        // canTriggerNext: () => {
        //     if (recording.value) return false;
        //     recording.value = !recording.value;
        //     return false;
        // },
    });

    const { t } = useI18n<{ message: LocalizedContent }>();
    const recording = ref<boolean>(false);
</script>

<template>
    <div class="column text-center">
        <VText type="title-1" class="uppercase" color="primary">
            {{ t("systemPages.microphoneCheck.title") }}
        </VText>
        <VText type="title-2">{{ t("systemPages.microphoneCheck.subtitle") }}</VText>
        <VText type="text-strong-3" class="my-[80px]">
            {{ t("systemPages.microphoneCheck.greeting") }}
        </VText>
    </div>
</template>

<style scoped></style>
