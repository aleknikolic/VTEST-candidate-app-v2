<template>
    <div class="grid" style="min-height: 400px">
        <LoginPage />
    </div>
</template>

<script setup>
    const forbiddens = ["[", "]", "?", "%", "$"];
</script>

<route lang="yaml">
name: login
meta:
    displayLocaleSelector: true
</route>
