<script setup lang="tsx">
    import { NEl } from "naive-ui";
    import { useAudioRecorder } from "~/composables/useAudioRecorder";
    import VNextButton from "~/elements/VNextButton.vue";
    import type { ItemType, ItemTypeEmit, ItemTypeExposedState, ItemTypeProps } from "~/types/item";
    import { NextBtnParams } from "~/types/system";

    const props = defineProps<ItemTypeProps<ItemType.speakingReadingTask>>();
    const emit = defineEmits<ItemTypeEmit>();
    const nextBtnConfig = ref<NextBtnParams>({
        text: "start",
    });
    defineExpose<ItemTypeExposedState<ItemType.speakingReadingTask>>({
        getStepPayload: (timeout) => {
            return {
                answer: {
                    file: audioContent.value as File,
                },
            };
        },
        nextBtnConfig,
        nextButtonSlot: () => {
            return (
                <NEl class="flex items-center gap-x-4">
                    <NEl class="w-[auto] h-[46px] border border-[5px]  border-[var(--primary-color)] rounded-[25px] flex items-center p-3 gap-x-1 text-[var(--primary-color)]">
                        <NEl
                            class={[
                                "w-6 h-6 rounded-full ",
                                { "bg-[var(--error-color)]": isRecording.value },
                                { "bg-[var(--primary-color)]": !isRecording.value },
                            ]}
                            style={`animation: ${isRecording.value ? "glowing 1.5s infinite" : "none"}`}
                        ></NEl>
                        {isRecording.value && <span class="text-2xl font-black">{formatTime(duration.value)}</span>}
                    </NEl>
                    <VNextButton {...nextBtnConfig.value} onNext={Next} />
                </NEl>
            );
        },
    });

    const { audioBuffer, audioContent, isRecording, startRecording, stopRecording, duration } = useAudioRecorder();
    const Next = async () => {
        try {
            if (isRecording.value) {
                stopRecording();
                emit("next");
            } else {
                props.skipToNextTimer();
                await startRecording();
                nextBtnConfig.value.text = "Next";
            }
        } catch (err) {
            console.error(err);
        }
    };

    function TriggerNext() {
        Next();
    }

    watch(
        () => props.timerRunner.step,
        (value) => value === "answer" && !isRecording.value && TriggerNext(),
        { deep: true },
    );
</script>
<template>
    <div class="flex flex-col gap-6"></div>
</template>

<style>
    @keyframes glowing {
        0% {
            background-color: #e81919;
            box-shadow: 0 0 2px #e81919;
        }
        50% {
            background-color: #e81919;
            box-shadow: 0 0 10px #e81919;
        }
        100% {
            background-color: #e81919;
            box-shadow: 0 0 2px #e81919;
        }
    }
</style>
