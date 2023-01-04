
<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            bordered?: boolean,
        }>(),
        {
            bordered: false,
        }
    )
</script>

<template>
    <NList :bordered="bordered">
        <slot></slot>
    </NList>
</template>
