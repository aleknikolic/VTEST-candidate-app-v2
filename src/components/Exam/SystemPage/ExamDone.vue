<script setup lang="ts">
    import { useThemeVars } from "naive-ui";
    import { useI18n } from "vue-i18n";
    import type { LocalizedContent } from "~/types/i18n";
    import type { PageType, PageTypeExposedState, PageTypeProps } from "~/types/page";
    import Illustration from "~/assets/systemPages/_shared/exam.png"

    defineExpose<PageTypeExposedState<PageType.examCompleted>>({
        getStepPayload: () => ({}),
        nextBtnConfig: {
            hidden: true,
        },
    });

    const { t } = useI18n<{ message: LocalizedContent }>();
    const themeVars = useThemeVars();
    const props = defineProps<PageTypeProps<PageType.examCompleted>>();
    const resultsAppUrl = import.meta.env.VITE_RESULTS_APP_URL;
</script>

<template>
    <div class="flex flex-col gap-4 items-center">
        <VText type="title-1" color="primary" class="uppercase">
            {{ t("systemPages.examDone.title") }}
        </VText>
        <VText type="title-2">{{ t("systemPages.examDone.resultsSoon") }}</VText>
        <template v-if="pageItem?.showResultsButton ?? true">
            <VText type="text-regular-1">{{ t("systemPages.examDone.resultsAccess") }}</VText>
            <VButton tag="a" :href="resultsAppUrl" target="_blank" type="primary" size="large" round
                ><span class="text-xl">{{ t("general.resultsButton") }}</span></VButton
            >
        </template>
        <img width="400" :src="Illustration" />
    </div>
</template>
