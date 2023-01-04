<script setup lang="ts">

    const emit = defineEmits<{ (event: "update:modelValue", value: string | null): void }>();
    const props = withDefaults(
        defineProps<{
            modelValue: boolean,
            disabled?: boolean,
            bordered?: boolean,
        }>(),
        {
            modelValue: true,
            disabled: false,
            bordered: true
        }
    )

    const value = computed({
        get: () => props.modelValue,
        set: (updated: any) => emit("update:modelValue", updated),
    });
</script>

<template>
    <NCheckbox v-model:checked="value" :class="{ 'border-1': bordered }" size="large" style="--n-size: 27px" :disabled="disabled">
        <slot></slot>
    </NCheckbox>
</template>
