<template>
    <div class="absolute top-1/4 left-2/5">
        <NResult status="warning" title="404 | Not Found" description="The page you're looking for does not exist">
            <template #footer>
                <div class="flex items-center gap-4 justify-center">
                    <n-button type="primary" @click="$router.push('/')">
                        <template #icon>
                            <n-icon>
                                <mdi-home />
                            </n-icon>
                        </template>
                        HOME
                    </n-button>
                </div>
            </template>
        </NResult>
    </div>
</template>
