import { ref } from "vue";

export function useCameraRecorder() {
    const recorder = ref<MediaRecorder | null>(null);
    const videoBuffer = ref<Blob[]>([]);
    const videoContent = ref<File>();

    const isRecording = ref<boolean>(false);

    async function startRecording() {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        recorder.value = new MediaRecorder(stream);
        recorder.value.start();
        isRecording.value = true;

        recorder.value.ondataavailable = (e) => {
            videoBuffer.value.push(e.data);
        };

        recorder.value.onstop = () => {
            const videoBlob = new Blob(videoBuffer.value, { type: "video/mp4" });
            // videoContent.value = URL.createObjectURL(videoBlob);
            videoContent.value = new File([videoBlob], "name");
        };
    }

    function stopRecording() {
        recorder.value?.stop();
        isRecording.value = false;
    }

    return { videoBuffer, videoContent, isRecording, startRecording, stopRecording };
}
