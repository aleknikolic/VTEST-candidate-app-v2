export const useAudioPlayer = (source: string) => {
    const audio = document.createElement("audio");
    const isPlaying = ref<boolean>(false);

    const duration = ref<number>(0);
    const currentTime = ref<number>(0);

    const Play = ({ reset } = { reset: true }) => {
        if (isPlaying.value) return;
        audio.currentTime = reset ? audio.currentTime : 0;
        audio.play();
        isPlaying.value = true;
    };
    const Pause = () => (audio.pause(), (isPlaying.value = false));
    const Reset = () => (audio.pause(), (audio.currentTime = 0), (isPlaying.value = false));

    useEventListener(audio, "play", () => (isPlaying.value = true));
    useEventListener(audio, "ended", () => {
        isPlaying.value = false;
        currentTime.value = 0;
    });
    useEventListener(audio, "timeupdate", () => (currentTime.value = audio.currentTime));

    audio.onloadedmetadata = () => (duration.value = audio.duration);
    audio.src = source;

    onUnmounted(() => {
        Pause();
        audio.remove();
    });

    return { isPlaying, duration, currentTime, Play, Pause, Reset };
};
