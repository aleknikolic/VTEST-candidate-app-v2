<script setup lang="ts">
    withDefaults(
        defineProps<{
            modelValue?: string | null;
            clearable?: boolean;
            maxLength?: number | null;
            minLength?: number | null;
            disabled?: boolean;
            placeholder?: string | null;
            size?: "tiny" | "small" | "medium" | "large";
            type?: "text" | "password" | "textarea";
        }>(),
        {
            modelValue: null,
            clearable: false,
            maxLength: null,
            minLength: null,
            disabled: false,
            placeholder: null,
            size: "medium",
            type: "text",
        },
    );

    defineEmits<{
        (e: "update:modelValue"): void;
    }>();
</script>

<template>
    <NInput
        :clearable="clearable"
        :disabled="disabled"
        :max-length="maxLength"
        :min-length="minLength"
        :placeholder="placeholder"
        :size="size"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event)"
    ></NInput>
</template>
