<template>
    <root />
</template>

<script setup lang="ts">
    import { PropType, h, computed, defineAsyncComponent } from "vue";

    const props = defineProps({
        name: {
            type: String as PropType<string>,
            default: "",
        },
    });

    const iconComponent = computed(() => defineAsyncComponent(() => import(`../Icons/${props.name}Icon/${props.name}Icon.vue`)));

    const root = h(iconComponent.value);
</script>
