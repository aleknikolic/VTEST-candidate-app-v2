<script setup lang="ts">
    import Camera from "simple-vue-camera";
    import { useStepItemResolver } from "~/composables/componentResolver/useStepItemResolver";
    import { StepType } from "~/types/step";

    const businessController = useBusinessController();
    const securityController = useSecurityController();
    const currentRenderedStepComponent = computed(() => useStepItemResolver(businessController.examState.currentStep?.contentType as unknown as StepType));
    const camera = ref<InstanceType<typeof Camera>>();

    const cancelSubscription = securityController.subscribePhotocheckSnapshot(async () => {
        const blob = await camera.value?.snapshot();
        securityController.UploadPhotocheck(blob as Blob);
    });
    onUnmounted(() => cancelSubscription());
</script>

<template>
    <div>
        <template v-if="businessController.examState.displayLoader">
            <div class="h-full w-full grid place-itens-center">
                <NSpin />
            </div>
        </template>

        <div v-show="!businessController.examState.displayLoader">
            <Teleport to="#recorder">
                <VAccentColor mode="secondary">
                    <NEl
                        v-if="securityController.settingsState.photocheck"
                        tag="div"
                        class="w-[100px] h-[100px] border border-[3px] border-[var(--primary-color)]"
                    >
                        <Camera ref="camera" :resolution="{ width: 100, height: 100 }" />
                    </NEl>
                </VAccentColor>
            </Teleport>
            <div v-if="businessController.examState.currentStep?.action.photocheck" class="w-[100px] h-[100px]"></div>
            <div class="flex flex-col-reverse gap-6 rever">
                <div id="nextButtonContainer" class="flex justify-end w-full">
                    <!-- TELEPORT BUTTON HERE -->
                </div>
                <component :is="currentRenderedStepComponent" />
            </div>
        </div>
    </div>
</template>
