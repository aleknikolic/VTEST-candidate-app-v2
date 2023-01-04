<script setup lang="ts">
    import { useThemeVars } from "naive-ui";
    import { useI18n } from "vue-i18n";
    import type { LocalizedContent } from "~/types/i18n";

    const props = withDefaults(
        defineProps<{
            type?: "text" | "html" | "image" | "audio";
            content?: string;
            options?: { audioPlayerLayout?: "horizontal" | "vertical"; maxReplays?: number };
        }>(),
        {
            type: "text",
            content: "",
        },
    );

    const themeVars = useThemeVars();
    const { t } = useI18n<{ message: LocalizedContent }>();

    const DEFAULT_PROPS = {
        audioPlayerLayout: "horizontal",
        maxReplays: 0,
    };

    const audioVerticalLayout = computed(() => (props.options?.audioPlayerLayout ?? DEFAULT_PROPS.audioPlayerLayout) === "vertical");
    const playButtonRef = ref<{ nbReplaysLeft: number } | null>(null);
</script>

<template>
    <template v-if="type === 'audio'">
        <div class="flex items-center" :class="audioVerticalLayout ? 'flex-col gap-10 h-full justify-center' : 'gap-4'">
            <VText type="text-strong-2" color="primary">{{ t("general.playAudio") }}</VText>
            <div>
                <VPlayAudioButton
                    ref="playButtonRef"
                    :audio-src="content"
                    :stroke-width="3"
                    :icon-size="audioVerticalLayout ? 100 : 27"
                    :circle-width="audioVerticalLayout ? 123 : 48"
                    v-bind="{
                        ...(options?.maxReplays ? { maxReplays: options.maxReplays } : {}),
                    }"
                />
            </div>
            <VText v-if="options?.maxReplays" type="text-strong-3">
                Number of replays left: {{ playButtonRef?.nbReplaysLeft }}
            </VText>
        </div>
    </template>
    <template v-else-if="type === 'html'">
        <VScrollbar
            class="max-h-[200px] p-4 bg-gray-50 border-l-4 border-gray-300 dark:border-gray-500 dark:bg-gray-800"
            trigger="none"
            :style="{ borderColor: themeVars.primaryColor, borderRadius: themeVars.borderRadius }"
        >
            <VText type="text-regular-2">{{ content }}</VText>
        </VScrollbar>
    </template>
    <template v-else-if="type === 'image'">
        <VImage
            :src="content"
            :width="392"
            :height="250"
            class="w-[392px] h-[250px] object-fill border border-[3px]"
            :style="{ borderColor: themeVars.primaryColor, borderRadius: themeVars.borderRadius }"
        />
    </template>
    <template v-else>
        <VText type="text-regular-3">{{ content }}</VText>
    </template>
</template>
