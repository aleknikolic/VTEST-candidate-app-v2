<template>
    <VIcon v-bind="$attrs" @click="onClick">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12 15a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z"></path>
        </svg>
    </VIcon>
</template>

<script lang="ts">
    export default {
        name: "CiDotIcon",
        inheritAttrs: true,
    };
</script>

<script setup lang="ts">
    import { useAttrs } from "vue";

    const attrs = useAttrs();

    const emitter = defineEmits<{
        (e: "click"): void;
    }>();

    function onClick(): void {
        if (!attrs.disabled && attrs.clickable) {
            emitter("click");
        }
    }
</script>
