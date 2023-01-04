# QUESTION ITEM WRITING GUIDELINES

### 1/ BOILERPLATE BASE QUESTION ITEM DEF

```vue
<script setup lang="ts">
    import type { ItemType, ItemTypeEmit, ItemTypeExposedState, ItemTypeProps } from "~/types/item";

    const props = defineProps<ItemTypeProps<ItemType.XXX>>();
    const emit = defineEmits<ItemTypeEmit>();

    defineExpose<ItemTypeExposedState<ItemType.XXX>>({
        getStepPayload: (timeout) => ({
            answer: { XXX },
        }),
    });
</script>

<template>
    <div class="flex flex-col gap-6"></div>
</template>
```

On the **defineExpose** AND **defineProps**, don't forget to update the passed generic argument of **PageTypeExposedState** to specify whick page type this is.