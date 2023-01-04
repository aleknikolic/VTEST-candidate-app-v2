<script setup lang="ts">
    const emit = defineEmits<{ (e: "update:modelValue", value: boolean): void }>();
    const props = defineProps<{ modelValue: boolean }>();

    const value = computed({
        get: () => props.modelValue,
        set: (val) => emit("update:modelValue", val),
    });

    const CallbackVerify = (response: any) => response && (value.value = true);
    const CallbackExpired = () => (value.value = false);
    const CallbackFail = () => (value.value = false);
</script>

<template>
    <VueRecaptcha theme="light" size="normal" :tabindex="0" @verify="CallbackVerify" @expired="CallbackExpired" @fail="CallbackFail" />
</template>
