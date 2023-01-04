<script setup lang="ts">
    import { useI18n } from "vue-i18n";
    import type { LocalizedContent } from "~/types/i18n";
    import type { ItemType, ItemTypeEmit, ItemTypeExposedState, ItemTypeProps } from "~/types/item";

    const props = defineProps<ItemTypeProps<ItemType.taskWriting>>();
    const emit = defineEmits<ItemTypeEmit>();
    defineExpose<ItemTypeExposedState<ItemType.taskWriting>>({
        getStepPayload: (timeout) => ({
            answer: {
                text: answer.value,
            },
        }),
        confirmSubmitNext: {
            text: "You haven't reach the minimum number of words. Are you sure you want to submit your answer?", //t("questionItems.writingTask.confirmSubmitText"),
            showConfirm: computed(() => answer.value.split(/(\s|\r|\n)/g).filter((word) => word !== "").length < props.questionItem.props.minWords),
        },
    });

    const { t } = useI18n<{ message: LocalizedContent }>();
    const answer = ref("");
</script>

<template>
    <div class="flex flex-col gap-6">
        <VTextArea v-model="answer" :show-count="false"></VTextArea>
        <div class="mt-2">
            <VText type="text-regular-5">
                {{ t("general.minNumberOfWords", { minWords: questionItem.props.minWords }) }}<br />
            </VText>

            <div class="flex">
                <VText type="text-regular-5">
                    {{ t("general.wordCountInput") }}
                </VText>
                <VText type="text-strong-6">
                    &nbsp;{{ answer.split(/(\s|\r|\n)/g).filter((word) => word !== "").length }}
                </VText>
            </div>
            
        </div>
    </div>
</template>
