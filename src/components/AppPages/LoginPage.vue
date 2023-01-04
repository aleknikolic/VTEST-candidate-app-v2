<script setup lang="ts">
    import { Form, FormRefInstance } from "@chronicstone/vue-sweetforms";
    import { and, helpers, maxLength, minLength, required } from "@vuelidate/validators";
    import { useMessage } from "naive-ui";
    import { useI18n } from "vue-i18n";
    import VCaptcha from "~/elements/VCaptcha.vue";
    import type { LocalizedContent } from "~/types/i18n";

    const { t } = useI18n<{ message: LocalizedContent }>();

    const captchaEnabled = import.meta.env.VITE_APP_ENV !== "dev";

    const messageApi = useMessage();
    const businessController = useBusinessController();
    const router = useRouter();

    const formRef = ref<FormRefInstance>();
    const formSchema = {
        fieldSize: 8,
        fields: [
            {
                key: "secureCode",
                type: "text",
                placeholder: () => t("forms.labels.secureCode"),
                validators: {
                    // onlyDigits: helpers.withMessage('The secure code can only contain digits', helpers.regex(/^[0-9]+$/)),
                    length: helpers.withMessage(() => t("forms.errors.secureCodeLength"), and(minLength(9), maxLength(9))),
                    required: helpers.withMessage(() => t("forms.errors.empty", { field: "secure code" }), required),
                },
            },
            ...(captchaEnabled
                ? [
                    {
                        key: "reCaptcha",
                        type: "custom-component",
                        component: VCaptcha,
                    },
                ]
                : []),
        ],
    };

    const SubmitNext = () =>
        formRef.value?.$validate().then(async ({ $valid, $errors, $data }) => {
            if (!$valid) return;
            else await businessController.StartSession($data.secureCode);
        });
</script>

<template>
    <div class="flex flex-col gap-8 items-center justify-center px-6 py-4">
        <VText type="title-1" class="mt-[50px]">{{ t("general.enterSecureCode") }}</VText>
        <Form ref="formRef" class="<md:w-full <lg:w-1/3 @lg:w-2/6 @xl:w-2/6 mt-8" :form-options="formSchema"> </Form>
        <VButton type="primary" round text-size="text-2xl" @click="SubmitNext"> {{ t("general.submitButton") }} </VButton>
    </div>
</template>

<style scoped></style>
