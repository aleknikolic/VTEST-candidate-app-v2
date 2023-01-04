<script setup lang="ts">
    import { QuestionItem } from "~/types/item";

    const props = defineProps<{
        instructions: QuestionItem["instructions"];
    }>();
</script>

<template>
    <div 
        v-if="typeof instructions === 'string'" 
        class="text-[24px] leading-[26px] font-bold" 
        v-html="instructions" 
    />
</template>
