<script setup lang="ts">
    import { useI18n } from "vue-i18n";
    import type { LocalizedContent } from "~/types/i18n";
    import { PageType, PageTypeEmit, PageTypeExposedState, PageTypeProps } from "~/types/page";
    import WritingPicto from '~/assets/systemPages/_shared/writing.png'

    defineProps<PageTypeProps<PageType.instruction>>();
    defineEmits<PageTypeEmit>();
    defineExpose<PageTypeExposedState<PageType.instruction>>({
        getStepPayload: () => ({}),
    });

    const { t } = useI18n<{ message: LocalizedContent }>();

</script>

<template>
    <NEl class="mx-20 py-5 px-10 border-2 rounded-[var(--border-radius)] border-[var(--primary-color)] space-y-5">
        <VText type="title-1" color="primary" class="text-center uppercase">
            {{ t("systemPages.instructionList.title") }}
        </VText>
        <div class="flex justify-start">
            <div class="w-2/12 h-40 flex justify-center items-center">
                <VImage :src="WritingPicto" :width="100"></VImage>
            </div>
            <div class="w-10/12">
                <VList class="space-y-2">
                    <VListItem :bordered="false" with-prefix>
                        <template #prefix>
                            <VIcon size="45" color="primary">
                                <ic:baseline-keyboard-arrow-right />
                            </VIcon>
                        </template>
                        <VText type="text-regular-2">{{ t("systemPages.instructionList.replayAudio") }}</VText>
                    </VListItem>
                    <VListItem :bordered="false" with-prefix>
                        <template #prefix>
                            <VIcon size="45" color="primary">
                                <ic:baseline-keyboard-arrow-right />
                            </VIcon>
                        </template>
                        <VText type="text-regular-2">{{ t("systemPages.instructionList.speakInMicro") }}</VText>
                    </VListItem>
                    <VListItem :bordered="false" with-prefix>
                        <template #prefix>
                            <VIcon size="45" color="primary">
                                <ic:baseline-keyboard-arrow-right />
                            </VIcon>
                        </template>
                        <VText type="text-regular-2">{{ t("systemPages.instructionList.minWordsNumber") }}</VText>
                    </VListItem>
                </VList>
            </div>
        </div>
    </NEl>
</template>

<style scoped></style>
