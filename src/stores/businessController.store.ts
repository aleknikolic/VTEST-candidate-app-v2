import { serialize } from "object-to-formdata";
import { defineStore } from "pinia";
import { BusinessController } from "~/api/controllers/business.controller";
import { CustomThemeConfig } from "~/libs/theme/themeManager";
import router from "~/router";
import { AuthRequestOutput, ExamStep } from "~/types/system";

export interface ExamState {
    displayLoader: boolean;
    timerController: ReturnType<typeof useTimerController>;
    session: AuthRequestOutput | null;
    currentStep: ExamStep | null;
    themeConfig: null | CustomThemeConfig;
}

export const useBusinessController = defineStore("businessController", () => {
    const { messageApi } = useReactifiedApi();

    const { subscribe: subscribeTimerEnd, dispatch: dispatchTimerEnd } = useEventDispatcher();
    const { subscribe: subscribeNextError, dispatch: dispatchNextError } = useEventDispatcher<(flagKeys: string[]) => void>();

    const examState = reactive<ExamState>({
        displayLoader: false,
        timerController: useTimerController((params) => {
            console.log("DEBUG: TIMER END::DISPATCH");
            console.log(JSON.stringify(params, null, 2));
            return dispatchTimerEnd();
        }), //,
        session: null,
        currentStep: null,
        themeConfig: null,
    });

    async function StartSession(secureCode: string) {
        const { messageApi, loadingBarApi } = useReactifiedApi();

        try {
            loadingBarApi?.start();
            const { success, data, message } = await BusinessController.startExam({ secureCode, ...(await GetClientInfos()) });

            if (!success) {
                loadingBarApi?.finish?.();
                return Array.isArray(message) ? message.forEach((item) => messageApi.error(item)) : messageApi.error(message ?? "An error occured");
            }

            examState.session = data as AuthRequestOutput;
            examState.displayLoader = true;
            await ResolveNextStep();

            router.push({ name: "exam" });
            loadingBarApi?.finish?.();
        } catch (err: any) {
            loadingBarApi?.finish?.();
            messageApi.error(err?.message ?? err?.response?.data?.message ?? "An error occured");
        }
    }

    async function ResolveNextStep(stepPayload?: any) {
        try {
            console.log("DEBUG: RESOLVE NEXT STEP::START", { prevStepPayload: stepPayload });

            const securityController = useSecurityController();
            examState.displayLoader = true;
            const nextStep = await BusinessController.resolveNextStep(serialize(stepPayload));
            securityController.SetSettings(nextStep.action);

            // HANDLE CASE WHERE NEXT STEP IS THE SAME
            if (examState?.currentStep?._id === nextStep._id) {
                console.log("DEBUG: RESOLVE NEXT STEP::INVALID STEP PAYLOAD - SAME STEP", { nextStep });
                examState.displayLoader = false;
                dispatchNextError(nextStep.content?.errorFlags ?? []);
                return {
                    success: false,
                    message: nextStep?.content?.message,
                    data: nextStep?.data,
                };
            }

            console.log("DEBUG: NEXT STEP READY", { nextStep });

            examState.currentStep = nextStep;
            examState.timerController.SetTimerConfig(nextStep.timer);
            examState.displayLoader = false;
            if (nextStep.timer?.enabled) {
                console.log("DEBUG: TIMER START");
                console.log(JSON.stringify(nextStep.timer, null, 2));
                examState.timerController.StartTimer();
            }

            return { success: true };
        } catch (err) {
            examState.displayLoader = false;
            console.error(err);
            // messageApi.error((err as any)?.message ?? "An error occured");
        }
    }

    function EndSession() {
        examState.session = null;
        examState.currentStep = null;
        examState.themeConfig = null;
    }

    return {
        examState,
        StartSession,
        EndSession,
        ResolveNextStep,
        subscribeTimerEnd,
        subscribeNextError,
    };
});
