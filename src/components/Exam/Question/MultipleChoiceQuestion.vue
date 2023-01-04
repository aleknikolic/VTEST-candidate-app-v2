<script setup lang="ts">
    import type { ItemType, ItemTypeEmit, ItemTypeExposedState, ItemTypeProps } from "~/types/item";

    const props = defineProps<ItemTypeProps<ItemType.multipleChoiceQuestion>>();
    const emit = defineEmits<ItemTypeEmit>();
        defineExpose<ItemTypeExposedState<ItemType.multipleChoiceQuestion>>({
        getStepPayload: (timeout) => ({
            answer: {
                timerEnded: Boolean(timeout),
                ...(answer.value ? { _id: answer.value } : { noSelectedAnswer: true }),
            },
        }),
    });

    const answer = ref<string>("");
    const instructions = useQuestionInstructionContent<ItemType.multipleChoiceQuestion>(props.questionItem);
</script>

<template>
    <div class="flex flex-col gap-6 w-full">
        <VMultipleChoiceQuestion
            v-model="answer"
            :options="questionItem.props.answers.map((answer) => ({ label: answer.content, image: answer.image, value: answer._id }))"
            :multiple="false"
        />
    </div>
</template>
