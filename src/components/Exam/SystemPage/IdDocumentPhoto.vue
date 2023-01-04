<script setup lang="tsx">
    import { Form, FormRefInstance } from "@chronicstone/vue-sweetforms";
    import { helpers, required } from "@vuelidate/validators";
    import { useI18n } from "vue-i18n";
    import { ConfigController } from "~/api/controllers/config.controller";
    import type { LocalizedContent } from "~/types/i18n";
    import { IdDocumentPhotoPayload, PageType, PageTypeExposedState, PageTypeProps, SystemPageErrorFlags } from "~/types/page";
    import type { NextBtnParams, VCameraExposedState } from "~/types/system";
    import IdPicto from "~/assets/systemPages/IdDocumentPhoto/passport.svg";
    import justIDOnPhoto from "~/assets/systemPages/IdDocumentPhoto/just-id-on-photo.svg";
    import { useCustomNotification } from "~/composables/useNotification";

    defineProps<{ props: PageTypeProps<PageType.idDocumentPhoto> }>();
    defineExpose<PageTypeExposedState<PageType.idDocumentPhoto>>({
        nextBtnConfig: computed(() => stepState.nextBtnConfig),
        getStepPayload: async () => ({ file: (await camera.value?.cropPhoto()) as File, ...stepState.formData }),
        canTriggerNext: async () => {
            if (stepState.currentStep === 0) {
                const { $valid } = (await formRef.value?.$validate()) ?? {};
                if ($valid) {
                    stepState.formData = formRef.value?.formData as IdDocumentPhotoPayload;
                    stepState.currentStep = 1;
                    stepState.nextBtnConfig.hidden = true;
                }
                return false;
            }
            return true;
        },
        onSubmitError: (flags) => {
            if (flags.some((flag) => [SystemPageErrorFlags.MissingFace as string, SystemPageErrorFlags.NotDocument].includes(flag))) {
                useCustomNotification({
                    title: "The uploaded photo does not meet the following requirements:",
                    text: () => (
                        <ul>
                            {flags
                                .filter((flag) => [SystemPageErrorFlags.MissingFace as string, SystemPageErrorFlags.NotDocument].includes(flag))
                                .map((flag) => (
                                    <li>{t(`error_flags.${flag}`)}</li>
                                ))}
                        </ul>
                    ),
                });
            }
        },
    });

    const { t } = useI18n<{ message: LocalizedContent }>();

    const formRef = ref<FormRefInstance>();
    const camera = ref<VCameraExposedState>();

    const formSchema = {
        gridSize: 8,
        fieldSize: "8 md:4",
        fields: [
            {
                key: "idDocType",
                label: () => t("forms.labels.type"),
                type: "select",
                options: () =>
                    [
                        { label: "general.nationalID", value: "National ID" },
                        { label: "general.passport", value: "Passport" },
                        { label: "general.drivingLicense", value: "Driving license" },
                    ].map(({ label, value }) => ({ label: () => t(label), value })),
                validators: {
                    required: helpers.withMessage(() => t("forms.errors.empty", { field: "type" }), required),
                },
            },
            {
                key: "idDocNumber",
                label: () => t("forms.labels.idNumber"),
                type: "text",
                validators: {
                    required: helpers.withMessage(() => t("forms.errors.empty", { field: "ID Number" }), required),
                },
            },
            {
                key: "idCountry",
                label: () => t("forms.labels.country"),
                type: "select",
                options: async () =>
                    await ConfigController.getCountries().then((data) =>
                        data.map(({ en_short_name }) => ({ label: () => t(en_short_name), value: en_short_name })),
                    ),
                validators: {
                    required: helpers.withMessage(() => t("forms.errors.empty", { field: "country" }), required),
                },
            },
            {
                key: "birthDate",
                label: () => t("forms.labels.dateOfBirth"),
                type: "date",
                validators: {
                    required: helpers.withMessage(() => t("forms.errors.empty", { field: "date of birth" }), required),
                },
                transform: (value: string) => new Date(value).toISOString(),
            },
        ],
    };

    const stepState = reactive({
        currentStep: 0,
        formData: {} as Omit<IdDocumentPhotoPayload, "file">,
        photoCaptured: false,
        nextBtnConfig: {
            hidden: false,
        } as NextBtnParams,
    });

    const TakePhoto = async () => {
        if (stepState.photoCaptured) {
            await camera.value?.clearPhoto();
            stepState.photoCaptured = false;
        } else {
            await camera.value?.takePhoto();
            stepState.nextBtnConfig.hidden = false;
            stepState.photoCaptured = true;
        }
    };
</script>

<template>
    <div class="flex flex-col gap-4 items-center">
        <Transition name="slide-fade-reverse" mode="out-in">
            <div v-if="stepState.currentStep === 0" class="column space-y-2 w-full text-center">
                <VText type="title-1" class="uppercase mb-2" color="primary">{{
                    t("systemPages.idDocument.userIdentificationTitle")
                }}</VText>

                <VText type="title-2">{{ t("systemPages.idDocument.officialIDInfo") }}</VText>
                <div class="flex justify-center pt-6">
                    <Form ref="formRef" :form-options="formSchema" class="w-full !md:w-2/3 !lg:1/2" />
                </div>
            </div>
            <div v-else-if="stepState.currentStep === 1" class="flex flex-col gap-8 items-center w-full">
                <div class="text-center">
                    <VText type="title-1" class="uppercase mb-2" color="primary">
                        {{ t("systemPages.idDocument.takePhotoTitle") }}
                    </VText>
                    <VText type="title-2" class="mb-2">
                        {{ t("systemPages.idDocument.showID") }}
                    </VText>
                    <VText type="text-regular-2">
                        {{ t("systemPages.idDocument.possibleIDs") }}
                    </VText>
                </div>
                <div class="flex flex-col !md:flex-row gap-4 w-full justify-evenly items-center">
                    <img :src="IdPicto" alt="" />
                    <VCamera ref="camera" :show-default-buttons="false" />
                    <img :src="justIDOnPhoto" alt="" />
                </div>
                <VButton class="mt-4" type="primary" bordered round size="large" text-size="text-xl" @click="TakePhoto">
                    {{ t(stepState.photoCaptured ? "general.retakePhoto" : "general.takePhoto") }}
                </VButton>
            </div>
        </Transition>
    </div>
</template>
