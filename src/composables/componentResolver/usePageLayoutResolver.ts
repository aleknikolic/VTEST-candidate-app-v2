import DefaultPageLayout from "~/components/Exam/PageLayout/DefaultPageLayout.vue";
import { PageLayoutType } from "~/types/page";

export const usePageLayoutResolver = (layout: PageLayoutType) => {
    switch (layout) {
        case PageLayoutType.default:
            return DefaultPageLayout;
        default:
            return DefaultPageLayout;
    }
};
