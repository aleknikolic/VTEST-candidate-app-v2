import { createApp } from "vue";
import { createPinia } from "pinia";
import NaiveUI from "naive-ui";
import router from "./router";
import i18n from "./i18n";

import "~/assets/styles/_main.scss";
import "virtual:windi.css";
import App from "./App.vue";

import VueRecaptcha from "vue3-recaptcha-v2";
import * as TemplateFilters from "~/utils/format";

async function bootstrap() {
    const app = createApp(App);
    const pinia = createPinia();

    app.config.globalProperties.$filters = TemplateFilters;

    app.use(pinia);
    app.use(NaiveUI);
    app.use(router);
    app.use(VueRecaptcha, { siteKey: import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY });
    app.use(i18n);

    await router.isReady();
    app.mount("#app");
}

bootstrap();

declare module "vue" {
    interface ComponentCustomProperties {
        $filters: typeof TemplateFilters;
    }
}
