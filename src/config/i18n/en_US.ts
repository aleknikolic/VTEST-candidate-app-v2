import type { LocalizedContent } from "./../../types/i18n";

export const en_US: LocalizedContent = {
    general: {
        startTitle: "Secure Online Assessment & EXAM",
        startButton: "Start",
        privacyPolicy: "Privacy Policy",
        enterSecureCode: "PLEASE ENTER YOUR SECURE CODE",
        submitButton: "Submit",
        takePhoto: "take photo",
        takePhotoAgain: "take photo again",
        retakePhoto: "re-take photo",
        resultsButton: "RESULTS",
        name: "Name",
        date: "Date",
        iAgree: "I agree",
        nationalID: "National ID",
        passport: "Passport",
        drivingLicense: "Driving license",
        male: "male",
        female: "female",
        other: "other",
        playAudio: "Play audio",
        minNumberOfWords: "Minimum number of words required: {minWords}",
        wordCountInput: "Number of words input:",
        troubleshooting: "Troubleshooting"
    },
    forms: {
        labels: {
            type: "Type",
            idNumber: "ID Number",
            country: "Country",
            dateOfBirth: "Date of birth",
            firstName: "First Name",
            lastName: "Last Name",
            email: "Email",
            gender: "Gender",
            secureCode: "Secure Code",
        },
        errors: {
            empty: "The field {field} can't be empty",
            secureCodeLength: "The secure code must be 9 digits long",
            dataPrivacyNotAccepted: "Kindly agree on all listed below",
        },
        placeholders: {
            writeAnswer: "Write your answer"
        }
    },
    systemPages: {
        audioCheck: {
            title: "Audio Check",
            clickPlay: "Click the PLAY icon to check the sound",
        },
        videoCheck: {
            title: "VIDEO CHECK",
            clickTestCamera: "Click «Test my camera» to check it can be used when necessary",
            button: "TEST MY CAMERA",
        },
        videoIssues: {
            title: "COMMON VIDEO ISSUES",
            basicSteps: "If you're experiencing problems for the video (or photo), you might want to carry out some basic checks first",
            settingsTip: "Check that the camera of your computer are activated: settings > system > camera",
            browserTip: "Check that the camera of your computer are activated on your browser",
        },
        certificatePhoto: {
            title: "TAKE A PHOTO OF YOURSELF",
            takePhoto: "Look at the camera and press «Take photo»",
            displayPhoto: "The photo will be displayed on your score report",
        },
        examDone: {
            title: "YOU HAVE COMPLETED YOUR EXAM",
            resultsSoon: "Your exam results will be delivered soon.",
            resultsAccess: "To access your results & reports, go to:",
        },
        instructionList: {
            title: "INSTRUCTIONS",
            replayAudio: "You can replay the audio as often as you like, as long as there is time remaining on the timer.",
            speakInMicro: "When required speak clearly into your microphone. Notice minimum time could be required.",
            minWordsNumber: "In the writing section, pay attention to the minimum number of words required.",
        },
        microphoneCheck: {
            title: "Microphone Check",
            subtitle: "Click 'SPEAK' and read the text",
            greeting: "Hi! Nice to meet you",
        },
        ready: {
            title: "Your exam will begin in full-screen",
            faceCenter: "Make sure your face stays centered",
            followRules: "Do not leave the full-screen, record, copy-paste or open another application during the exam",
        },
        userConsent: {
            title: "Data Privacy Consent",
            dataTransfer:
                "I hereby explicity concent to any data transfer of my personal data if I am located outside the European Economic Area (EEA), in the context of the above mentioned services.",
            identityConfirmed: "I hereby confirm that the indicated indentity is my own and declare that I am the person taking the exam.",
            processingPersonalData:
                " Further information about your personal data processing, can be found in our privacy policy including how you can withdraw your consent at any time and exercise all the rights provided by the applicable legislation.",
            user: "By: {userFullName}",
            date: "Date: {consentDate}",
            signature: "Signed {consentDate} by {userFullName}",
        },
        userIdentification: {
            title: "User identification",
            completeInfo: "Please complete all information below.",
            verifyInfo: "Verify all information before submitting as this will be displayed on your certification",
        },
        primaryInformation: {
            examDescription: "This version of {examName} is an online proctored exam",
            proceedingTitle: "Before proceeding, you must",
            officialIDCheck: "Have official ID (passport, driver's license, national ID card)",
            placeCheck: "Have access to a quiet space with no one else present",
            timeAvailableCheck: "Have {durationMin} to {durationMax} minutes available, depending on your level",
            goodInternetCheck: "Have a good Internet connection or 4G equivalent, if using your cell phone",
            cameraCheck: "Have a computer with front-facing camera, tablet or smartphone, headphones with microphone, or speakers.",
        },
        proctoringRequirements: {
            stayVisible: "ENSURE YOU STAY VISIBLE",
            stayVisibleContent: "If you don’t respect this requirement your exam results may not be certified ",
            stayInCameraField: "Stay in the camera’s field",
            stayFacingCamera: "Stay facing the camera",
            stayInFullscreen: "DO NOT LEAVE THE FULL-SCREEN",
            stayInFullscreenContent: "If you don’t respect this requirement your exam results may not be certified",
            noExternalSupport: "DO NOT USE ANY EXTERNAL SUPPORT",
            noExternalSupportContent: "If you don’t respect this requirementyour exam results may not be certified",
            noOneElse: "DO NOT ALLOW ANY ONE ELSE IN THE ROOM",
            noOneElseContent: "If you don’t respect this requirement your exam results may not be certified ",
            noSpeaking: "DO NOT SPEAK WHEN NOT REQUIRED",
            noSpeakingContent: "If you don’t respect this requirement your exam results may not be certified",
            cameraMicrophoneOn: "KEEP YOU CAMERA AND MICROPHONE UP AND RUNNING",
            cameraMicrophoneOnContent: "If you don’t respect this requirement your exam results may not be certified",
        },
        idDocument: {
            userIdentificationTitle: "User Identification",
            officialIDInfo: "Enter the information of your official id",
            takePhotoTitle: "TAKE A PHOTO OF YOUR OFFICIAL ID",
            showID: "Present your physical ID to the camera and click ‘Take photo’",
            possibleIDs: "Official ID can include passport, driver’s license, national ID card",
        },
        interview: {
            title: "VIDEO & WRITING INTERVIEW",
            subtitle: "Your VTEST exam is over.",
            instruction: "You can now complete your submission by performing an interview",
            description: "Your interview will not be scored. It is a great opportunity however to demonstrate your abilities and give a sense of your personality.",
            division: "The interview is divided into { partsCount } parts:",
            videoInterview: "A video interview",
            writingActivity: "A writing activity",
            access: "The test center and institutions you share your results with may access your interview"
        }
    },
    questionItems: {
        writingTask: {
            confirmSubmitText: "You haven't reach the minimum number of words. Are you sure you want to submit your answer?",
        },
    },
    errorFlags: {
        PHOTO_MISSING_FACE: "The photo does not contain a face.",
    },
};
