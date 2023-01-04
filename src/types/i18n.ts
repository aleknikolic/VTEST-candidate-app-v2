export type LocalizedContent = {
    general: {
        startTitle: string;
        startButton: string;
        privacyPolicy: string;
        enterSecureCode: string;
        submitButton: string;
        takePhoto: string;
        takePhotoAgain: string;
        retakePhoto: string;
        resultsButton: string;
        name: string;
        date: string;
        iAgree: string;
        nationalID: string;
        passport: string;
        drivingLicense: string;
        male: string;
        female: string;
        other: string;
        playAudio: string;
        minNumberOfWords: string;
        wordCountInput: string;
        troubleshooting: string;
    };
    forms: {
        labels: {
            type: string;
            idNumber: string;
            country: string;
            dateOfBirth: string;
            firstName: string;
            lastName: string;
            email: string;
            gender: string;
            secureCode: string;
        };
        errors: {
            empty: string;
            secureCodeLength: string;
            dataPrivacyNotAccepted: string;
        };
        placeholders: {
            writeAnswer: string;
        }
    };
    systemPages: {
        audioCheck: {
            title: string;
            clickPlay: string;
        };
        videoCheck: {
            title: string;
            clickTestCamera: string;
            button: string;
        };
        videoIssues: {
            title: string;
            basicSteps: string;
            settingsTip: string;
            browserTip: string;
        };
        certificatePhoto: {
            title: string;
            takePhoto: string;
            displayPhoto: string;
        };
        examDone: { 
            title: string; 
            resultsSoon: string; 
            resultsAccess: string 
        };
        instructionList: { 
            title: string; 
            replayAudio: string; 
            speakInMicro: string; 
            minWordsNumber: string;
        };
        microphoneCheck: { 
            title: string; 
            subtitle: string; 
            greeting: string;
        };
        ready: { 
            title: string; 
            faceCenter: string; 
            followRules: string;
        };
        userConsent: {
            title: string;
            dataTransfer: string;
            identityConfirmed: string;
            processingPersonalData: string;
            user: string;
            date: string;
            signature: string;
        };
        userIdentification: { 
            title: string; 
            completeInfo: string;
            verifyInfo: string;
        };
        primaryInformation: {
            examDescription: string;
            proceedingTitle: string;
            officialIDCheck: string;
            placeCheck: string;
            timeAvailableCheck: string;
            goodInternetCheck: string;
            cameraCheck: string;
        };
        proctoringRequirements: {
            stayVisible: string;
            stayVisibleContent: string;
            stayInCameraField: string;
            stayFacingCamera: string;
            stayInFullscreen: string;
            stayInFullscreenContent: string;
            noExternalSupport: string;
            noExternalSupportContent: string;
            noOneElse: string;
            noOneElseContent: string;
            noSpeaking: string;
            noSpeakingContent: string;
            cameraMicrophoneOn: string;
            cameraMicrophoneOnContent: string;
        };
        idDocument: {
            userIdentificationTitle: string;
            officialIDInfo: string;
            takePhotoTitle: string;
            showID: string;
            possibleIDs: string;
        };
        interview: {
            title: string;
            subtitle: string;
            instruction: string;
            description: string;
            division: string;
            videoInterview: string;
            writingActivity: string;
            access: string;
        };
    };
    questionItems: {
        writingTask: {
            confirmSubmitText: string;
        };
    };
    errorFlags: {
        PHOTO_MISSING_FACE: string;
    };
};
