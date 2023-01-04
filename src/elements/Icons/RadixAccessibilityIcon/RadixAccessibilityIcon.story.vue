<template>
    <story title="AudioPlaybackIcon" :layout="{ type: 'grid', width: '350' }">
        <variant title="Default">
            <audio-playback-icon color="primary" @click="hstEvent" />
        </variant>
        <variant title="Disabled">
            <audio-playback-icon disabled @click="hstEvent" />
        </variant>
    </story>
</template>

<script setup lang="ts">
    import { hstEvent } from "histoire/client";
</script>
