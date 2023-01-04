<script setup lang="ts">
    import { useThemeVars } from "naive-ui";

    const props = withDefaults(
        defineProps<{
            dashed?: boolean;
            vertical?: boolean;
            titlePlacement?: "left" | "right" | "center";
            weight?: "thin" | "normal" | "thick";
            type: "default" | "secondary" | "primary" | "success" | "warning" | "danger";
        }>(),
        {
            dashed: false,
            vertical: false,
            titlePlacement: "center",
            weight: "thin",
        },
    );

    const themeVars = useThemeVars();

    const styles = computed(() => ({
        color:
            props.type === "default"
                ? themeVars.value.dividerColor
                : props.type === "secondary"
                ? "#ffcb38"
                : themeVars.value[`${props.type}Color` as "baseColor"],
        height: props.weight === "thin" || props.vertical ? "1px" : props.weight === "normal" ? "3px" : "6px",
    }));
</script>

<script lang="ts">
    export default {
        name: "VDivider",
        inheritAttrs: true,
    };
</script>

<template>
    <NDivider v-if="$slots.default" class="v-divider">
        <slot />
    </NDivider>

    <NDivider v-else />
</template>

<style lang="css">
    .n-divider.v-divider div.n-divider__line {
        height: v-bind("styles.height") !important;
        background-color: v-bind("styles.color") !important;
        border-radius: 1rem;
    }
</style>
