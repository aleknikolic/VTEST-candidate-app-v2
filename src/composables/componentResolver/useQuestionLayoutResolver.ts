import DefaultQuestionLayout from "~/components/Exam/QuestionLayout/DefaultQuestionLayout.vue";
import { ItemLayoutType } from "~/types/item";

export const useQuestionLayoutResolver = (layout: ItemLayoutType) => {
    switch (layout) {
        case ItemLayoutType.default:
            return DefaultQuestionLayout;
        default:
            return DefaultQuestionLayout;
    }
};
