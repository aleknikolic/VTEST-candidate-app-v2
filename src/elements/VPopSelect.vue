<script setup lang="ts">
    import { SelectGroupOption, SelectOption } from "naive-ui/lib";

    withDefaults(
        defineProps<{
            modelValue?: string | number | null;
            multiple?: boolean;
            scrollable?: boolean;
            size?: "small" | "medium" | "large";
            virtualScroll?: false;
            options?: Array<SelectOption | SelectGroupOption>;
        }>(),
        {
            modelValue: null,
            multiple: false,
            scrollable: false,
            size: "medium",
            virtualScroll: false,
            options: () => [],
        },
    );

    defineEmits<{
        (e: "update:modelValue", value: string | number | Array<string | number> | null): void;
    }>();
</script>

<template>
    <n-popselect
        :multiple="multiple"
        :scrollable="scrollable"
        :size="size"
        :virtual-scroll="virtualScroll"
        :value="modelValue"
        :options="options"
        @update:value="(value: string | number | Array<string | number> | null) => $emit('update:modelValue', value)"
    >
        <slot></slot
    ></n-popselect>
</template>
