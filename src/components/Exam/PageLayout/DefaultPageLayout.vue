<script setup lang="ts">
    import { QuestionItem } from "~/types/item";
    import { PageItem } from "~/types/page";
    import { UnwrapNestedRefs } from "vue";

    const props = defineProps<{
        currentStep: QuestionItem | PageItem;
        timerController: UnwrapNestedRefs<ReturnType<typeof useTimerController>>;
    }>();
</script>

<template>
    <div class="flex flex-col gap-4">
        <VAccentColor :mode="useAccentColorSelector('timer')">
            <VTimer :timer-controller="timerController">
                <template v-if="(currentStep as QuestionItem).instructions" #instructions>
                    <VStepInstruction :instructions="(currentStep as QuestionItem).instructions" />
                </template>
            </VTimer>
        </VAccentColor>
    </div>

    <div :style="{ minHeight: '50vh' }">
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
