<script setup lang="ts">
    const props = withDefaults(
        defineProps<{
            bordered?: boolean,
            dense?: boolean,
            withPrefix?: boolean
        }>(),
        {
            bordered: true,
            dense: true,
            withPrefix: true
        }
    )
</script>

<template>
    <NListItem :class="{ 'dense-item': dense, 'border-none': !bordered }" style="padding: 0">
        <template #prefix>
            <div v-if="withPrefix">
                <slot name="prefix">
                    <CiDotIcon></CiDotIcon>
                </slot>
            </div>
        </template>
        <template #suffix>
            <slot name="suffix"></slot>
        </template>
        <slot></slot>
    </NListItem>
</template>

<style lang="css" scoped>
    .dense-item {
        padding: 2px !important;
    }

    .border-none {
        border: none !important;
    }
</style>
