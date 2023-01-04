<script setup lang="ts">
    withDefaults(
        defineProps<{
            type?: "default" | "horizontal";
            questionXPosition?: "start" | "end" | "center" | "baseline" | "stretch";
            questionYPosition?: "start" | "end" | "center" | "between" | "around" | "evenly";
        }>(),
        {
            type: "default",
            questionPosition: "center"
        },
    );
</script>

<template>
    <div v-if="type == 'horizontal'" class="flex gap-x-4 w-full">
        <div 
            class="flex flex-col gap-y-[35px] w-1/4"
            :class="`items-${questionXPosition} justify-${questionYPosition}`"
        >
            <slot name="question"></slot>
            <slot></slot>
        </div>
        <div class="w-3/4">
            <slot name="subject"></slot>
        </div>
    </div>
    <div v-else class="flex flex-col items-start gap-6 w-full h-full">
        <slot name="subject"></slot>
        <slot name="question"></slot>
        <slot></slot>
    </div>
</template>
