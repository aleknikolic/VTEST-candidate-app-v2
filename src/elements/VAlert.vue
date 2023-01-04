<script setup lang="ts">
    import { useThemeVars } from "naive-ui";

    withDefaults(
        defineProps<{
            type: "primary" | "success" | "info" | "warning" | "error";
            closable?: boolean;
            onClose?: () => void;
        }>(),
        {
            type: "primary",
            closable: false,
            onClose: () => ({}),
        },
    );

    const themeVars = useThemeVars();
</script>

<template>
    <NEl
        tag="div"
        :class="`relative  p-4 !pr-7 rounded-[var(--border-radius)] text-white flex items-center gap-4`"
        :style="{ background: themeVars[`${type}Color`] }"
    >
        <div>
            <slot name="icon"></slot>
        </div>
        <div class="flex flex-col gap-2">
            <slot name="title"></slot>
            <slot></slot>
        </div>
        <mdi:close
            v-if="closable"
            class="absolute top-2 right-2 bg-gray-700 rounded p-0.5 bg-opacity-25 text-md hover:bg-opacity-15 transition-all ease-in-out duration-75 cursor-pointer"
            @click="onClose"
        />
    </NEl>
</template>
