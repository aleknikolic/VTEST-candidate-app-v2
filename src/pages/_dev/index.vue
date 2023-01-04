<script setup lang="ts">
    import { Form } from "@chronicstone/vue-sweetforms";
    import { PageStepSamples, ItemStepSamples, StepSample } from "~/config/samples/examStepSamples";
    import { ItemType } from "~/types/item";
    import { PageType } from "~/types/page";
    const router = useRouter();
    const route = useRoute();

    const activeTab = ref<string>(route.query?.group?.toString() ?? "page");
    const tabItems = [
        { groupLabel: "Page Samples", groupType: "page", samples: PageStepSamples },
        { groupLabel: "Item Samples", groupType: "item", samples: ItemStepSamples },
    ];

    const UpdateActiveTab = (group: string) => (activeTab.value = group);
    const OpenSample = (index: number, type: string) => {
        router.push({ name: `_dev.${type}.sampleItem`, params: { [`${activeTab.value}Id`]: index } });
    };

    const formRef = ref<{ formData: { [key: string]: any } } | null>(null);
    const filtersSchema = computed(() => ({
        gridSize: 8,
        fieldSize: "8 md:4",
        fields: [
            {
                key: "search",
                label: "Search in label / description",
                type: "text",
            },
            {
                key: "type",
                label: activeTab.value === "item" ? "Item type" : "Page type",
                type: "select",
                options: (activeTab.value === "item" ? Object.values(ItemType) : Object.values(PageType)).map((item) => ({
                    label: formatKey(item),
                    value: item,
                })),
            },
        ],
    }));

    const activeSamples = computed(() =>
        ((tabItems.find((tab) => tab.groupType === activeTab.value)?.samples ?? []) as StepSample<"item" | "page">[])
            .map((sample) => sample)
            .filter((sample) => {
                const search = formRef.value?.formData?.search?.toLowerCase();
                const type = formRef.value?.formData?.type;
                return (
                    (!search || sample.label?.toLowerCase().includes(search) || sample.description?.toLowerCase().includes(search)) &&
                    (!type || sample.type === type)
                );
            }),
    );
</script>

<template>
    <div>
        <NCard embedded :header-style="{ padding: '10px' }" :segmented="{ content: true }">
            <template #header>
                <NTabs animated type="segment" :value="activeTab" :on-update:value="UpdateActiveTab">
                    <NTab v-for="({ groupLabel, groupType }, index) in tabItems" :key="index" :name="groupType">
                        {{ groupLabel.toLocaleUpperCase() }}
                    </NTab>
                </NTabs>
            </template>

            <Form ref="formRef" :key="activeTab" :form-options="filtersSchema" />
        </NCard>

        <Transition name="slide-fade" mode="out-in" appear>
            <NList v-if="activeSamples.length" hoverable clickable>
                <NListItem v-for="({ label, description, type }, index) in activeSamples" :key="`${label}|${index}`">
                    <NCard embedded :segmented="{ content: true }">
                        <template #header>
                            <div class="flex flex-col gap-3 items-start">
                                <p class="text-xl font-semibold uppercase">#{{ index + 1 }} | {{ label }}</p>
                                <NTag :bordered="false" type="info" size="small"> {{ type }}</NTag>
                            </div>
                        </template>
                        <template #header-extra>
                            <NButton type="primary" @click="OpenSample(index, activeTab)">
                                <template #icon>
                                    <mdi:eye />
                                </template>
                                OPEN SAMPLE
                            </NButton>
                        </template>
                        <div v-if="description"></div>
                    </NCard>
                </NListItem>
            </NList>

            <NEmpty v-else :key="activeTab" class="mt-6"> No samples availalbe </NEmpty>
        </Transition>
    </div>
</template>

<route lang="yaml">
name: _dev.sampleList
meta:
    dev: true
</route>
