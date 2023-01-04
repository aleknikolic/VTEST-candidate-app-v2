<template>
    <ExamRenderer />
</template>

<script setup lang="ts">
    import ExamRenderer from "~/components/Exam/Renderer/ExamRenderer.vue";
</script>

<route lang="yaml">
name: exam
meta:
    auth: true
</route>
