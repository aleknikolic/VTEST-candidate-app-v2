<script setup lang="ts">
    import { useThemeVars } from "naive-ui";
    import { UnwrapNestedRefs } from "vue";

    const themeVars = useThemeVars();
    defineProps<{
        timerController: UnwrapNestedRefs<ReturnType<typeof useTimerController>>;
    }>();
</script>

<template>
    <div class="flex flex-col">
        <div class="flex gap-4 justify-between items-start pb-4">
            <div>
                <slot name="instructions"></slot>
            </div>
            <VText v-if="timerController.currentRunner" type="text-strong-1">
                {{ $filters.formatTime(timerController.currentRunner.remaining) }}
            </VText>
        </div>

        <div v-if="timerController.currentRunner" class="w-full h-[16px] rounded-md bg-gray-400 relative overflow-hidden">
            <NEl
                tag="div"
                class="absolute top-0 left-0 h-full transition transition-all ease-in-out"
                :style="`width: ${(timerController.currentRunner.remaining / timerController.currentRunner.duration) * 100}%;`"
                :class="{
                    'bg-[var(--primary-color)]': timerController.currentRunner.remaining > timerController.currentRunner.warning,
                    'bg-[var(--primary-color-pressed)]': timerController.currentRunner.remaining <= timerController.currentRunner.warning,
                }"
            ></NEl>
        </div>
    </div>
</template>
