<script setup lang="ts">
    withDefaults(
        defineProps<{
            text?: string | null;
            round?: boolean;
            circle?: boolean;
            height?: string | number | null;
            width?: string | number | null;
            size?: "small" | "medium" | "large";
            repeat?: string | number;
            animated?: boolean;
            sharp?: boolean;
        }>(),
        {
            text: null,
            round: false,
            circle: false,
            height: null,
            width: null,
            size: "medium",
            repeat: 1,
            animated: true,
            sharp: true,
        },
    );
</script>

<template>
    <NSkeleton :text="text" :round="round" :circle="circle" :height="height" :width="width" :size="size"></NSkeleton>
</template>