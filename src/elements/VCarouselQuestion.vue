<script setup lang="ts">
    import { NEl } from "naive-ui";

    const emit = defineEmits<{ (e: "update:modelValue", value: any): void }>();
    const props = withDefaults(
        defineProps<{
            modelValue: string | null;
            answers: Array<{ _id: string; image: string }>;
        }>(),
        {
            modelValue: null,
            answers: () => [],
        },
    );

    const currentSlideIndex = ref<number>(0);
    const currentSlide = computed(() => props.answers[currentSlideIndex.value]);
    const animationDirection = ref<"ltr" | "rtl">("rtl");
    const selected = computed<string | null>({
        get: () => props.modelValue,
        set: (val) => emit("update:modelValue", val),
    });

    function Previous() {
        const oldIndex = currentSlideIndex.value;
        currentSlideIndex.value = currentSlideIndex.value > 0 ? currentSlideIndex.value - 1 : props.answers.length - 1;
        SetDirection(oldIndex);
    }

    function Next() {
        const oldIndex = currentSlideIndex.value;
        currentSlideIndex.value = currentSlideIndex.value < props.answers.length - 1 ? currentSlideIndex.value + 1 : 0;
        SetDirection(oldIndex);
    }

    async function SetDirection(oldIndex: number) {
        animationDirection.value = currentSlideIndex.value > oldIndex ? "rtl" : "ltr";
        await nextTick();
    }
</script>

<template>
    <div v-if="currentSlide" class="flex w-full items-center">
        <div class="flex-grow flex justify-center">
            <VIcon size="45" color="primary" class="opacity-70 hover:opacity-100 cursor-pointer" @click="Previous">
                <mdi:chevron-left-circle />
            </VIcon>
        </div>
        <NEl class="w-[450px] h-[300px] flex flex-col justify-end items-center gap-y-4">
            <Transition :name="animationDirection === 'ltr' ? 'slide-fade' : 'slide-fade-reverse'" mode="out-in">
                <img
                    :key="currentSlideIndex"
                    :src="currentSlide.image"
                    class="w-full h-full object-cover border-[var(--primary-color)] rounded-[var(--border-radius)]"
                    :class="{ 'border border-4': selected, 'hover:border': !selected }"
                    @click="emit('update:modelValue', props.answers[currentSlideIndex]._id)"
                />
            </Transition>
            <div class="flex justify-center gap-x-4">
                <div
                    v-for="index in answers.length"
                    :key="index"
                    class="w-2 h-2 rounded-full"
                    :class="{ 'bg-black': index - 1 === currentSlideIndex, 'bg-gray-200': index - 1 !== currentSlideIndex }"
                ></div>
            </div>
        </NEl>
        <div class="flex-grow flex justify-center">
            <VIcon size="45" color="primary" class="opacity-70 hover:opacity-100 cursor-pointer" @click="Next">
                <mdi:chevron-right-circle />
            </VIcon>
        </div>
    </div>
</template>
