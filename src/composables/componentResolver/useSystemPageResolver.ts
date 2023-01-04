import AudioTestPage from "~/components/Exam/SystemPage/AudioTestPage.vue";
import CameraTestPage from "~/components/Exam/SystemPage/CameraTestPage.vue";
import CertificatePhotoPage from "~/components/Exam/SystemPage/CertificatePhoto.vue";
import ExamDonePage from "~/components/Exam/SystemPage/ExamDone.vue";
import GroupedQuestionDescription from "~/components/Exam/SystemPage/GroupedQuestionDescription.vue";
import IdDocumentPhotoPage from "~/components/Exam/SystemPage/IdDocumentPhoto.vue";
import InstructionList from "~/components/Exam/SystemPage/InstructionList.vue";
import InterviewIntro from "~/components/Exam/SystemPage/InterviewIntro.vue";
import MicrophoneTest from "~/components/Exam/SystemPage/MicrophoneTest.vue";
import ProctoringRequirementsPage from "~/components/Exam/SystemPage/ProctoringRequirementsPage.vue";
import ReadyPage from "~/components/Exam/SystemPage/ReadyPage.vue";
import UserConsent from "~/components/Exam/SystemPage/UserConsent.vue";
import UserIdentificationPage from "~/components/Exam/SystemPage/UserIdentification.vue";
import PrimaryInformation from "~/components/Exam/SystemPage/PrimaryInformation.vue";
import { PageType } from "~/types/page";
import CustomPage from "~/components/Exam/SystemPage/CustomPage.vue";

export const useSystemPageResolver = (pageKey: PageType) => {
    switch (pageKey) {
        case PageType.customPage:
            return CustomPage;
        case PageType.userPersonnalData:
            return UserIdentificationPage;
        case PageType.userConsent:
            return UserConsent;
        case PageType.audioTest:
            return AudioTestPage;
        case PageType.videoTest:
            return CameraTestPage;
        case PageType.candidatePhoto:
            return CertificatePhotoPage;
        case PageType.idDocumentPhoto:
            return IdDocumentPhotoPage;
        case PageType.examCompleted:
            return ExamDonePage;
        case PageType.companionSelect:
            return null;
        case PageType.groupedQuestionDescription:
            return GroupedQuestionDescription;
        case PageType.microphoneTest:
            return MicrophoneTest;
        case PageType.ready:
            return ReadyPage;
        case PageType.primaryInformation:
            return PrimaryInformation;
        case PageType.instruction:
            return InstructionList;
        case PageType.proctoringRequirements:
            return ProctoringRequirementsPage;
        case PageType.interviewIntro:
            return InterviewIntro;
        default:
            return null;
    }
};
