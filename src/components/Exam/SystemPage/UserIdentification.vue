<script setup lang="ts">
    import { Form, FormRefInstance } from "@chronicstone/vue-sweetforms";
    import { helpers, required } from "@vuelidate/validators";
    import { useI18n } from "vue-i18n";
    import { ConfigController } from "~/api/controllers/config.controller";
    import type { LocalizedContent } from "~/types/i18n";
    import type { PageTypeEmit, PageTypeExposedState, PageTypeProps, UserPersonalDataPayload } from "~/types/page";
    import { PageType } from "~/types/page";

    const props = defineProps<PageTypeProps<PageType.userPersonnalData>>();
    const emit = defineEmits<PageTypeEmit>();
    defineExpose<PageTypeExposedState<PageType.userPersonnalData>>({
        getStepPayload: () => formRef.value?.formData as UserPersonalDataPayload,
        canTriggerNext: () => formRef.value?.$validate().then(({ $valid }) => $valid) ?? true,
    });

    const { t } = useI18n<{ message: LocalizedContent }>();
    const formRef = ref<FormRefInstance>();
    const formSchema = {
        gridSize: 8,
        fieldSize: "8 md:4",
        fields: [
            {
                key: "firstName",
                label: () => t("forms.labels.firstName"),
                type: "text",
                validators: {
                    required: helpers.withMessage(() => t("forms.errors.empty", { field: "first name" }), required),
                },
            },
            {
                key: "lastName",
                label: () => t("forms.labels.lastName"),
                type: "text",
                validators: {
                    required: helpers.withMessage(() => t("forms.errors.empty", { field: "last name" }), required),
                },
            },
            {
                key: "email",
                label: () => t("forms.labels.email"),
                type: "text",
                validators: {
                    required: helpers.withMessage(() => t("forms.errors.empty", { field: "email" }), required),
                },
            },
            {
                key: "gender",
                label: () => t("forms.labels.gender"),
                type: "select",
                options: [
                    { label: "general.male", value: "male" },
                    { label: "general.female", value: "female" },
                    { label: "general.other", value: "other" },
                ].map(({ label, value }) => ({ label: () => formatKey(t(label)), value })),
                validators: {
                    required: helpers.withMessage(() => t("forms.errors.empty", { field: "gender" }), required),
                },
            },
            {
                key: "country",
                label: () => t("forms.labels.country"),
                type: "select",
                options: async () =>
                    await ConfigController.getCountries().then((data) =>
                        data.map(({ en_short_name }) => ({ label: () => t(en_short_name), value: en_short_name })),
                    ),
                size: 8,
                validators: {
                    required: helpers.withMessage(() => t("forms.errors.empty", { field: "country" }), required),
                },
            },
        ],
    };

    const TEST_DATA = {
        // firstName: "Cypri",
        // lastName: "THAO",
        // email: "cypthao@gmail.com",
        // gender: "male",
        // country: "France",
    };

    
</script>

<template>
    <div class="column space-y-2 text-center">
        <VText type="title-1" color="primary" class="uppercase">
            {{ t("systemPages.userIdentification.title") }}
        </VText>
        <VText type="title-2">
            {{ t("systemPages.userIdentification.completeInfo") }}
            <br>
            {{ t("systemPages.userIdentification.verifyInfo") }}
        </VText>
        <div class="flex justify-center pt-6">
            <Form ref="formRef" :form-options="formSchema" :form-data="TEST_DATA" class="w-3/6" />
        </div>
    </div>
</template>
