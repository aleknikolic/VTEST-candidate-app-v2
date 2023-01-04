<template>
    <n-config-provider class="demo" :locale="appStore.language" :theme="appStore.theme" :theme-overrides="appStore.themeOverrides">
        <form-provider :dark-mode="appStore.isDark" :theme-overrides="appStore.themeOverrides">
            <n-dialog-provider>
                <n-message-provider>
                    <n-notification-provider>
                        <n-loading-bar-provider>
                            <slot />
                        </n-loading-bar-provider>
                    </n-notification-provider>
                </n-message-provider>
            </n-dialog-provider>
        </form-provider>
    </n-config-provider>
</template>

<script setup lang="ts">
    import { NConfigProvider, NMessageProvider, NDialogProvider, NNotificationProvider, NLoadingBarProvider } from "naive-ui";
    import { FormProvider } from "@chronicstone/vue-sweetforms";
    import "@chronicstone/vue-sweetforms/dist/style.css";
    const appStore = useAppStore();
</script>

<style>
    body {
        font-family: "Arial" !important;
    }
    h1 {
        font-size: 2.2em;
        letter-spacing: 2px;
        word-spacing: 3px;
    }
    h2 {
        font-size: 1.9em;
        word-spacing: 2.5px;
    }
    h3 {
        font-size: 1.5em;
        word-spacing: 2px;
    }
    h4 {
        font-size: 1.3em;
    }
</style>
