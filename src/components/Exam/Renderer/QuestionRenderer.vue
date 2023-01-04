<script setup lang="ts">
    import type { QuestionItem } from "~/types/item";
    import type { ItemLayoutType, ItemType, ItemTypeExposedState } from "~/types/item";
    import { useQuestionLayoutResolver } from "~/composables/componentResolver/useQuestionLayoutResolver";
    import { useQuestionItemResolver } from "~/composables/componentResolver/useQuestionItemResolver";
    import { RenderFunction } from "vue";

    const businessController = useBusinessController();
    const renderedLayout = computed(() =>
        useQuestionLayoutResolver((businessController.examState.currentStep?.content as QuestionItem).layout as ItemLayoutType),
    );
    const renderedQuestion = computed(() =>
        useQuestionItemResolver((businessController.examState.currentStep?.content as QuestionItem).type as unknown as ItemType),
    );

    const itemRef = ref<ItemTypeExposedState<ItemType>>();
    const questionItem = computed(() => businessController.examState.currentStep?.content as QuestionItem);

    const TriggerNext = async (timeout = false) => {
        return businessController.ResolveNextStep(await itemRef.value?.getStepPayload(timeout));
    };

    const cancelSubscription = businessController.subscribeTimerEnd(() => TriggerNext(true));
    onUnmounted(() => cancelSubscription());
</script>

<template>
    <div class="flex flex-col gap-4">
        <component
            :is="renderedLayout"
            v-bind="{ currentStep: businessController.examState.currentStep?.content, timerController: businessController.examState.timerController }"
        >
            <VItemLayout :type="questionItem.subject?.type === 'image' ? 'horizontal' : 'default'">
                <template v-if="questionItem.subject" #subject>
                    <VAccentColor :mode="useAccentColorSelector('itemSubject')">
                        <VQuestionContent v-bind="{ ...questionItem.subject }" />
                    </VAccentColor>
                </template>
                <template v-if="questionItem.question" #question>
                    <VAccentColor :mode="useAccentColorSelector('itemQuestion')">
                        <VQuestionContent v-bind="{ ...questionItem.question }" />
                    </VAccentColor>
                </template>
                <VAccentColor :mode="useAccentColorSelector('itemAnswer')">
                    <component
                        :is="renderedQuestion"
                        ref="itemRef"
                        :key="`${businessController.examState.currentStep?._id}|${businessController.examState.currentStep?.content?._id}`"
                        :question-item="questionItem"
                        :timer-runner="businessController.examState.timerController.currentRunner"
                        :skip-to-next-timer="businessController.examState.timerController.SkipToNextRunner"
                        @next="TriggerNext"
                    />
                </VAccentColor>
            </VItemLayout>

            <template v-if="itemRef && itemRef?.extraActionSlot" #extra-action>
                <VRenderer :renderer="(itemRef?.extraActionSlot as RenderFunction)" />
            </template>

            <template #next-button>
                <VAccentColor :mode="useAccentColorSelector('nextButton')">
                    <template v-if="!itemRef?.nextButtonSlot">
                        <NPopconfirm v-if="itemRef?.confirmSubmitNext?.showConfirm.value === true" @positive-click="TriggerNext()">
                            <template #trigger>
                                <VNextButton v-bind="{ ...(itemRef?.nextBtnConfig ?? {}) }" />
                            </template>
                            {{ itemRef?.confirmSubmitNext?.text }}
                        </NPopconfirm>
                        <VNextButton v-else v-bind="{ ...(itemRef?.nextBtnConfig ?? {}) }" @next="TriggerNext()" />
                    </template>
                    <VRenderer v-else :renderer="(itemRef?.nextButtonSlot as RenderFunction)" />
                </VAccentColor>
            </template>
        </component>
    </div>
</template>
