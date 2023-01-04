<script setup lang="ts">
    withDefaults(
        defineProps<{
            modelValue?: string | null;
            rows: number;
            maxlength?: number | null;
            minlength?: number | null;
            disabled?: boolean;
            placeholder?: string | null;
            size?: "tiny" | "small" | "medium" | "large";
            readonly?: boolean;
            status?: "success" | "warning" | "error";
            showCount?: boolean;
            maxWords?: number | null;
            maxWordsOverflowAllowed?: boolean;
        }>(),
        {
            modelValue: null,
            rows: 5,
            clearable: false,
            maxlength: null,
            minlength: null,
            disabled: false,
            placeholder: null,
            size: "medium",
            readonly: false,
            status: "success",
            showCount: true,
            maxWords: null,
            maxWordsOverflowAllowed: true,
        },
    );

    defineEmits<{
        (e: "update:modelValue", value: string): void;
        (e: "onBlur"): void;
        (e: "onChange", value: string): void;
        (e: "onFocus"): void;
        (e: "onUpdate", value: string): void;
    }>();

    const WordCount = (value: string): number => {
        return value.split(" ").filter(function (w) {
            return w != "";
        }).length;
    };
</script>

<template>
    <NInput
        type="textarea"
        :rows="rows"
        :disabled="disabled"
        :maxlength="maxlength"
        :minlength="minlength"
        :placeholder="placeholder"
        :size="size"
        :show-count="showCount"
        :input-props="{ 'data-gramm': false, 'data-gramm_editor': false, 'data-enable-grammarly': false }"
        :allow-input="(value: string) => (maxWords && WordCount(value) <= maxWords) || maxWordsOverflowAllowed"
        :readonly="readonly"
        :status="status"
        :value="modelValue"
        @input="$emit('update:modelValue', $event)"
        @update:value="$emit('onUpdate')"
        @blur="$emit('onBlur')"
        @change="$emit('onChange')"
        @focus="$emit('onFocus')"
        @update="$emit('onUpdate')"
        @copy.prevent
        @paste.prevent
        @click.right.prevent
    >
        <template #count="{ value }">
            <p :class="{ 'text-warning': maxWords && WordCount(value) > maxWords }">{{ WordCount(value) }} / {{ maxWords }}</p>
        </template>
    </NInput>
</template>
