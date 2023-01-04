<template>
    <NImage :width="width" :height="height" :src="src" :disable-preview="preview ? false : true" />
</template>

<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            height: number,
            src: string,
            width: number,
            preview: boolean
        }>(),
        {
            height: 30,
            src: '',
            width: 30,
            preview: false
        }
    )
</script>
