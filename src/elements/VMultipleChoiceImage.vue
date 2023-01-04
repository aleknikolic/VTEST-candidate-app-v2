<script lang="ts" setup>
    const emit = defineEmits<{ (e: "update:modelValue", value: string[] | string | null): void }>();
    const props = withDefaults(
        defineProps<{
            modelValue: string[] | string | null;
            answers: Array<{ _id: string; image?: string }>;
            multiple?: boolean;
            maxSelected?: number;
            disabledAnswers?: string[];
            disabled?: boolean;
            gridSize?: number | string;
            borderDefault?: string;
        }>(),
        {
            maxSelected: undefined,
            disabledAnswers: undefined,
            gridSize: "2 md:3 lg:5",
            borderDefault: "border-transparent",
        },
    );

    const computedGridSize = useBreakpointStyle(props.gridSize, "grid");

    const selected = computed({
        get: () => props.modelValue,
        set: (value) => emit("update:modelValue", value),
    });

    async function SelectValue(answerId: string) {
        if (props.multiple) {
            if (!Array.isArray(selected.value)) {
                selected.value = [];
                await nextTick();
            }

            if (selected.value.includes(answerId)) {
                selected.value = selected.value.filter((id: string) => id !== answerId);
            } else {
                if (typeof props.maxSelected == "number") {
                    if (selected.value.length < props.maxSelected) {
                        selected.value = [...selected.value, answerId];
                    }
                } else {
                    selected.value = [...selected.value, answerId];
                }
            }
        } else {
            selected.value = answerId;
        }
    }

    function IsSelected(value: string) {
        if (props.multiple) {
            if (!Array.isArray(selected.value)) return false;
            return selected.value.includes(value);
        } else {
            return selected.value === value;
        }
    }
</script>

<template>
    <div class="grid" :style="computedGridSize">
        <div v-for="(answer, index) of answers" :key="answer._id">
            <NEl
                tag="img"
                :src="answer.image"
                :alt="`selection-${index + 1}`"
                class="mx-auto p-2 cursor-pointer border-[10px] rounded-[15px]"
                :class="[
                    IsSelected(answer._id) ? 'border-[var(--primary-color)]' : borderDefault,
                    { '!cursor-not-allowed': disabled || disabledAnswers?.includes(answer._id) },
                ]"
                @click="!disabled && !disabledAnswers?.includes(answer._id) && SelectValue(answer._id)"
            />
        </div>
    </div>
</template>
