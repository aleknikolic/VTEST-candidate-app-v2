<script setup lang="ts">
    withDefaults(
        defineProps<{
            trigger?: "hover" | "none";
            xScrollable?: boolean;
        }>(),
        {
            trigger: "hover",
            xScrollable: false,
        },
    );

    defineEmits<{
        (e: "onScroll"): void;
    }>();
</script>

<template>
    <NScrollbar :trigger="trigger" :x-scrollable="xScrollable" :on-scroll="$emit('onScroll')">
        <slot></slot>
    </NScrollbar>
</template>

