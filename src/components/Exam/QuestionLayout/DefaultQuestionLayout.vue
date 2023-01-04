<script setup lang="ts">
    import { QuestionItem } from "~/types/item";
    import { UnwrapNestedRefs } from "vue";

    const props = defineProps<{
        currentStep: QuestionItem;
        timerController: UnwrapNestedRefs<ReturnType<typeof useTimerController>>;
    }>();
</script>

<template>
    <div class="flex flex-col gap-4">
        <VAccentColor :mode="useAccentColorSelector('timer')">
            <VTimer :timer-controller="timerController">
                <template v-if="currentStep.instructions" #instructions>
                    <div class="flex flex-col gap-2">
                        <VStepInstruction :instructions="currentStep.instructions" />
                        <span v-if="currentStep.progress"> {{ currentStep.progress.label }}</span>
                    </div>
                </template>
            </VTimer>
        </VAccentColor>
    </div>

    <div :style="{ minHeight: '50vh' }" class="mt-4">
        <slot />
    </div>

    <div class="w-full flex justify-between items-center gap-4">
        <div>
            <slot name="extra-action" />
        </div>
        <div>
            <slot name="next-button" />
        </div>
    </div>
</template>
