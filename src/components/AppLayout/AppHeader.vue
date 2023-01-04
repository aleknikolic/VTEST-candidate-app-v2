<script setup lang="ts">
    import VtestLogo from "~/assets/common/logo.gif"
</script>

<template>
    <div class="header w-full flex justify-between items-start py-4 pt-8">
        <div class="flex justify-start">
            <img :src="VtestLogo" alt="Logo" style="width: 200px" />
        </div>
        <div id="recorder"></div>
    </div>
</template>
