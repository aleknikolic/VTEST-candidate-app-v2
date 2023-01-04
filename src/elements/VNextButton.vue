<script setup lang="ts">
    interface Props {
        type?: "default" | "timer";
        disabled?: boolean;
        text?: string;
        hidden?: boolean;
    }

    const emit = defineEmits<{ (e: "next"): void; (e: "click"): void }>();
    withDefaults(defineProps<Props>(), {
        type: "default",
        disabled: false,
        text: "NEXT",
        hidden: false,
    });

    function TriggerAction() {
        emit("next");
        emit("click");
    }
</script>

<template>
    <VButton
        v-if="!hidden"
        :disabled="disabled"
        :round="useThemeProperty('buttonShape') === 'rounded'"
        type="primary"
        size="large"
        text-size="text-3xl"
        @click="TriggerAction"
    >
        {{ text }}
    </VButton>
</template>
