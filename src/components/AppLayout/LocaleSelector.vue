<script setup lang="ts">
    // TODO: COMPLETELY REWRITE - USE POPSELECT - BIND TO STORE DIRECTLY
    
    import { computed } from "vue";

    const props = withDefaults(
        defineProps<{
            modelValue: string
        }>(),
        {
            modelValue: 'en_US'
        }
    )

    const emit = defineEmits<{
        (e: "update:modelValue", value: string): void;
    }>();

    const languages = [
        {
            label: "English",
            key: "en_US",
            disabled: false,
        },
        {
            label: "British English",
            key: "en_GB",
            disabled: false,
        },
        {
            label: "Arabic",
            key: "ar_AE",
            disabled: false,
        },
        {
            label: "French",
            key: "fr_FR",
            disabled: false,
        },
    ];

    const options = computed(() => {
        return languages.map((lang) => {
            if (props.modelValue === lang.key) {
                lang.disabled = true;
            } else {
                lang.disabled = false;
            }
            return lang;
        });
    });

    const currentSelected = computed(() => {
        const select = options.value.filter((opt) => opt.key === props.modelValue);
        if (select.length) {
            return select[0].label;
        }
        throw new Error(`Unknown language: ${props.modelValue}`);
    });

    function OnSelect(value: string) {
        emit("update:modelValue", value);
    }
</script>

<template>
    <VButton>
        <div class="flex items-center gap-2 space-x-2 w-36">
            <GlobeIcon class="w-1/6" size="25" />
            <div class="w-4/6 text-left">{{ currentSelected }}</div>
            <RoundKeyboardArrowDownIcon class="w-1/6" />
        </div>
    </VButton>
</template>

<style lang="scss" scoped></style>
