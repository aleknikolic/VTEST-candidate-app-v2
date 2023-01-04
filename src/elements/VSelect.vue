<script setup lang="ts">
    import { SelectGroupOption, SelectOption } from "naive-ui/lib";

    withDefaults(
        defineProps<{
            modelValue?: string | number | null;
            clearable?: boolean;
            defaultValue?: string | number | null;
            disabled?: boolean;
            filterable?: boolean;
            placement?:
                | "top-start"
                | "top"
                | "top-end"
                | "right-start"
                | "right"
                | "right-end"
                | "bottom-start"
                | "bottom"
                | "bottom-end"
                | "left-start"
                | "left"
                | "left-end";
            placeholder?: string | null;
            options?: Array<SelectOption | SelectGroupOption>;
        }>(),
        {
            modelValue: null,
            clearable: false,
            defaultValue: null,
            disabled: false,
            filterable: false,
            placement: "bottom-start",
            placeholder: "Please Select",
            options: () => [],
        },
    );

    defineEmits<{
        (e: "update:modelValue", value: string | number | Array<string | number> | null): void;
    }>();
</script>

<template>
    <NSelect
        :clearable="clearable"
        :default-value="defaultValue"
        :disabled="disabled"
        :filterable="filterable"
        :placeholder="placeholder"
        :options="options"
        :value="modelValue"
        @update:value="(value: string | number | Array<string | number> | null) => $emit('update:modelValue', value)"
    ></NSelect>
</template>

