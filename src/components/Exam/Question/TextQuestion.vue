<script setup lang="ts">
    import type { ItemType, ItemTypeEmit, ItemTypeExposedState, ItemTypeProps } from "~/types/item";

    defineEmits<ItemTypeEmit>();
    const props = defineProps<ItemTypeProps<ItemType.fillInTheBlank>>();
    defineExpose<ItemTypeExposedState<ItemType.fillInTheBlank>>({
        getStepPayload: () => ({
            answer: { text: answer.value },
        }),
        nextBtnConfig: {
            type: "default",
            disabled: false,
        },
    });

    const instructions = useQuestionInstructionContent<ItemType.fillInTheBlank>(props.questionItem);
    const answer = ref<string>("");
</script>

<template>
    <div class="flex flex-col gap-6">
        <VQuestionInstruction v-if="instructions" :type="instructions.type" :content="instructions.content" />
        <VInput v-model="answer" placeholder="Write your text" />
    </div>
</template>
