<script setup lang="ts">
    import { GlobalThemeOverrides } from "naive-ui";
    import { BuildThemeOverrides } from "~/libs/theme/themeManager";

    const props = withDefaults(
        defineProps<{
            mode?: string;
        }>(),
        {
            mode: "primary",
        },
    );

    const appStore = useAppStore();
    const mappedOverrides = computed(() => BuildThemeOverrides(appStore.themeConfig, props.mode));
    const themeOverrides = computed<GlobalThemeOverrides>(() => (appStore.isDark ? mappedOverrides.value.darkTheme : mappedOverrides.value.lightTheme));
</script>

<template>
    <NConfigProvider class="!w-full" :locale="appStore.language" :theme="appStore.theme" :theme-overrides="themeOverrides">
        <slot />
    </NConfigProvider>
</template>
