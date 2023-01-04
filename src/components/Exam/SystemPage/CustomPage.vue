<script setup lang="ts">
    import { useThemeVars } from "naive-ui";
    import type { PageType, PageTypeEmit, PageTypeExposedState, PageTypeProps } from "~/types/page";

    const themeVars = useThemeVars();
    const props = defineProps<PageTypeProps>();
    const emit = defineEmits<PageTypeEmit>();

    defineExpose<PageTypeExposedState<PageType.customPage>>({
        getStepPayload: () => ({}),
    });
</script>

<template>
    <NScrollbar
        class="max-h-[450px] h-full px-6 py-4 renderedContent"
        :style="{ borderRadius: themeVars.borderRadius, border: `2px solid ${themeVars.primaryColor}` }"
    >
        <div v-html="pageItem.content" />
    </NScrollbar>
</template>

<style>
    .renderedContent > h1 {
        padding: 0;
        margin: 0;
    }
</style>
