import { ItemType, QuestionItem } from "~/types/item";
import { ExamStep, ActionConfig, TimerConfig, ContentType } from "~/types/system";
import { PageItem, PageType } from "~/types/page";

export type StepSample<T extends "page" | "item", Y = T extends "page" ? PageType[number] : ItemType[number]> = {
    label: string;
    description?: string;
    type: Y;
    value: {
        _id: string;
        contentType: T extends "page" ? "system_page" : "item";
        content: T extends "page" ? PageItem<T> : QuestionItem<Y>;
        action: ActionConfig;
        timer: TimerConfig;
    };
};

export const PageStepSamples: StepSample<"page">[] = [
    {
        type: PageType.userPersonnalData,
        label: "Personnal data page",
        value: {
            _id: "53ea95f288bbb96e9dc15ccb",
            contentType: "system_page",
            content: {
                _id: "53ea95f288bbb96e9dc15ccb",
                type: "personalData",
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: false,
            },
        },
    },
    {
        type: PageType.candidatePhoto,
        label: "candidate photo page",
        value: {
            _id: "53ea95f288bbb96e9dc15ccb",
            contentType: "system_page",
            content: {
                _id: "53ea95f288bbb96e9dc15ccb",
                type: PageType.candidatePhoto,
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: false,
            },
        },
    },
    {
        type: PageType.idDocumentPhoto,
        label: "id document photo page",
        value: {
            _id: "53ea95f288bbb96e9dc15ccb",
            contentType: "system_page",
            content: {
                _id: "53ea95f288bbb96e9dc15ccb",
                type: PageType.idDocumentPhoto,
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: false,
            },
        },
    },
    {
        type: "audioTest",
        label: "AudioTest page",
        value: {
            _id: "633d9f3409b9e0adf54069c5",
            contentType: "system_page",
            content: {
                _id: "633d9f3409b9e0adf54069c5",
                type: "audioTest",
                props: {
                    audioUrl: "https://d8m9pbgv16752.cloudfront.net/testAssets/test/HelloEnglish_Matthew.mp3",
                    issuesContent:
                        "<p>If you are experiencing problems for the audio, you might want to carry out some basic checks:</p><ul><li>Check that the sound of your computer is not muted</li><li>Check that the speakers of your computer are activated : settings > system > sound</li><li>If the problem continues, please contact your IT department so they can check out your computer</li></ul>",
                    issuesTitle: "Common audio issues",
                },
            },
            timer: {
                enabled: false,
            },
        },
    },
    {
        type: PageType.videoTest,
        label: "VideoTest page",
        value: {
            _id: "633d9f3409b9e0adf54069c5",
            contentType: "system_page",
            content: {
                _id: "633d9f3409b9e0adf54069c5",
                type: PageType.videoTest,
                props: {
                    audioUrl: "https://d8m9pbgv16752.cloudfront.net/testAssets/test/HelloEnglish_Matthew.mp3",
                    issuesContent:
                        "<p>If you are experiencing problems for the audio, you might want to carry out some basic checks:</p><ul><li>Check that the sound of your computer is not muted</li><li>Check that the speakers of your computer are activated : settings > system > sound</li><li>If the problem continues, please contact your IT department so they can check out your computer</li></ul>",
                    issuesTitle: "Common audio issues",
                },
            },
            timer: {
                enabled: false,
            },
        },
    },
    {
        type: "userConsent",
        label: "User Consent",
        value: {
            _id: "633c39d309b9e0adf54069c1",
            contentType: "system_page",
            content: {
                _id: "633c39d309b9e0adf54069c1",
                type: "userConsent",
                props: {
                    dataTransfer: true,
                    identityConfirmed: true,
                },
            },
            action: {
                allowPause: false,
                fullscreen: false,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: false,
            },
        },
    },
    {
        type: PageType.proctoringRequirements,
        label: "Proctoring Requirements",
        value: {
            _id: "633c39d309b9e0adf54069c2",
            contentType: "system_page",
            content: {
                _id: "633c39d309b9e",
                type: PageType.proctoringRequirements,
                props: {},
            },
            action: {
                allowPause: false,
                fullscreen: false,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: false,
            },
        },
    },
    {
        type: PageType.primaryInformation,
        label: "Primary information",
        value: {
            _id: "633c39d309b9e0adf54069c2",
            contentType: "system_page",
            content: {
                _id: "633c39d309b9e",
                type: PageType.primaryInformation,
                props: {
                    examName: "VTEST ENGLISH - 4 SKILLS",
                    durationMin: 20,
                    durationMax: 30,
                },
            },
            action: {
                allowPause: false,
                fullscreen: false,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: false,
            },
        },
    },
    {
        type: PageType.groupedQuestionDescription,
        label: "GROUPED QUESTION DESCRIPTION",
        value: {
            _id: "633c39d309b9e0adf54069c3",
            contentType: "system_page",
            content: {
                _id: "635829aa70d62c9ed28d745e",
                type: PageType.groupedQuestionDescription,
                instructions: "Please read the following instructions carefully. Then answer the following 3 questions.",
                props: {
                    subject: {
                        type: "html",
                        content:
                            "Hi Roberto, I need to see you about the new production line in Athens. I’m afraid we have a quality problem. I will be in Athens next week. I could meet you on Wednesday 5th at any time or on Thursday 6th after 2.30pm. Could you confirm which date is best for you? Best, Gilles. Hi Roberto, I need to see you about the new production line in Athens. I’m afraid we have a quality problem. I will be in Athens next week. I could meet you on Wednesday 5th at any time or on Thursday 6th after 2.30pm. Could you confirm which date is best for you? Best, Gilles. n line in Athens. I’m afraid we have a quality problem. I will be in Athens next week. I could meet you on Wednesday 5th at any time or on Thursday 6th after 2.30pm. Could you confirm which date is best for you? Best, Gilles. Hi Roberto, I need to see you about the new production line in Athens. I’m afraid we have a quality problem. I will be in Athens next week. I could meet you on Wednesday 5th at any time or on Thursday 6th after 2.30pm. Could you confirm which date is best for you? Best, Gilles",
                    },
                },
            },
            timer: {
                enabled: true,
                preparation: {
                    duration: 100,
                    warning: 10,
                },
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
        },
    },
    {
        type: PageType.interviewIntro,
        label: "Interview Intro",
        value: {
            _id: "53ea95f288bbb96e9dc15ccb",
            contentType: "system_page",
            content: {
                _id: "53ea95f288bbb96e9dc15ccb",
                type: PageType.interviewIntro,
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: false,
            },
        },
    },
];

export const ItemStepSamples: StepSample<"item">[] = [
    {
        type: ItemType.multipleChoiceQuestion,
        label: "MCQ WITH AUDIO INSTRUCTION",
        value: {
            _id: "6372143545461c4e91b536bc",
            contentType: "item",
            content: {
                _id: "6372143545461c4e91b536be",
                type: "VMultipleChoiceQuestion",
                layout: "default",
                instructions: "Please read the text below and then answer the 3 related questions",
                subject: {
                    type: "html",
                    content:
                        "Dear Maggie, Just to say that my mobile phone isn’t working at the moment.  Here is my office telephone number: 07984685. I’m not at the office today - I’m in Milan for a trade fair today and tomorrow.  I’ll be back at the office on Thursday. Can we speak around 10am? Regards, Pedro",
                },
                question: {
                    type: "text",
                    content: "Question 3 / 3:",
                },
                props: {
                    answers: [
                        {
                            _id: "6351a217ab7e121d57615254",
                            content: "Pedro wants to speak to Maggie on Thursday morning.",
                        },
                        {
                            _id: "6351a217ab7e121d57615255",
                            content: "Pedro wants to speak to Maggie today.",
                        },
                        {
                            _id: "6351a217ab7e121d57615256",
                            content: "Pedro wants to speak to Maggie at 10am tomorrow.",
                        },
                        {
                            _id: "6351a217ab7e121d57615257",
                            content: "Pedro wants to meet Maggie tomorrow.",
                        },
                    ],
                },
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: true,
                displayTimer: true,
                answer: {
                    duration: 15,
                    warning: 10,
                },
            },
        },
    },
    {
        label: "WRITING TASK",
        type: ItemType.taskWriting,
        value: {
            _id: "6372143545461c4e91b536bc",
            contentType: "item",
            content: {
                _id: "6372143545461c4e91b536be",
                type: ItemType.taskWriting,
                layout: "default",
                instructions: "Please read the text below and then answer the 3 related questions",
                subject: {
                    type: "html",
                    content:
                        "Dear Maggie, Just to say that my mobile phone isn’t working at the moment.  Here is my office telephone number: 07984685. I’m not at the office today - I’m in Milan for a trade fair today and tomorrow.  I’ll be back at the office on Thursday. Can we speak around 10am? Regards, Pedro",
                },
                question: {
                    type: "text",
                    content: "Question 3 / 3:",
                },
                props: {
                    minWords: 10,
                },
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: true,
                displayTimer: true,
                preparation: {
                    duration: 5,
                    warning: 2,
                },
                answer: {
                    duration: 15,
                    warning: 10,
                },
            },
        },
    },
    {
        type: ItemType.speakingReadingTask,
        label: "READING FLUENCY",
        value: {
            _id: "6372143545461c4e91b536bc",
            contentType: "item",
            content: {
                _id: "6372143545461c4e91b536be",
                type: ItemType.speakingReadingTask,
                layout: "default",
                instructions: "Please read the text below and then answer the 3 related questions",
                subject: {
                    type: "html",
                    content:
                        "Dear Maggie, Just to say that my mobile phone isn’t working at the moment.  Here is my office telephone number: 07984685. I’m not at the office today - I’m in Milan for a trade fair today and tomorrow.  I’ll be back at the office on Thursday. Can we speak around 10am? Regards, Pedro",
                },
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: true,
                displayTimer: true,
                preparation: {
                    duration: 5,
                    warning: 2,
                },
                answer: {
                    duration: 15,
                    warning: 10,
                },
            },
        },
    },
    {
        type: ItemType.listenAndRepeat,
        label: "LISTEN & REPEAT",
        value: {
            _id: "6372143545461c4e91b536bc",
            contentType: "item",
            content: {
                _id: "6372143545461c4e91b536be",
                type: ItemType.listenAndRepeat,
                layout: "default",
                instructions: "Please read the text below and then answer the 3 related questions",
                subject: {
                    type: "audio",
                    content: "https://d8m9pbgv16752.cloudfront.net/testAssets/items/ListenRepeat_LevelA_Pool3_1_UkMale.mp3",
                    options: {
                        audioPlayerLayout: "vertical",
                        maxReplays: 3,
                    },
                },
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: true,
                displayTimer: true,
                preparation: {
                    duration: 10,
                    warning: 5,
                },
                answer: {
                    duration: 10,
                    warning: 5,
                },
            },
        },
    },
    {
        type: ItemType.nestedQuestion,
        label: "GROUPED QUESTION - MCQ",
        value: {
            _id: "6372143545461c4e91b536bc",
            contentType: "item",
            content: {
                _id: "6372143545461c4e91b536be",
                type: ItemType.nestedQuestion,
                layout: "default",
                instructions: "Please read the text below and then answer the 3 related questions",
                subject: {
                    type: "html",
                    content:
                        "Dear Maggie, Just to say that my mobile phone isn’t working at the moment.  Here is my office telephone number: 07984685. I’m not at the office today - I’m in Milan for a trade fair today and tomorrow.  I’ll be back at the office on Thursday. Can we speak around 10am? Regards, Pedro",
                },
                props: {
                    nestedItems: Array.from({ length: 3 }, (_, i) => ({
                        _id: `nested-item-${i}`,
                        type: ItemType.multipleChoiceQuestion,
                        question: {
                            type: "text",
                            content: `Question ${i + 1} / 3:`,
                        },
                        props: {
                            answers: [
                                {
                                    _id: `nested-item-${i}-answer-1`,
                                    content: "Pedro wants",
                                },
                                {
                                    _id: `nested-item-${i}-answer-2`,
                                    content: "Pedro wants",
                                },
                                {
                                    _id: `nested-item-${i}-answer-3`,
                                    content: "Pedro wants",
                                },
                                {
                                    _id: `nested-item-${i}-answer-4`,
                                    content: "Pedro wants",
                                },
                            ],
                        },
                    })),
                },
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: true,
                displayTimer: true,
                preparation: {
                    duration: 5,
                    warning: 2,
                },
                answer: {
                    duration: 200,
                    warning: 10,
                },
            },
        },
    },
    {
        type: ItemType.imageCarouselQuestion,
        label: "MCQ CAROUSEL IMAGE",
        value: {
            _id: "6372143545461c4e91b536bc",
            contentType: "item",
            content: {
                _id: "6372143545461c4e91b536be",
                type: ItemType.imageCarouselQuestion,
                layout: "default",
                instructions: "Please read the text below and then answer the 3 related questions",
                subject: {
                    type: "html",
                    content:
                        "Dear Maggie, Just to say that my mobile phone isn’t working at the moment.  Here is my office telephone number: 07984685. I’m not at the office today - I’m in Milan for a trade fair today and tomorrow.  I’ll be back at the office on Thursday. Can we speak around 10am? Regards, Pedro",
                },
                question: {
                    type: "text",
                    content: "Question 3 / 3:",
                },
                props: {
                    answers: [
                        {
                            _id: "6351a217ab7e121d57615254",
                            image: "https://i.picsum.photos/id/301/800/400.jpg?hmac=HCkZOZIwVBtxbSDf23aVDx8E1O-ukSN48IHGf2xlAWI",
                        },
                        {
                            _id: "6351a217ab7e121d57615255",
                            image: "https://i.picsum.photos/id/301/800/400.jpg?hmac=HCkZOZIwVBtxbSDf23aVDx8E1O-ukSN48IHGf2xlAWI",
                        },
                        {
                            _id: "6351a217ab7e121d57615256",
                            image: "https://i.picsum.photos/id/301/800/400.jpg?hmac=HCkZOZIwVBtxbSDf23aVDx8E1O-ukSN48IHGf2xlAWI",
                        },
                        {
                            _id: "6351a217ab7e121d57615257",
                            image: "https://i.picsum.photos/id/301/800/400.jpg?hmac=HCkZOZIwVBtxbSDf23aVDx8E1O-ukSN48IHGf2xlAWI",
                        },
                    ],
                },
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: true,
                displayTimer: true,
                answer: {
                    duration: 15,
                    warning: 10,
                },
            },
        },
    },
    {
        type: ItemType.audioPictureMatchQuestion,
        label: "Audio Picture Match",
        value: {
            _id: "6372143545461c4e91b536bc",
            contentType: "item",
            content: {
                _id: "6372143545461c4e91b536be",
                type: ItemType.audioPictureMatchQuestion,
                layout: "default",
                instructions: "Please read the text below and then answer the 3 related questions",
                question: {
                    type: "text",
                    content: "Choose the right image:",
                },
                props: {
                    answers: [
                        {
                            _id: "123456789__1",
                            image: "https://preprod2.candidate.vtest.com/test-assets/4Schools_Pilot_V1/items/L1.0_jacket.png",
                        },
                        {
                            _id: "123456789__2",
                            image: "https://preprod2.candidate.vtest.com/test-assets/4Schools_Pilot_V1/items/L1.8_dog.png",
                        },
                        {
                            _id: "123456789__3",
                            image: "https://preprod2.candidate.vtest.com/test-assets/4Schools_Pilot_V1/items/L1.9_bread.png",
                        },
                        {
                            _id: "123456789__4",
                            image: "https://preprod2.candidate.vtest.com/test-assets/4Schools_Pilot_V1/items/L1.5_blue_eye.png",
                        },
                        {
                            _id: "123456789__5",
                            image: "https://preprod2.candidate.vtest.com/test-assets/4Schools_Pilot_V1/items/L1.2_kite.png",
                        },
                        {
                            _id: "123456789__6",
                            image: "https://preprod2.candidate.vtest.com/test-assets/4Schools_Pilot_V1/items/L1.6_cat.png",
                        },
                        {
                            _id: "123456789__7",
                            image: "https://preprod2.candidate.vtest.com/test-assets/4Schools_Pilot_V1/items/L1.4_mouse.png",
                        },
                        {
                            _id: "123456789__8",
                            image: "https://preprod2.candidate.vtest.com/test-assets/4Schools_Pilot_V1/items/L1.3_watermelon.png",
                        },
                        {
                            _id: "123456789__9",
                            image: "https://preprod2.candidate.vtest.com/test-assets/4Schools_Pilot_V1/items/L1.7_house.png",
                        },
                        {
                            _id: "123456789__10",
                            image: "https://preprod2.candidate.vtest.com/test-assets/4Schools_Pilot_V1/items/L1.1_frog.png",
                        },
                    ],
                },
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: true,
                displayTimer: true,
                answer: {
                    duration: 45,
                    warning: 1,
                },
            },
        },
    },
    {
        type: ItemType.videoInterview,
        label: "Video Interview",
        value: {
            _id: "6372143545461c4e91b536bc",
            contentType: "item",
            content: {
                _id: "6372143545461c4e91b536be",
                type: ItemType.videoInterview,
                layout: "default",
                instructions: "Select the correct answer",
                question: {
                    type: "text",
                    content: "Question 1 / 3:",
                },
                props: {
                    question: "Introduce yourself briefly (name, age, nationality, family, where you live, etc…)"
                },
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: true,
                displayTimer: true,
                answer: {
                    duration: 45,
                    warning: 10,
                },
            },
        },
    },
    {
        type: ItemType.writingInterview,
        label: "Writing Interview",
        value: {
            _id: "6372143545461c4e91b536bc",
            contentType: "item",
            content: {
                _id: "6372143545461c4e91b536be",
                type: ItemType.writingInterview,
                layout: "default",
                instructions: "Write the answer to the question in less then 1 minute 30 seconds",
                question: {
                    type: "text",
                    content: "Activity 1 / 5:",
                },
                props: {
                    question: "Talk briefly about your professional ambitions",
                    minimumCharacters: 80
                },
            },
            action: {
                allowPause: false,
                fullscreen: true,
                photocheck: false,
                audioCheck: false,
                block: false,
            },
            timer: {
                enabled: true,
                displayTimer: true,
                answer: {
                    duration: 90,
                    warning: 10,
                },
            },
        },
    },
];
