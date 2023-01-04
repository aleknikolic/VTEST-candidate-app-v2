<script setup lang="ts">
    import { useAudioPlayer } from "~/composables/useAudioPlayer";
    import { useThemeVars } from "naive-ui";

    const props = withDefaults(
        defineProps<{
            audioSrc: string;
            strokeWidth: number;
            circleWidth: number;
            iconSize: number;
            maxReplays?: number;
        }>(),
        {
            audioSrc: "",
            strokeWidth: 10,
            circleWidth: 45,
            iconSize: 35,
            maxReplays: 0,
        },
    );

    const nbReplays = ref<number>(0);
    const nbReplaysLeft = computed(() => props.maxReplays - nbReplays.value);

    defineExpose({
        nbReplaysLeft,
    });

    const themeVars = useThemeVars();
    const { duration, currentTime, isPlaying, Play } = useAudioPlayer(props.audioSrc);

    function StartPlaying() {
        if ((props.maxReplays > 0 && nbReplaysLeft.value <= 0) || isPlaying.value) return;
        nbReplays.value = nbReplays.value + 1;
        Play();
    }
</script>

<template>
    <NProgress
        class="audio-progress"
        type="circle"
        :color="themeVars.primaryColor"
        :percentage="isPlaying ? (currentTime / duration) * 100 : 100"
        :stroke-width="strokeWidth"
        :style="`--audio-circle-size: ${circleWidth}px`"
    >
        <div
            class="w-8 flex items-center justify-center"
            :class="{ 'cursor-pointer': !isPlaying && nbReplaysLeft > 0, 'cursor-not-allowed !important': isPlaying || nbReplaysLeft <= 0 }"
            @click="StartPlaying"
        >
            <VIcon color="primary" :size="iconSize">
                <material-symbols:play-arrow />
            </VIcon>
        </div>
    </NProgress>
</template>

<style lang="css" scoped>
    .audio-progress.n-progress {
        width: var(--audio-circle-size);
    }
</style>
