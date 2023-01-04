<script setup lang="ts">
    import { useThemeVars } from "naive-ui";

    const emit = defineEmits<{
        (e: "click"): void;
    }>();

    const { primaryColor } = useThemeVars().value;
</script>

<template>
    <div class="sticky-button">
        <NButton size="large" quaternary circle @click="$emit('click')">
            <template #icon>
                <NIconWrapper :color="primaryColor" :size="55" :border-radius="30">
                    <RadixAccessibilityIcon class="stroke-info" size="55" color="white" />
                </NIconWrapper>
            </template>
        </NButton>
    </div>
</template>

<style scoped>
    .sticky-button {
        position: fixed;
        top: 30%;
        right: 3%;
    }
</style>
