<script setup lang="ts">
    import type { ItemType, ItemTypeEmit, ItemTypeExposedState, ItemTypeProps } from "~/types/item";

    defineProps<ItemTypeProps<ItemType.imageCarouselQuestion>>();
    defineEmits<ItemTypeEmit>();
    defineExpose<ItemTypeExposedState<ItemType.imageCarouselQuestion>>({
        getStepPayload: (timeout) => ({
            answer: {
                timerEnded: Boolean(timeout),
                ...(answer.value ? { _id: answer.value } : { noSelectedAnswer: true }),
            },
        }),
    });

    const answer = ref<string | null>();
</script>

<template>
    <div class="flex flex-col gap-y-10">
        <VCarouselQuestion v-model="answer" :answers="questionItem.props.answers"></VCarouselQuestion>
    </div>
</template>
