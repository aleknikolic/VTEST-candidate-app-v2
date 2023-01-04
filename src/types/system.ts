import { ComputedRef, Ref } from "vue";
import { QuestionItem } from "~/types/item";
import { PageItem } from "./page";
export interface AuthRequestPayload {
    secureCode: string;
    ipAddress: string;
    browser: string;
    os: string;
    userAgent: string;
    isMobile: boolean;
}

export interface AuthRequestOutput {
    exam: string;
    secureCode: string;
    type: "standard" | "blank";
    accessToken: string;
}

export interface TimerConfig {
    enabled?: boolean;
    displayTimer?: boolean;
    preparation?: {
        allowPause?: boolean;
        duration: number;
        warning: number;
    };
    answer?: {
        allowPause?: boolean;
        duration: number;
        warning: number;
    };
}

export interface ActionConfig {
    allowPause: boolean;
    fullscreen: boolean;
    photocheck: boolean;
    audioCheck: boolean;
    block: boolean;
}

export interface ProgressConfig {
    label: string;
    current: number;
    total: number;
}

export enum ContentType {
    item = "item",
    page = "page",
    systemPage = "system_page",
}

export interface ExamStep<T extends ContentType | undefined = undefined> {
    _id: string; // unique id for tracking purposes
    contentType: ContentType[number];
    content: (T extends undefined ? (PageItem | QuestionItem) & { message?: string } : T extends ContentType.page ? PageItem : QuestionItem) & {
        errorFlags?: string[];
    };
    action: ActionConfig;
    timer: TimerConfig;
    data?: {
        [key: string]: any;
    };
}

export interface NextBtnParams {
    hidden?: boolean;
    type?: "default" | "timer";
    text?: string;
    disabled?: boolean;
    timerConfig?: object;
}

export interface VCameraExposedState {
    takePhoto: () => Promise<File>;
    cropPhoto: () => Promise<File>;
    clearPhoto: () => void;
}

export type ConfirmSubmitAnswer = {
    text: string;
    showConfirm: Ref<boolean> | ComputedRef<boolean>;
};
