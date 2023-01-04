<script setup lang="ts">
    import { PageType, PageTypeEmit, PageTypeExposedState, PageTypeProps } from "~/types/page";

    defineProps<PageTypeProps<PageType.groupedQuestionDescription>>();
    defineEmits<PageTypeEmit>();
    defineExpose<PageTypeExposedState<PageType.groupedQuestionDescription>>({
        getStepPayload: () => ({}),
    });
</script>

<template>
    <VItemLayout :type="pageItem.props.subject?.type === 'image' ? 'horizontal' : 'default'">
        <template v-if="pageItem.props.subject" #subject>
            <VAccentColor :mode="useAccentColorSelector('itemSubject')">
                <VQuestionContent v-bind="{ ...pageItem.props.subject }" />
            </VAccentColor>
        </template>
        <template v-if="pageItem.props.question" #question>
            <VAccentColor :mode="useAccentColorSelector('itemQuestion')">
                <VQuestionContent v-bind="{ ...pageItem.props.question }" />
            </VAccentColor>
        </template>
    </VItemLayout>
</template>
