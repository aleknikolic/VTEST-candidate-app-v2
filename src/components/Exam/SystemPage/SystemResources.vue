<script setup lang="ts">
    import type { PageType, PageTypeExposedState, PageTypeProps } from "~/types/page";

    defineProps<PageTypeProps>();
    defineExpose<PageTypeExposedState<PageType>>({
        getStepPayload: () => ({}),
    });
</script>

<template>
    <div class="flex flex-col gap-4 items-center"></div>
</template>
