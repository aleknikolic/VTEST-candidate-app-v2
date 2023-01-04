<script setup lang="ts">
    import { NCheckboxGroup, NRadioGroup, NCheckbox, NRadio } from "naive-ui";

    const emit = defineEmits<{ (e: "update:modelValue", value: any): void }>();
    const props = withDefaults(
        defineProps<{
            modelValue: any;
            options: Array<{ label?: string; image?: string; value: any }>;
            multiple?: boolean;
            display?: "grid" | "list";
            gridSize?: number;
            displayInput?: boolean;
        }>(),
        {
            display: "list",
            multiple: false,
            gridSize: 4,
            displayInput: true,
        },
    );

    const groupKey = uuid();
    const selected = computed({
        get: () => props.modelValue,
        set: (value) => emit("update:modelValue", value),
    });

    async function SelectValue(value: any) {
        if (props.multiple) {
            if (!Array.isArray(selected.value)) {
                selected.value = [];
                await nextTick();
            }
            if (selected.value.includes(value)) selected.value = selected.value.filter((x: any) => x !== value);
            else selected.value = [...selected.value, value];
        } else {
            selected.value = value;
        }
    }

    function isSelected(value: any) {
        if (props.multiple) {
            if (!Array.isArray(selected.value)) return false;
            return selected.value.includes(value);
        } else {
            return selected.value === value;
        }
    }
</script>

<template>
    <Component :is="multiple ? NCheckboxGroup : NRadioGroup" v-model:value="selected" :name="groupKey">
        <div
            class="w-full grid-cols-6"
            :style="
                display === 'grid'
                    ? { display: 'grid', 'grid-template-columns': `repeat(${gridSize}, minmax(0, 1fr)), gap: '1.25em` }
                    : { display: 'flex', flexDirection: 'column', gap: '0.75em' }
            "
        >
            <NEl
                v-for="(option, index) in options"
                :key="index"
                tag="div"
                class="flex !w-full items-start gap-3 cursor-pointer rounded-[var(--border-radius)] border rounder-[var(--border-radius)] bg-white p-4 transition-all duration-200 ease-in-out hover:bg-gray-50"
                :style="{ borderColor: isSelected(option.value) ? 'var(--primary-color)' : 'var(--border-color)' }"
                @click="SelectValue(option.value)"
            >
                <Component :is="multiple ? NCheckbox : NRadio" :class="{ hidden: !displayInput }" size="large" :value="option.value" />
                <VText type="text-regular-1">{{ option.label }}</VText>
            </NEl>
        </div>
    </Component>
</template>
