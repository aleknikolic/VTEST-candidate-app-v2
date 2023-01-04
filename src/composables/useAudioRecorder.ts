// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Recorder } from "~/libs/opusRecorder/";

function MergeUint8Arrays(...arrays: any[]) {
    const totalLength = arrays.reduce((acc, arr) => acc + arr.length, 0);
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const arr of arrays) {
        result.set(arr, offset);
        offset += arr.length;
    }
    return result;
}

function Uint8arrayOggAudioToFile(buffer: Uint8Array) {
    const audioBlob = new Blob([buffer], { type: "audio/ogg" });
    return new File([audioBlob], "file.ogg", { type: "audio/ogg" });
}

export function useAudioRecorder() {
    const recorder = ref<any>(null);
    const audioBuffer = ref<Uint8Array>(new Uint8Array([]));
    const audioContent = computed(() => (recorder.value && audioBuffer.value.length ? Uint8arrayOggAudioToFile(audioBuffer.value) : null));
    const isRecording = ref<boolean>(false);
    const { counter: duration, pause: stopDurationTrack, resume: startDurationTrack } = useInterval(1000, { controls: true, immediate: false });

    async function instanciateRecorder() {
        recorder.value = new Recorder({
            //encoderPath: '/encoders/encoderWorker.asm.min.js',
            encoderPath: "/encoders/encoderWorker.min.js",
            encoderApplication: 2048,
            bufferLength: 4096,
            streamPages: true,
            encoderSampleRate: 16000,
            encoderFrameSize: 20,
            numberOfChannels: 1,
        });

        recorder.value.ondataavailable = (buffer: Uint8Array) => (audioBuffer.value = MergeUint8Arrays(audioBuffer.value, buffer));
    }

    async function startRecording() {
        console.log("startRecording");
        audioBuffer.value = new Uint8Array();
        await instanciateRecorder();
        await recorder.value.start();
        isRecording.value = true;
        startDurationTrack();
    }

    function stopRecording() {
        isRecording.value = false;
        recorder.value.stop();
        stopDurationTrack();
    }

    return { duration, audioBuffer, audioContent, isRecording, startRecording, stopRecording };
}
