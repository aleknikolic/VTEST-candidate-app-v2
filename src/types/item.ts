import { MaybeComputedRef, MaybeRef } from "@vueuse/core";
import { VNodeChild } from "vue";
import { TimerConfigStepState } from "~/composables/useTimerController";
import { ConfirmSubmitAnswer, NextBtnParams, ProgressConfig } from "./system";

export enum ItemLayoutType {
    default = "default",
    schools = "schools",
}

export enum ItemType {
    multipleChoiceQuestion = "VMultipleChoiceQuestion",
    nestedQuestion = "VNestedQuestion",
    taskSpeakingFluency = "VTaskSpeakingFluency",
    taskWriting = "VWriting",
    videoInterview = "VInterviewVideo",
    writingInterview = "VInterviewWriting",
    fillInTheBlank = "VFillInBlank",
    imageCarouselQuestion = "VImageCarouselQuestion",
    speakingReadingTask = "VReadingFluency",
    listenAndRepeat = "VListenAndRepeat",
    audioPictureMatchQuestion = "VAudioPictureMatchQuestion",
}

type MultipleChoiceQuestionPayload = {
    answer: { _id?: string; noSelectedAnswer?: true; timerEnded: boolean };
    answers: any;
};

type TaskSpeakingFluencyPayload = {
    answer: { file: File };
};
type ListenAndRepeatPayload = {
    answer: { file: File };
};
type TaskWritingPayload = {
    answer: { text: string };
};

type VideoInterviewPayload = {
    answer: { file: File };
};

type WritingInterviewPayload = {
    answer: { text: string };
};

type FillInTheBlankPayload = {
    answer: { text: string };
};

type ImageCarouselQuestionPayload = {
    answer: { _id?: string; noSelectedAnswer?: true; timerEnded: boolean };
};

type SpeakingReadingTaskPayload = {
    answer: { file: File };
};

type MyNewTypePayload = {
    answer: { text: string };
};

export type NestedQuestionPayload = {
    answers: Array<{
        question: { _id: string };
        answer: (MultipleChoiceQuestionPayload | TaskSpeakingFluencyPayload)["answer"];
    }>;
};

type AudioPictureMatchQuestionPayload = {
    answer: { _id?: string[]; noSelectedAnswer?: true; timerEnded: boolean };
};

export interface ItemTypeProps<T extends ItemType[number] | undefined = undefined> {
    questionItem: QuestionItem<T>;
    timerRunner: TimerConfigStepState;
    skipToNextTimer: () => void;
}

export interface ItemTypeEmit {
    (e: "next"): void;
}

export type ItemPayloadType<T extends ItemType> = T extends ItemType.fillInTheBlank
    ? FillInTheBlankPayload
    : T extends ItemType.listenAndRepeat
    ? ListenAndRepeatPayload
    : T extends ItemType.multipleChoiceQuestion
    ? MultipleChoiceQuestionPayload
    : T extends ItemType.taskSpeakingFluency
    ? TaskSpeakingFluencyPayload
    : T extends ItemType.taskWriting
    ? TaskWritingPayload
    : T extends ItemType.videoInterview
    ? VideoInterviewPayload
    : T extends ItemType.writingInterview
    ? WritingInterviewPayload
    : T extends ItemType.nestedQuestion
    ? NestedQuestionPayload
    : T extends ItemType.imageCarouselQuestion
    ? ImageCarouselQuestionPayload
    : T extends ItemType.audioPictureMatchQuestion
    ? AudioPictureMatchQuestionPayload
    : T extends ItemType.speakingReadingTask
    ? SpeakingReadingTaskPayload
    : never;

export type ItemTypeExposedState<
    T extends ItemType,
    Base = {
        getStepPayload: (timeout?: boolean) => Promise<ItemPayloadType<T>> | ItemPayloadType<T>;
        nextBtnConfig?: MaybeComputedRef<NextBtnParams> | MaybeRef<NextBtnParams>;
        extraActionSlot?:
            | MaybeRef<null | ((data?: { [key: string]: any }) => VNodeChild)>
            | MaybeComputedRef<null | ((data?: { [key: string]: any }) => VNodeChild)>;
        nextButtonSlot?:
            | MaybeRef<null | ((data?: { [key: string]: any }) => VNodeChild)>
            | MaybeComputedRef<null | ((data?: { [key: string]: any }) => VNodeChild)>;
        confirmSubmitNext?: ConfirmSubmitAnswer;
    },
> = Base;

export type ItemContent = {
    type: "text" | "html" | "audio" | "image";
    content: string;
};

export type QuestionItem<T extends ItemType[number] | undefined = undefined> = {
    _id: string;
    type: T extends ItemType ? T : ItemType;
    layout: string;
    progress?: ProgressConfig;
    instructions:
        | string
        | Array<{
              content: string;
              type: "text" | "audio";
              timer: "preparation" | "answer";
              duration: [number, number];
          }>;
    parentSubject?: string;
    subject?: ItemContent;
    question?: ItemContent;
    props: T extends ItemType.multipleChoiceQuestion
        ? { answers: Array<{ _id: string; content?: string; image?: string }> }
        : T extends ItemType.nestedQuestion
        ? { nestedItems: Array<QuestionItem> }
        : T extends ItemType.taskWriting
        ? { minWords: number }
        : T extends ItemType.videoInterview
        ? {
              minTime: number;
              maxTime: number;
              question: string;
          }
        : T extends ItemType.writingInterview
        ? {
              question: string;
              maxTime: number;
              minimumCharacters: number;
          }
        : T extends ItemType.imageCarouselQuestion
        ? { answers: Array<{ _id: string; image: string }>; audioUrl: string }
        : T extends ItemType.audioPictureMatchQuestion
        ? { answers: Array<{ _id: string; content?: string; image?: string }> }
        : undefined;
};
