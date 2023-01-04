import * as TemplateFilters from "~/utils/format";

/// <reference types="vite/client" />
/// <reference types="histoire/vue" />
/// <reference types="vue" />

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $filters: typeof TemplateFilters;
    }
}
