<script setup lang="tsx">
    import type { VNodeChild } from "vue";

    const props = defineProps<{
        renderer: (data?: { [key: string]: any }) => VNodeChild;
        data?: { [key: string]: any };
    }>();

    defineRender(() => props?.renderer?.(props.data) ?? null);
</script>
