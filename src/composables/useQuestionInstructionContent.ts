import { ComputedRef } from "vue";
import { ItemType, QuestionItem } from "~/types/item";

export enum QuestionInstructionType {
    text = "text",
    image = "image",
    video = "video",
    audio = "audio",
}

export function useQuestionInstructionContent<T extends ItemType[number]>(
    questionContent: QuestionItem<T>,
    scope: "self" | "parent" = "self",
): ComputedRef<{ type: QuestionInstructionType[number]; content: string } | null> {
    return computed(() => {
        if ((scope === "self" && questionContent.content) || (scope === "parent" && questionContent.parent && questionContent.parent.content))
            return {
                type: QuestionInstructionType.text,
                content: (questionContent?.parent?.content ?? questionContent.content) as string,
            };

        if (questionContent.audio || (questionContent.parent && questionContent.parent.audio))
            return {
                type: QuestionInstructionType.audio,
                content: (questionContent?.parent?.audio ?? questionContent.audio) as string,
            };

        return null;
    });
}


