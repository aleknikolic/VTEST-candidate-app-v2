<template>
    <story title="AudioPlaybackIcon" :layout="{ type: 'grid', width: '550' }">
        Icon
        <AudioPlaybackIcon color="primary" size="150" @click="hstEvent" />
        Clickable
        <AudioPlaybackIcon color="primary" size="150" :clickable="true" @click="hstEvent" />
        Disabled
        <AudioPlaybackIcon color="primary" size="150" :disabled="true" @click="hstEvent" />
    </story>
</template>

<script setup lang="ts">
    import { hstEvent } from "histoire/client";
</script>
