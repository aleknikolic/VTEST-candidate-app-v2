<script setup lang="ts">
    import { PageType, PageTypeEmit, PageTypeExposedState, PageTypeProps } from "~/types/page";
    import Writing from '~/assets/systemPages/_shared/writing.png'
    import Video from '~/assets/systemPages/_shared/interview.png'
    import { NEl } from "naive-ui";
    import { LocalizedContent } from "~/types/i18n";

    defineProps<PageTypeProps<PageType.interviewIntro>>();
    defineEmits<PageTypeEmit>();
    defineExpose<PageTypeExposedState<PageType.interviewIntro>>({
        getStepPayload: () => ({}),
    });

    const { t } = useI18n<{ message: LocalizedContent }>();
</script>

<template>
    <div class="">
        <NEl tag="h1" class="font-black text-[var(--primary-color)] text-center text-[32px] leading-[54px]">
            {{ t("systemPages.interview.title") }}
        </NEl>
        <div class="text-xl text-center flex flex-col items-center mx-auto gap-y-2 mt-2 w-7/12">
            <p class="font-black text-[24px] leading-[28px]">
                {{ t("systemPages.interview.subtitle") }}
                <br>
                {{ t("systemPages.interview.instruction") }}
            </p>
            <p class="text-[24px">
                {{ t("systemPages.interview.description") }}
            </p>
            <p class="font-bold">{{ t("systemPages.interview.division", { partsCount: 2 }) }}</p>
            <div class="flex gap-x-40 mt-[40px]">
                <div class="flex flex-col items-center">
                    <img :src="Video" />
                    <p class="mt-[40px] text-[18px]">{{ t("systemPages.interview.videoInterview") }}</p>
                </div>
                <div class="flex flex-col items-center">
                    <img :src="Writing" width="158" height="158" />
                    <p class="mt-[40px] text-[18px]">{{ t("systemPages.interview.writingActivity") }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
