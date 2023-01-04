<script setup lang="ts">
    import { useI18n } from "vue-i18n";
    import type { LocalizedContent } from "~/types/i18n";
    import { PageType, PageTypeEmit, PageTypeExposedState, PageTypeProps } from "~/types/page";

    const props = defineProps<PageTypeProps<PageType.userConsent>>();
    defineEmits<PageTypeEmit>();
    defineExpose<PageTypeExposedState<PageType.userConsent>>({
        getStepPayload: () => ({
            dataTransfer: state.confirmations.dataTransfer,
            identityConfirmed: state.confirmations.identityConfirmed,
            processingPersonalData: true,
            consentSignedBy: userFullName.value,
            consentDate,
        }),
        canTriggerNext: () => {
            const agreed =
                state.confirmations.dataTransfer && state.confirmations.identityConfirmed && state.confirmations.processingPersonalData && state.agree;
            if (!agreed) {
                messageApi.error(() => t("forms.errors.dataPrivacyNotAccepted"));
            }
            return agreed;
        },
    });

    const { t } = useI18n<{ message: LocalizedContent }>();
    const { messageApi } = useReactifiedApi();
    // TODO: removed once data is ready from storage
    const userFullName = computed(() => `${props.pageItem.props.firstName} ${props.pageItem.props.lastName}`);
    const consentDate = "2021/02/23";
    const state = reactive({
        agree: false,
        confirmations: {
            dataTransfer: !props.pageItem.props?.dataTransfer,
            identityConfirmed: !props.pageItem.props?.identityConfirmed,
            processingPersonalData: !props.pageItem.props?.processingPersonalData,
        },
    });
</script>

<template>
    <div class="p-b-5">
        <div class="text-center font-bold">
            <VText type="title-1" color="primary" class="mb-2 uppercase">
                {{ t("systemPages.userConsent.title") }}
            </VText>
            <VText type="title-2">{{ t("systemPages.userConsent.user", { userFullName }) }}</VText>
            <VText type="title-2">{{ t("systemPages.userConsent.date", { consentDate }) }}</VText>
        </div>
        <div class="column text-center font-bold"></div>
    </div>
    <NEl tag="div" class="p-2 border-2 rounded-sm border-[var(--primary-color)]">
        <VList class="p-y-2 flex flex-col gap-4">
            <VListItem v-if="pageItem.props?.dataTransfer" :with-prefix="false" :bordered="false">
                <VCheckbox v-model="state.confirmations.dataTransfer" :bordered="false">
                    <VText type="text-regular-4">
                        {{ t("systemPages.userConsent.dataTransfer") }}
                    </VText>
                </VCheckbox>
            </VListItem>
            <VListItem v-if="pageItem.props?.identityConfirmed" :with-prefix="false" :bordered="false">
                <VCheckbox v-model="state.confirmations.identityConfirmed" :bordered="false">
                    <VText type="text-regular-4">
                        {{ t("systemPages.userConsent.identityConfirmed") }}
                    </VText>
                </VCheckbox>
            </VListItem>
            <VListItem v-if="pageItem.props?.processingPersonalData" :with-prefix="false" :bordered="false">
                <VCheckbox v-model="state.confirmations.processingPersonalData" :bordered="false">
                    <VText type="text-regular-4">
                        {{ t("systemPages.userConsent.processingPersonalData") }}
                    </VText>
                </VCheckbox>
            </VListItem>
        </VList>
    </NEl>
    <div class="pt-8 w-50 h-30 flex flex-col flex-wrap gap-y-2">
        <VText type="text-strong-4">
            {{ t("systemPages.userConsent.signature", { consentDate, userFullName }) }}
        </VText>
        <VCheckbox v-model="state.agree" class="text-center flex items-center">
            <VText type="text-strong-5">{{ t("general.iAgree") }}</VText>
        </VCheckbox>
    </div>
</template>

<style scoped></style>
