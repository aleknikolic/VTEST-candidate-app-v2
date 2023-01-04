import GroupedQuestion from "~/components/Exam/Question/GroupedQuestion.vue";
import InterviewEssay from "~/components/Exam/Question/InterviewEssay.vue";
import InterviewVideo from "~/components/Exam/Question/InterviewVideo.vue";
import ImageCarouselQuestion from "~/components/Exam/Question/ImageCarouselQuestion.vue";
import MultipleChoiceQuestion from "~/components/Exam/Question/MultipleChoiceQuestion.vue";
import SpeakingReadingTask from "~/components/Exam/Question/SpeakingReadingTask.vue";
import TextQuestion from "~/components/Exam/Question/TextQuestion.vue";
import WritingTaskQuestion from "~/components/Exam/Question/WritingTaskQuestion.vue";
import AudioPictureMatchQuestion from "~/components/Exam/Question/AudioPictureMatchQuestion.vue";
import { ItemType } from "~/types/item";

export const useQuestionItemResolver = (questionType: ItemType) => {
    switch (questionType) {
        case ItemType.multipleChoiceQuestion:
            return MultipleChoiceQuestion;
        case ItemType.nestedQuestion:
            return GroupedQuestion;
        case ItemType.fillInTheBlank:
            return TextQuestion;
        case ItemType.videoInterview:
            return InterviewVideo;
        case ItemType.writingInterview:
            return InterviewEssay;
        case ItemType.imageCarouselQuestion:
            return ImageCarouselQuestion;
        case ItemType.taskSpeakingFluency:
        case ItemType.listenAndRepeat:
        case ItemType.speakingReadingTask:
            return SpeakingReadingTask;
        case ItemType.taskWriting:
            return WritingTaskQuestion;
        case ItemType.audioPictureMatchQuestion:
            return AudioPictureMatchQuestion;
        default:
            return null;
    }
};
