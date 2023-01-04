import { MaybeComputedRef, MaybeRef } from "@vueuse/core";
import { VNodeChild } from "vue";
import { ItemContent } from "./item";
import { NextBtnParams } from "./system";

export enum PageLayoutType {
    default = "default",
}

export enum PageType {
    userPersonnalData = "personalData",
    customPage = "customPage",
    idDocumentPhoto = "idDocumentPhoto",
    candidatePhoto = "candidatePhoto",
    groupedQuestionDescription = "groupedQuestionDescription",
    examCompleted = "examCompleted",
    systemResources = "systemResources",
    videoTest = "videoTest",
    audioTest = "audioTest",
    ready = "ready",
    userConsent = "userConsent",
    companionSelect = "companionSelect",
    microphoneTest = "microphoneTest",
    beginExam = "beginExam",
    primaryInformation = "primaryInformation",
    instruction = "instruction",
    proctoringRequirements = "proctoringRequirements",
    interviewIntro = "interviewIntro",
}

export type UserPersonalDataPayload = {
    firstName: string;
    lastName: string;
    email: string;
    gender: "male" | "female" | "other";
    country: string;
};

export type CandidatePhotoPayload = {
    file: File;
};

export type IdDocumentPhotoPayload = {
    file: File;
    idDocType: string;
    idDocNumber: string;
    idContry: string;
    birthDate: string;
};

export type UserConsentPayload = {
    dataTransfer: boolean;
    identityConfirmed: boolean;
    processingPersonalData: boolean;
    consentSignedBy: string;
    consentDate: string;
};

export type CustomPagePayload = Record<string, never>;

export type GroupedQuestionDescription = Record<string, never>;

export type PagePayloadType<T extends PageType> = T extends PageType.userPersonnalData
    ? UserPersonalDataPayload
    : T extends PageType.candidatePhoto
    ? CandidatePhotoPayload
    : T extends PageType.idDocumentPhoto
    ? IdDocumentPhotoPayload
    : T extends PageType.userConsent
    ? UserConsentPayload
    : T extends PageType.customPage
    ? CustomPagePayload
    : T extends PageType.groupedQuestionDescription
    ? GroupedQuestionDescription
    : Record<string, never>;

export interface PageTypeProps<T extends PageType[number] | undefined = undefined> {
    pageItem: PageItem<T>;
}

export interface PageTypeEmit {
    (e: "next"): void;
}

export interface PageTypeExposedState<T extends PageType> {
    getStepPayload: () => Promise<PagePayloadType<T>> | PagePayloadType<T>;
    nextBtnConfig?: MaybeRef<NextBtnParams> | MaybeComputedRef<NextBtnParams>;
    canTriggerNext?: () => boolean | Promise<boolean>;
    extraActionSlot?:
        | MaybeRef<null | ((data?: { [key: string]: any }) => VNodeChild)>
        | MaybeComputedRef<null | ((data?: { [key: string]: any }) => VNodeChild)>;
    onSubmitError?: (flags: string[]) => void;
}

export type PageItem<T extends PageType[number] | undefined = undefined> = {
    _id: string;
    type: T extends undefined ? PageType[number] : T;
    content?: string;
    showResultsButton?: boolean;
    props: T extends PageType.userConsent
        ? {
              processingPersonalData?: boolean;
              dataTransfer?: boolean;
              identityConfirmed?: boolean;
              firstName: string;
              lastName: string;
          }
        : T extends PageType.audioTest
        ? {
              audioUrl: string;
              issuesContent: string;
          }
        : T extends PageType.videoTest
        ? { issuesContent: string }
        : T extends PageType.interviewIntro
        ? {
              videoExercise: boolean;
              essayExercise: boolean;
          }
        : T extends PageType.groupedQuestionDescription
        ? { subject?: ItemContent; question?: ItemContent }
        : T extends PageType.primaryInformation
        ? { examName: string; durationMin: number; durationMax: number }
        : undefined;
};

export enum SystemPageErrorFlags {
    MissingFace = "PHOTO_MISSING_FACE",
    NotDocument = "PHOTO_NOT_DOCUMENT",
    EmailRequired = "EMAIL_REQUIRED",
    FirstNameRequired = "FIRST_NAME_REQUIRED",
    LastNameRequired = "LAST_NAME_REQUIRED",
    CountryRequired = "COUNTRY_REQUIRED",
    PhotoRequired = "PHOTO_REQUIRED",
    ProcessingPersonalData = "PROCESSING_PERSONAL_DATA",
    IdentityConfirmed = "IDENTITY_CONFIRMED",
    DataTransfer = "DATA_TRANSFER",
    ConsentSigned = "CONSENT_SIGNED",
    Error = "ERROR",
}
