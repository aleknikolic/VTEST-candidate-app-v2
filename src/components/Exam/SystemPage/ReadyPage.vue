<script setup lang="ts">
    import { useI18n } from "vue-i18n";
    import type { LocalizedContent } from "~/types/i18n";
    import { PageType, PageTypeEmit, PageTypeExposedState, PageTypeProps } from "~/types/page";
    import stayCenteredPicto from "~/assets/systemPages/_shared/exam.png"

    const props = defineProps<PageTypeProps<PageType.beginExam>>();
    defineEmits<PageTypeEmit>();
    defineExpose<PageTypeExposedState<PageType.beginExam>>({
        getStepPayload: () => ({}),
    });

    const { t } = useI18n<{ message: LocalizedContent }>();
</script>

<template>
    <div class="space-y-5">
        <div class="column text-center space-y-2">
            <VText type="title-1" class="uppercase" color="primary">
                {{ t("systemPages.ready.title") }}
            </VText>
            <VText type="title-2">{{ t("systemPages.ready.faceCenter") }}</VText>
            <VText type="text-regular-3">{{ t("systemPages.ready.followRules") }}</VText>
        </div>
        <div class="flex justify-center">
            <VImage :width="520" :src="stayCenteredPicto" />
        </div>
    </div>
</template>

<style scoped></style>
