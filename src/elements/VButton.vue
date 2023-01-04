<script setup lang="ts">

    const emit = defineEmits<{
        (e: "click"): void;
    }>();

    const props = withDefaults(
        defineProps<{
            bordered: boolean,
            color?: string | null,
            disabled: boolean,
            round?: boolean | null,
            type: "default" | "primary" | "secondary" | "warning",
            textSize: string,
            textColor?: string | null,
            size: "tiny" | "small" | "medium" | "large",
            tag: string
        }>(),
        {
            bordered: false,
            color: null,
            disabled: false,
            round: null,
            type: "default",
            textSize: "text-base",
            textColor: "",
            size: "medium",
            tag: "button"
        }
    )

    const currentTextColor = computed(() => {
        if (props.bordered && !props.textColor) return "";
        if (props.textColor) return props.textColor;
        return "";
    });
</script>

<template>
    <NButton
        :ghost="bordered"
        :disabled="disabled"
        :type="type"
        :color="color"
        :round="round"
        :text-color="currentTextColor"
        :size="size"
        :tag="tag"
        @click="$emit('click')"
    >
        <span :class="textSize" class="uppercase font-bold">
            <slot></slot>
        </span>
        <template v-if="$slots.icon" #icon>
            <NIcon>
                <slot name="icon" />
            </NIcon>
        </template>
    </NButton>
</template>
