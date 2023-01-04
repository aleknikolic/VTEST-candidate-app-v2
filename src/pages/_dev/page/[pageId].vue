<script setup lang="tsx">
    import Renderer from "~/components/Generic/Renderer";
    import { useDevStepController } from "~/composables/useDevStepController";
    import { PageStepSamples } from "~/config/samples/examStepSamples";

    const route = useRoute();
    const currentStep = computed(() => PageStepSamples?.[+route.params.pageId as number]?.value ?? null);

    const { stepState, resetKey, renderedLayout, renderedStep, stepItem, stepRef, options, SubmitPayload } = useDevStepController<"page">(currentStep);
</script>

<route lang="yaml">
name: _dev.page.sampleItem
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
                <Component :is="renderedStep" ref="stepRef" :page-item="stepItem" @next="SubmitPayload" />

                <template v-if="stepRef?.extraActionSlot" #extra-action>
                    <VRenderer :renderer="stepRef?.extraActionSlot" />
                </template>

                <template #next-button>
                    <VNextButton v-bind="{ ...(stepRef?.nextBtnConfig ?? {}) }" @next="SubmitPayload" />
                </template>
            </Component>
        </div>
    </template>
</template>
