<script setup lang="ts">
    import { useThemeVars } from "naive-ui";

    interface IVTextProps {
        type: "title-0" | "title-1" | "title-2" | 
              "text-strong-1" | "text-strong-2" | "text-strong-3" | "text-strong-4" | "text-strong-5" | "text-strong-6" |
              "text-regular-1" | "text-regular-2" | "text-regular-3" | "text-regular-4" | "text-regular-5"
        color: 'primary' | string;
    }

    const props = withDefaults(
        defineProps<IVTextProps>(),
        {
            color: '#000',
        },
    );

    const themeVars = useThemeVars();
    const tag = computed(() => {
        if (props.type.includes('text')) {
            return 'p'
        }
        let headingNumber = Number(props.type.split('-')[1]) + 1
        return 'h' + headingNumber
    });

    const styles = [
        {
            type: 'title-0',
            class: 'text-[50px] leading-[54px] font-bold'
        },
        {
            type: 'title-1',
            class: 'text-[32px] leading-[54px] font-black font-sans'
        },
        {
            type: 'title-2',
            class: 'text-[24px] leading-[28px] font-black font-sans'
        }, 
        {
            type: 'text-strong-1',
            class: 'text-[39px] leading-[30px] font-bold'
        },
        {
            type: 'text-strong-2',
            class: 'text-[28px] leading-[30px] font-black font-sans'
        },
        {
            type: 'text-strong-3',
            class: 'text-[26px] leading-[40px] font-bold'
        },
        {
            type: 'text-strong-4',
            class: 'text-[24px] leading-[26px] font-bold'
        },
        {
            type: 'text-strong-5',
            class: 'text-[19px] leading-[10px] font-bold'
        },
        {
            type: 'text-strong-6',
            class: 'text-[16px] leading-[19.5px] font-bold'
        },
        {
            type: 'text-regular-1',
            class: 'text-[24px] leading-[24px]'
        },
        {
            type: 'text-regular-2',
            class: 'text-[22px] leading-[30px]'
        },
        {
            type: 'text-regular-3',
            class: 'text-[23px] leading-[28px]'
        },
        {
            type: 'text-regular-4',
            class: 'text-[20px] leading-[30px]'
        },
        {
            type: 'text-regular-5',
            class: 'text-[16px] leading-[19.5px]'
        }
    ]
</script>

<template>
    <div>
        <NEl 
            :tag="tag"
            class="m-0 tracking-normal" 
            :class="styles.find(s => s.type === props.type)?.class"
            :style="{
                color: props.color === 'primary' ? themeVars.primaryColor : props.color
            }"
        >
            <slot />
        </NEl>
    </div>
</template>

<style scoped>
    .word-spacing-0 {
        word-spacing: 0;
    }
</style>
