<template>
    <NIcon :size="size" :depth="disabled ? '5' : '1'" :color="currColor" :class="{ 'cursor-pointer': clickable, 'cursor-not-allowed': disabled }">
        <slot></slot>
    </NIcon>
</template>

<script setup lang="ts">
    import { PropType } from "vue";
    import { useThemeVars } from "naive-ui";

    const theme = useThemeVars().value;

    const props = defineProps({
        color: {
            type: String as PropType<string>,
            default: "",
        },
        clickable: {
            type: Boolean as PropType<boolean>,
            default: false,
            required: false,
        },
        disabled: {
            type: Boolean as PropType<boolean>,
            default: false,
            required: false,
        },
        size: {
            type: String as PropType<string | number>,
            default: "30",
        },
    });

    const currColor = computed((): string => {
        if (!theme[`${props.color}Color`]) return props.color;
        return theme[`${props.color}Color`];
    });
</script>
