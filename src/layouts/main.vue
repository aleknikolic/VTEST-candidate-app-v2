<template>
    <NLayout class="h-[100vh] bg-white" :native-scrollbar="false">
        <NLayout class="bg-white container mx-auto px-4">
            <NLayoutHeader>
                <AppHeader />
            </NLayoutHeader>
            <NLayoutContent content-style="background: white;min-height: 67vh; display: flex; flex-direction: column; gap: 3em;">
                <RouterView />
                <div v-if="$route.meta.displayLocaleSelector">
                    <LocaleSelector />
                </div>
            </NLayoutContent>
            <NLayoutFooter position="static" class="bg-white">
                <VDivider type="secondary" weight="thick" />
                <AppFooter />
            </NLayoutFooter>
        </NLayout>
    </NLayout>
</template>

<script setup lang="ts">
    useReactifiedApi();
</script>

<style lang="css" scoped>
    .fixed-anchor {
        width: 100%;
        position: relative;
    }
</style>
