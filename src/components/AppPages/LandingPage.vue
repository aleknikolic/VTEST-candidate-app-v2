<script setup lang="ts">
    import { useI18n } from "vue-i18n";
    import type { LocalizedContent } from "~/types/i18n";
    import VtestVisual from "~/assets/common/landing-illustration.png";

    const emit = defineEmits<{
        (event: "start"): any | void;
    }>();

    const { t } = useI18n<{ message: LocalizedContent }>();
</script>

<template>
    <div class="grid gap-y-20">
        <div class="grid lg:grid-cols-2 grid-cols-1 gap-y-15">
            <div class="text-center">
                <VImage preview-disabled :src="VtestVisual" :width="550" />
            </div>
            <div class="grid place-items-center space-y-2">
                <div class="text-center flex flex-col gap-10 space-evenly items-center">
                    <VText type="title-0" class="text-center uppercase">
                        {{ t("general.startTitle") }}
                    </VText>
                    <div>
                        <VButton type="primary" text-size="text-2xl" round @click="$emit('start')">
                            <span class="uppercase font-bold" @click="$router.push({ name: 'login' })"> {{ t("general.startButton") }} </span>
                        </VButton>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
