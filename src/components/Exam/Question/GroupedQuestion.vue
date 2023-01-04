<script setup lang="ts">
    import { useQuestionItemResolver } from "~/composables/componentResolver/useQuestionItemResolver";
    import type { ItemType, ItemTypeEmit, ItemTypeExposedState, ItemTypeProps, NestedQuestionPayload } from "~/types/item";
    import type { NextBtnParams } from "~/types/system";
    import type { QuestionItem } from "~/types/item";

    const props = defineProps<ItemTypeProps<ItemType.nestedQuestion>>();
    const emit = defineEmits<ItemTypeEmit>();
    
    defineExpose<ItemTypeExposedState<ItemType.nestedQuestion>>({
        getStepPayload: (timeout) => ({
            answers: itemRefs.value.map((item, index) => ({
                question: { _id: items.value[index]._id },
                answer: (item.getStepPayload(timeout) as any).answer,
            })) as unknown as NestedQuestionPayload["answers"],
        }),
    });

    const items = computed<Array<QuestionItem & { _component: ReturnType<typeof defineComponent> }>>(
        () =>
            props.questionItem.props.nestedItems?.map((item: QuestionItem) => ({
                ...item,
                _component: useQuestionItemResolver(item.type),
            })) ?? [],
    );
    const itemRefs = ref<ItemTypeExposedState<ItemType>[]>([]);
</script>

<template>
    <div class="flex flex-col gap-8 mt-6">
        <VItemLayout v-for="(item, index) in items" :key="index" :type="item.subject?.type === 'image' ? 'horizontal' : 'default'">
            <template v-if="item.subject" #subject>
                <VQuestionContent v-bind="{ ...item.subject }" />
            </template>
            <template v-if="item.question" #question>
                <VQuestionContent v-bind="{ ...item.question }" />
            </template>
            <Component :is="item._component" ref="itemRefs" :question-item="item" :render-next-btn="false" />
        </VItemLayout>
    </div>
</template>
