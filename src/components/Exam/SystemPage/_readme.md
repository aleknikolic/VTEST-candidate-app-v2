# SYSTEM PAGE WRITING GUIDELINES

### 1/ BOILERPLATE BASE SYSTEM PAGE DEF

```vue
<script setup lang="ts">
    import { PageItem } from "~/types/system";
    import { PageType, PageTypeExposedState, PageTypeProps, PageTypeEmit } from "~/types/page";

    defineEmits<PageTypeEmit>()
    defineProps<PageTypeProps>();
    defineExpose<PageTypeExposedState<PageType>>({
        getStepPayload: () => ({}),
    });
</script>

<template>
    <div class="flex flex-col gap-4 items-center"></div>
</template>
```

On the **defineExpose** AND **defineProps**, don't forget to update the passed generic argument of **PageTypeExposedState** to specify whick page type this is.

### 2/ QUESTION STRUCTURE & ORGANIZATION

The question item should only render the inner content of the question. Layout elements, like the "NEXT" button, the header / footer, or even timer if there's one, are all handled by PageRenderer component

Every page receive the PageItem from its props, and MUST have a defineExpose set with the proper interface, like the example above.

### 3/ EXPOSED STATE

All interactions with the page renderer, and the so the business controller, happens through the exposed state of the page.

```ts
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
}

export interface PageTypeExposedState<T extends PageType> {
    getStepPayload: () => Promise<PagePayloadType<T>> | PagePayloadType<T>;
    nextBtnConfig?: MaybeRef<NextBtnParams>;
    canTriggerNext?: () => boolean | Promise<boolean>;
}
```

As you can see above, depending on the page type specified, different payload needs to be returned by the **getStepPayload** method. For stateless pages, an empty object should be returned.

As pages can have blocking actions (Ex: get user information through form), and the "NEXT" button is controlled by the parent component **PageRenderer**, we need to be able to tell the parent if he can or not trigger the "NEXT" action.

To do this, you can expose a **canTriggerNext** method that should return either a regular function, or a promise, that's going to be called bt PageRenderer to know it the next step can be resolved.

The **nextBtnConfig** prop allow you to control various aspects of the "NEXT" button. Not much is implemented yet, but it'll allow you to do following things : 
- Disable button
- Hide button
- Change button style / position
- Render custom VNode inside button
- ...

