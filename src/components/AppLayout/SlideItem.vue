<script setup lang="ts">
    withDefaults(
        defineProps<{
            title: string;
            content: string;
            images: Array<{ title?: string; src: string }>;
        }>(),
        {
            images: () => [],
        }, 
    );
</script>

<template>
    <div class="flex flex-col gap-[55px] items-center w-full lg:w-1/2">
        <div class="text-center">
            <VText type="title-1" class="mb-2 uppercase" color="primary">
                {{ title }}
            </VText>
            <VText type="title-2">
                {{ content }}
            </VText>
        </div>
        <div class="flex w-full justify-around">
            <div v-for="(image, index) in images" :key="index" class="flex flex-col items-center gap-y-[15px]">
                <img :src="image.src" />
                <VText type="text-regular-4" class="text-center">{{ image.title }}</VText>
            </div>
        </div>
    </div>
</template>