<template>
    <div>
        <div v-if="DISPLAY_DEV" class="fixed right-4 top-4 md:right-8 top-8 lg:right-16 lg:top-16">
            <NButton circle type="info" @click="$router.push({ name: '_dev.sampleList' })">
                <template #icon>
                    <mdi:settings />
                </template>
            </NButton>
        </div>
        <LandingPage @start="onStart" />
    </div>
</template>

<script setup lang="ts">
    function onStart() {
        console.log("Start clicked");
    }

    const DISPLAY_DEV = import.meta.env.VITE_APP_ENV === "dev";
</script>

<route lang="yaml">
name: "welcome"
meta:
    displayLocaleSelector: true
</route>
