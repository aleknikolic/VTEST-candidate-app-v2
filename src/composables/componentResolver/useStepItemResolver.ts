import PageRenderer from "~/components/Exam/Renderer/PageRenderer.vue";
import QuestionRenderer from "~/components/Exam/Renderer/QuestionRenderer.vue";
import { StepType } from "~/types/step";

export const useStepItemResolver = (stepType: StepType) => {
    switch (stepType) {
        case StepType.page:
            return PageRenderer;
        case StepType.item:
            return QuestionRenderer;
        default:
            return null;
    }
};
