import { ItemLayoutType, ItemType, QuestionItem } from "~/types/item";
import { ItemTypeExposedState } from "../types/item";
import { ContentType } from "../types/system";
import { ExamStep } from "~/types/system";
import { ComputedRef } from "vue";
import { ExamState } from "~/stores/businessController.store";
import { PageItem, PageLayoutType, PageType, PageTypeExposedState } from "~/types/page";
import { usePageLayoutResolver } from "./componentResolver/usePageLayoutResolver";
import { useSystemPageResolver } from "./componentResolver/useSystemPageResolver";
import { useQuestionItemResolver } from "./componentResolver/useQuestionItemResolver";
import { NScrollbar } from "naive-ui";
import { useDropdownActions } from "./useDropdownActions";
import { useQuestionLayoutResolver } from "./componentResolver/useQuestionLayoutResolver";
import VStepOutputPrint from "~/elements/VStepOutputPrint.vue";

type GenericExamStep = ExamStep<ContentType.systemPage> | ExamStep<ContentType.page> | ExamStep<ContentType.item>;

export const useDevStepController = <T extends "page" | "item">(stepConfig: ComputedRef<GenericExamStep | null>) => {
    const router = useRouter();

    const { subscribe: subscribeTimerEnd, dispatch: dispatchTimerEnd } = useEventDispatcher();

    const resetKey = ref(0);
    const stepState = reactive<Omit<ExamState, "session" | "displayLoader" | "themeConfig">>({
        timerController: useTimerController(() => dispatchTimerEnd()),
        currentStep: null,
    });

    const renderedLayout = computed(() =>
        ["page", "system_page"].includes(stepConfig.value?.contentType as ContentType[number])
            ? usePageLayoutResolver((stepState.currentStep?.content as QuestionItem).layout as PageLayoutType)
            : useQuestionLayoutResolver((stepState.currentStep?.content as QuestionItem).layout as ItemLayoutType),
    );
    const renderedStep = computed(() =>
        ["page", "system_page"].includes(stepConfig.value?.contentType as ContentType[number])
            ? useSystemPageResolver(stepState.currentStep?.content.type as PageType)
            : useQuestionItemResolver(stepConfig.value?.content.type as ItemType),
    );
    const stepItem = computed(() => stepConfig.value?.content as T extends "page" ? PageItem : QuestionItem);
    const stepRef = ref<T extends "page" ? PageTypeExposedState<PageType> : ItemTypeExposedState<ItemType>>();

    const InitalizeStep = (nextStep: GenericExamStep) => {
        resetKey.value++;
        stepState.currentStep = nextStep;
        stepState.timerController.SetTimerConfig(nextStep.timer);
        if (stepState.timerController.enabled) stepState.timerController.StartTimer();
    };

    const Reset = () => {
        if (!stepConfig.value) throw new Error("No step config provided");
        InitalizeStep(stepConfig.value);
    };

    const SubmitPayload = async (timeout?: boolean) => {
        if (stepConfig.value?.contentType === ContentType.systemPage) {
            const stepController = stepRef.value as PageTypeExposedState<PageType>;
            if (stepController?.canTriggerNext && !(await stepController.canTriggerNext())) return false;
        }

        if (stepState.timerController.enabled) stepState.timerController.PauseTimer();
        const stepPayload = await stepRef.value?.getStepPayload(timeout);
        const reset = await useConfirmDialog({
            type: "info",
            title: "STEP COMPLETED",
            content: () => (
                <NScrollbar style="max-height: 500px;">
                    <VStepOutputPrint data={stepPayload} />
                </NScrollbar>
            ),
            positiveText: "RESET STEP STATE",
            negativeText: "RETURN TO PAGES INDEX",
            style: "width: 100%; max-width: 800px;",
        });

        if (reset) Reset();
        else router.push({ name: "_dev.sampleList" });
    };

    const cancelSubscription = subscribeTimerEnd(() => SubmitPayload(true));
    onUnmounted(() => cancelSubscription());

    watch(
        () => stepConfig.value,
        (newVal) => newVal && InitalizeStep(newVal),
        { immediate: true, deep: true },
    );

    return {
        stepState,
        resetKey,
        renderedLayout,
        renderedStep,
        stepItem,
        stepRef,
        options: useDropdownActions([
            { label: "RESET SAMPLE   STATE", action: Reset },
            { label: "RETURN TO SAMPLES LIST", action: () => router.push({ name: "_dev.sampleList" }) },
        ]),
        Reset,
        SubmitPayload,
    };
};
