<script setup lang="ts">
    import { useI18n } from "vue-i18n";
    import type { LocalizedContent } from "~/types/i18n";
    import { PageType, PageTypeEmit, PageTypeExposedState, PageTypeProps } from "~/types/page";

    defineProps<PageTypeProps<PageType.primaryInformation>>();
    defineEmits<PageTypeEmit>();
    defineExpose<PageTypeExposedState<PageType.primaryInformation>>({
        getStepPayload: () => ({}),
    });
    
    const { t } = useI18n<{ message: LocalizedContent }>();
</script>

<template>
    <div class="space-y-5">
        <div class="column text-center">
            <VText type="title-1" color="primary" class="uppercase">
                {{ pageItem.props.examName }}
            </VText>
            <VText type="title-2">
                {{ t("systemPages.primaryInformation.examDescription", { examName: pageItem.props.examName }) }}
            </VText>
            <VText type="title-2" color="primary" class="mt-[10px]">
                {{ t("systemPages.primaryInformation.proceedingTitle") }}:
            </VText>
        </div>
        <div class="px-50">
            <VList>
                <VListItem :bordered="false">
                    <template #prefix>
                        <VIcon color="primary"> <mdi:card-account-details-outline /></VIcon
                    ></template>
                    <VText type="text-regular-2">{{ t("systemPages.primaryInformation.officialIDCheck") }}</VText>
                </VListItem>
                <VListItem :bordered="false">
                    <template #prefix>
                        <VIcon color="primary"> <ic:twotone-desk /></VIcon>
                    </template>
                    <VText type="text-regular-2">{{ t("systemPages.primaryInformation.placeCheck") }}</VText>
                </VListItem>
                <VListItem :bordered="false">
                    <template #prefix>
                        <VIcon color="primary"> <clarity:alarm-clock-line /></VIcon>
                    </template>
                    <VText type="text-regular-2">{{ t("systemPages.primaryInformation.timeCheck", { ...pageItem.props }) }}</VText>
                </VListItem>
                <VListItem :bordered="false">
                    <template #prefix>
                        <VIcon color="primary"> <system-uicons:waves /></VIcon>
                    </template>
                    <VText type="text-regular-2">{{ t("systemPages.primaryInformation.goodInternetCheck") }}</VText>
                </VListItem>
                <VListItem :bordered="false">
                    <template #prefix>
                        <VIcon color="primary"> <clarity:computer-line /></VIcon>
                    </template>

                    <VText type="text-regular-2">{{ t("systemPages.primaryInformation.cameraCheck") }}</VText>
                </VListItem>
            </VList>
        </div>
    </div>
</template>

<style scoped></style>
