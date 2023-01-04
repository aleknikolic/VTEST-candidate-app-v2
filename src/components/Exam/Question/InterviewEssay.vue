<script setup lang="ts">
    import type { ItemType, ItemTypeEmit, ItemTypeExposedState, ItemTypeProps } from "~/types/item";
    import { NextBtnParams } from "~/types/system";
    import Interview from '~/assets/systemPages/_shared/interview.png'
    import { NEl } from "naive-ui";
    import { LocalizedContent } from "~/types/i18n";

    const props = defineProps<ItemTypeProps<ItemType.writingInterview>>();
    const emit = defineEmits<ItemTypeEmit>();
        const nextBtnConfig = ref<NextBtnParams>({
        disabled: true,
    });
    defineExpose<ItemTypeExposedState<ItemType.writingInterview>>({
        getStepPayload: (timeout) => ({
            answer: {
                text: answer.value,
            },
        }),
        nextBtnConfig,
    });
    const answer = ref("");
    const { t } = useI18n<{ message: LocalizedContent }>();

    watch(
        () => answer.value,
        () => {
            nextBtnConfig.value.disabled = answer.value?.length < props.questionItem.props.minimumCharacters;
        },
    );
</script>

<template>
    <div class="flex flex-col gap-6">
        <VItemLayout type="horizontal" questionXPosition="start" questionYPosition="center">
            <template #question>
                <div class="">
                    <img :src="Interview" width="200" height="200" />
                </div>
            </template>
            <template #subject>
                <div class="flex flex-col gap-y-2">
                    <p class="font-black text-2xl">{{ questionItem.props.question }}</p>
                    <VTextArea 
                        v-model="answer" 
                        :show-count="false"
                        :rows="11"
                        placeholder="Write your answer"
                        :min-length="questionItem.props.minimumCharacters"
                    >
                    </VTextArea>
                    <div class="mt-2">
                        <p class="text-[16px] leading-[19px]">
                            {{ t("general.minNumberOfWords", { minWords: questionItem.props.minimumCharacters }) }} <br>
                            Number of words input: <span class="font-bold">{{ answer.length }}</span>
                        </p>
                    </div>
                </div>
            </template>
        </VItemLayout>

        <NEl tag="p" class="text-[var(--primary-color)]">
            {{ t('systemPages.interview.access') }}
        </NEl>
    </div>
</template>
