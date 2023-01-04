<script lang="ts" setup>
    import type { ItemType, ItemTypeExposedState, ItemTypeProps } from "~/types/item";

    defineProps<ItemTypeProps<ItemType.audioPictureMatchQuestion>>();

    defineExpose<ItemTypeExposedState<ItemType.audioPictureMatchQuestion>>({
        getStepPayload: (timeout) => ({
            answer: {
                timerEnded: Boolean(timeout),
                ...(answers.value ? { _id: answers.value } : { noSelectedAnswer: true }),
            },
        }),
    });

    const answers = ref<string[]>([]);
</script>

<template>
    <VMultipleChoiceImage v-model="answers" class="mx-10 md:mx-20 gap-8" :answers="questionItem.props.answers"></VMultipleChoiceImage>
</template>
