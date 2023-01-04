<script setup lang="tsx">
    import moment from "moment";
    import { NEl } from "naive-ui";
    import { useCameraRecorder } from "~/composables/useCameraRecorder";
    import VNextButton from "~/elements/VNextButton.vue";
    import { LocalizedContent } from "~/types/i18n";
    import type { ItemType, ItemTypeEmit, ItemTypeExposedState, ItemTypeProps } from "~/types/item";
    import type { NextBtnParams, VCameraExposedState } from "~/types/system";

    const props = defineProps<ItemTypeProps<ItemType.videoInterview>>();
    const emit = defineEmits<ItemTypeEmit>();
    const nextBtnConfig = ref<NextBtnParams>({
        text: "start",
    });
    defineExpose<ItemTypeExposedState<ItemType.videoInterview>>({
        getStepPayload: (timeout) => ({
            answer: {
                file: videoContent.value,
            },
        }),
        extraActionSlot: () => (
            <NEl class="w-[196px] h-[46px] border border-[5px]  border-[var(--primary-color)] rounded-[25px] flex items-center pl-[11px] pr-[21px] gap-x-1">
                <NEl class={["w-6 h-6 rounded-full ", { "bg-[#BC3830]": isRecording.value }, { "bg-[var(--primary-color)]": !isRecording.value }]}></NEl>
                <NEl class="bg-[#D9D9D9] flex-1 h-[10.34px] rounded-[5.5px]"></NEl>
            </NEl>
        ),
        nextButtonSlot: () => {
            return (
                <NEl class="flex items-center gap-x-4">
                    {isRecording.value && (
                        <NEl class="w-[113px] h-[46px] border border-[5px]  border-[var(--primary-color)] rounded-[25px] flex items-center justify-center">
                            <NEl tag="span" class="text-2xl font-black text-center text-[var(--primary-color)]">
                                {counterTimer.value}
                            </NEl>
                        </NEl>
                    )}
                    <VNextButton {...nextBtnConfig.value} onNext={Next} />
                </NEl>
            );
        },
    });

    const camera = ref<VCameraExposedState>();
    const { videoContent, isRecording, startRecording, stopRecording } = useCameraRecorder();
    const { counter, pause: pauseCounter, resume: startCounter } = useInterval(1000, { controls: true, immediate: false });
    const counterTimer = computed(() => moment.utc(1000 * counter.value).format("mm:ss"));
    const { t } = useI18n<{ message: LocalizedContent }>();

    const Next = () => {
        if (isRecording.value) {
            stopRecording();
            pauseCounter();
            props.skipToNextTimer();
        } else {
            nextBtnConfig.value.text = "Next";
            startRecording();
            startCounter();
        }
    };

    watch(
        () => props.timerRunner,
        (value) => {
            if (value.remaining === 0 && value.running) {
                if (isRecording.value) {
                    stopRecording();
                    pauseCounter();
                }
            }
        },
        { deep: true },
    );
</script>

<template>
    <div class="">
        <div class="md:flex">
            <p class="font-black text-[28px] mb-4">
                {{ questionItem.props.question }}
            </p>
            <div class="flex flex-col gap-y-1">
                <VCamera 
                    class="custom-camera" 
                    ref="camera" 
                    :show-default-buttons="false" 
                    :resolution="{ width: 392, height: 233 }" 
                />
            </div>
        </div>
        <NEl tag="p" class="text-[var(--primary-color)]">
            {{ t('systemPages.interview.access') }}
        </NEl>
    </div>
</template>

<style scoped>
    .custom-camera::v-deep div {
        margin-left: auto;
        margin-right: auto;
    }
</style>
