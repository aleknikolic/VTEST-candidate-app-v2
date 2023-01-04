<script setup lang="ts">
    const props = defineProps<{ file: File }>();

    const mediaType = computed<"audio" | "video" | "image">(() => {
        const audioFileExt = ["mp3", "wav", "ogg", "flac", "aac", "wma", "m4a", "aiff", "au", "raw", "amr", "wv", "mka"];
        const videoFileExt = ["mp4", "webm", "mkv", "flv", "vob", "ogv", "ogg", "mng", "avi", "mov", "qt", "wmv", "yuv", "rm", "rmvb", "asf", "amv", "m4p"];
        const imageFileExt = ["jpg", "jpeg", "png", "gif", "webp", "tiff", "psd", "raw", "bmp", "heif", "indd", "svg", "ai", "eps", "pdf"];

        const ext = props.file.name.split(".").pop()?.toLowerCase();
        if (ext && audioFileExt.includes(ext)) return "audio";
        if (ext && videoFileExt.includes(ext)) return "video";
        if (ext && imageFileExt.includes(ext)) return "image";
        return "image";
    });

    const fileDataUrl = ref<string>();

    function FileToBlobUrl(file: File): Promise<string> {
        // MUST RETURN A URL lile blob://...
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    }

    onMounted(async () => (fileDataUrl.value = await FileToBlobUrl(props.file)));
</script>

<template>
    <template v-if="!fileDataUrl">
        <VSpinner />
    </template>

    <template v-else>
        <img v-if="mediaType === 'image'" height="50" :src="fileDataUrl" />
        <video v-else-if="mediaType === 'video'" height="50" controls :src="fileDataUrl" />
        <audio v-else-if="mediaType === 'audio'" height="50" controls :src="fileDataUrl" />
    </template>
</template>
