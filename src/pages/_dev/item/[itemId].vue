<script setup lang="tsx">
    import { useDevStepController } from "~/composables/useDevStepController";
    import { ItemStepSamples } from "~/config/samples/examStepSamples";
    import { RenderFunction } from "~/types/utils";

    const route = useRoute();
    const currentStep = computed(() => ItemStepSamples?.[+route.params.itemId as number]?.value ?? null);
    const { stepState, resetKey, renderedLayout, renderedStep, stepItem, stepRef, options, SubmitPayload } = useDevStepController<"item">(currentStep);

    function handlePositiveClick() {}

    function handleNegativeClick() {}
</script>

<route lang="yaml">
name: _dev.item.sampleItem
meta:
    dev: true
</route>

<template>
    <div class="fixed right-4 top-4 md:right-8 top-8 lg:right-16 lg:top-16">
        <NDropdown trigger="hover" :options="options">
            <NButton circle type="info">
                <template #icon>
                    <mdi:settings />
                </template>
            </NButton>
        </NDropdown>
    </div>
    <template v-if="!currentStep || !renderedStep || !stepItem">
        <n-result status="warning" title="Warning" description="No sample found for selected page sample ID">
            <template #footer>
                <n-button @click="$router.push({ name: '_dev.sampleList' })">RETURN TO SAMPLES LIST</n-button>
            </template>
        </n-result>
    </template>

    <template v-else>
        <div :key="resetKey" class="flex flex-col gap-4">
            <Component v-bind="{ currentStep: stepState.currentStep?.content, timerController: stepState.timerController }" :is="renderedLayout">
                <VItemLayout :type="stepItem.subject?.type === 'image' ? 'horizontal' : 'default'">
                    <template v-if="stepItem.subject" #subject>
                        <VAccentColor :mode="useAccentColorSelector('itemSubject')">
                            <VQuestionContent v-bind="{ ...stepItem.subject }" />
                        </VAccentColor>
                    </template>
                    <template v-if="stepItem.question" #question>
                        <VAccentColor :mode="useAccentColorSelector('itemQuestion')">
                            <VQuestionContent v-bind="{ ...stepItem.question }" />
                        </VAccentColor>
                    </template>
                    <VAccentColor :mode="useAccentColorSelector('itemAnswer')">
                        <Component
                            :is="renderedStep"
                            ref="stepRef"
                            :question-item="stepItem"
                            :timer-runner="stepState.timerController.currentRunner"
                            :skip-to-next-timer="stepState.timerController.SkipToNextRunner"
                            @next="SubmitPayload"
                        />
                    </VAccentColor>
                </VItemLayout>

                <template v-if="stepRef?.extraActionSlot" #extra-action>
                    <VRenderer :renderer="stepRef?.extraActionSlot" />
                </template>

                <template #next-button>
                    <VAccentColor :mode="useAccentColorSelector('nextButton')">
                        <template v-if="!stepRef?.nextButtonSlot">
                            <NPopconfirm v-if="stepRef?.confirmSubmitNext?.showConfirm.value === true" @positive-click="SubmitPayload()">
                                <template #trigger>
                                    <VNextButton v-bind="{ ...(stepRef?.nextBtnConfig ?? {}) }" />
                                </template>
                                {{ stepRef?.confirmSubmitNext?.text }}
                            </NPopconfirm>
                            <VNextButton v-else v-bind="{ ...(stepRef?.nextBtnConfig ?? {}) }" @next="SubmitPayload()" />
                        </template>

                        <VRenderer :renderer="stepRef?.nextButtonSlot" />
                    </VAccentColor>
                </template>
            </Component>
        </div>
    </template>
</template>
