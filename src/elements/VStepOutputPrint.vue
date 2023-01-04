<script setup lang="ts">
    import VFileReader from "./VFileReader.vue";

    withDefaults(defineProps<{ data: { [key: string]: any }; offset: number }>(), {
        data: () => ({}),
        offset: 0,
    });

    defineOptions({
        name: "VStepOutputPrint",
    });

    const IsFile = (value: any, key: any) => {
        console.log(key, value instanceof File);
        return value instanceof File;
    };
</script>

<template>
    <div class="flex flex-col gap-4 border border-dashed border-black rounded p-2" :style="{ marginLeft: `${offset * 4}px` }">
        <div v-for="(value, key) in data" :key="key" class="flex flex-col gap-2">
            <span class="font-black">{{ $filters.formatKey(key as string) }}:</span>
            <VFileReader v-if="IsFile(value, key)" :file="value" />
            <VStepOutputPrint v-else-if="typeof value === 'object'" :offset="offset + 1" :data="value" />
            <span v-else>{{ value }}</span>
        </div>
    </div>
</template>
