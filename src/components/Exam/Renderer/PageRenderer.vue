<script setup lang="ts">
    import { QuestionItem } from "~/types/item";
    import { useSystemPageResolver } from "~/composables/componentResolver/useSystemPageResolver";
    import type { PageItem, PageLayoutType, PageType, PageTypeExposedState } from "~/types/page";
    import { usePageLayoutResolver } from "~/composables/componentResolver/usePageLayoutResolver";
    import { RenderFunction } from "~/types/utils";

    const businessController = useBusinessController();
    const renderedPage = computed(() => useSystemPageResolver(businessController.examState.currentStep?.content.type as PageType));
    const renderedLayout = computed(() => usePageLayoutResolver((businessController.examState.currentStep?.content as QuestionItem).layout as PageLayoutType));

    const pageItem = computed(() => businessController.examState.currentStep?.content as PageItem);
    const pageRef = ref<PageTypeExposedState<PageType>>();

    const SubmitPayload = async () => {
        if (pageRef.value?.canTriggerNext && !(await pageRef.value.canTriggerNext())) return false;
        else return businessController.ResolveNextStep(await pageRef.value?.getStepPayload());
    };

    const cancelSubscription = businessController.subscribeTimerEnd(SubmitPayload);
    onUnmounted(() => cancelSubscription());

    const cancelErrorSubscription = businessController.subscribeNextError((flags) => pageRef.value?.onSubmitError && pageRef.value.onSubmitError(flags));
    onUnmounted(() => cancelErrorSubscription());
</script>

<template>
    <div class="flex flex-col gap-4">
        <Component
            v-bind="{ currentStep: businessController.examState.currentStep?.content, timerController: businessController.examState.timerController }"
            :is="renderedLayout"
        >
            <VAccentColor :mode="useAccentColorSelector('itemAnswer')">
                <Component :is="renderedPage" ref="pageRef" :page-item="pageItem" @next="SubmitPayload" />
            </VAccentColor>

            <template v-if="pageRef?.extraActionSlot" #extra-action>
                <VRenderer :renderer="(pageRef?.extraActionSlot as RenderFunction)" />
            </template>

            <template #next-button>
                <VAccentColor :mode="useAccentColorSelector('systemPageContent')">
                    <VNextButton v-bind="{ ...(pageRef?.nextBtnConfig ?? {}) }" @next="SubmitPayload" />
                </VAccentColor>
            </template>
        </Component>
    </div>
</template>
