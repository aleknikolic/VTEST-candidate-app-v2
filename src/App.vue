<template>
    <AppProvider>
        <router-view />
    </AppProvider>
</template>

<script setup lang="ts">
    import AppProvider from "./AppProvider.vue";
</script>

<style>
    :root {
        --audio-circle-size: 100px;
    }
</style>
